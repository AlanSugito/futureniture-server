import {oauthUrl} from '../apps/index.js';
import {AuthService} from '../services/index.js';
import {APIError} from '../utils/Error.js';
import signUpSchema from '../validations/signUpSchema.js';
import validate from '../validations/validate.js';

const service = new AuthService();

class AuthController {
  googleOAuth(_, res) {
    res.redirect(oauthUrl);
  }

  async oauth2Login(req, res, next) {
    try {
      const {code} = req.query;
      const {rfToken, accessToken} = await service.oauth2Login(code);

      res.cookie('rft', rfToken, {httpOnly: true});
      res.redirect(301, `http://localhost:5173/oauth?acc_token=${accessToken}`);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body.data;
      const {rfToken, accessToken} = await service.login(email, password);

      const message = 'Successfully login';
      res.cookie('rft', rfToken, {httpOnly: true});
      res.status(200).json({
        message,
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async signUp(req, res, next) {
    try {
      const {data} = req.body;
      const validatedData = validate(data, signUpSchema);

      await service.register(validatedData);

      res.status(201).json({message: 'Successfully sign up!'});
    } catch (error) {
      next(error);
    }
  }

  async verifyEmail(req, res, next) {
    try {
      const {token} = req.query;

      if (!token) throw new APIError(400, 'No token provided');

      await service.verifyEmail(token);

      res.send('OK');
    } catch (error) {
      next(error);
    }
  }

  async getAccessToken(req, res, next) {
    try {
      if (!req.cookies) throw new APIError(403, 'No token provided!');

      const {rft} = req.cookies;

      const accessToken = await service.getAccessToken(rft);

      res
        .status(200)
        .json({message: 'Successfully generate token', data: {accessToken}});
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
