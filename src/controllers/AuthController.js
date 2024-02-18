import {oauthUrl, logger} from '../apps/index.js';
import {AuthService} from '../services/index.js';

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
      const message = 'Successfully login';
      res.redirect(301, `http://localhost:5173/oauth?acc_token=${accessToken}`);
      logger.info(Formatter.formatRequestLog(req, res, message));
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
      logger.info(Formatter.formatRequestLog(req, res, message));
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
