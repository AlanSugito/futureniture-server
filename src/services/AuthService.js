import {UserRepository} from '../repositories/index.js';
import {google} from 'googleapis';
import {oauth2Client} from '../apps/index.js';
import {APIError, Cryptographer, NotFoundError} from '../utils/index.js';
import configs from '../configs/index.js';

class AuthService {
  constructor() {
    this.repository = new UserRepository();
  }

  async register(data) {
    try {
      const userId = await this.repository.save(data);
      return userId;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  async login(email, password) {
    try {
      if (!(await this.repository.isUserExist(email)))
        throw new NotFoundError('User not found!');

      const user = await this.repository.getCredentials(email);
      if (!(await Cryptographer.compare(password, user.password)))
        throw new APIError(400, 'Password is not valid');

      const {rfToken, accessToken} = this.createTokens();

      return {rfToken, accessToken};
    } catch (error) {
      throw APIError.parseError(error);
    }
  }

  createTokens(email) {
    const rfToken = Cryptographer.generateToken(
      {email},
      configs.RT_SECRET,
      '30d'
    );
    const accessToken = Cryptographer.generateToken(
      {email},
      configs.AT_SECRET,
      '900s'
    );

    return {rfToken, accessToken};
  }

  async oauth2Login(code) {
    try {
      const {tokens} = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: 'v2',
      });

      const {data} = await oauth2.userinfo.get();

      const {rfToken, accessToken} = this.createTokens(data.email);

      const userData = {
        email: data.email,
        full_name: data.name,
        verified: data.verified_email,
        profile_img: data.picture,
        token: rfToken,
      };

      if (await this.repository.isUserExist(data.email)) {
        await this.repository.updateProfile(data.email, {token: rfToken});
        return {rfToken, accessToken};
      }

      await this.repository.save(userData);
      return {rfToken, accessToken};
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default AuthService;
