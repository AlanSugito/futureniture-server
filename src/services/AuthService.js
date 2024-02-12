import {UserRepository} from '../repositories/index.js';
import {google} from 'googleapis';
import {oauth2Client} from '../apps/index.js';
import {APIError} from '../utils/index.js';

class AuthService {
  constructor() {
    this.repository = new UserRepository();
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
      const userData = {
        email: data.email,
        full_name: data.name,
        verified: data.verifiedEmail,
        profile_img: data.picture,
      };

      if (await this.repository.isUserExist(email)) return email;

      const userId = await this.repository.save(userData);
      return userId;
    } catch (error) {
      throw APIError.parseError(error);
    }
  }
}

export default AuthService;
