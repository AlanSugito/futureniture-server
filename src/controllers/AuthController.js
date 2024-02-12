import {oauthUrl, logger} from '../apps/index.js';
import {AuthService} from '../services/index.js';
import {Cryptographer, Formatter} from '../utils/index.js';
import configs from '../configs/index.js';

const service = new AuthService();

class AuthController {
  googleOAuth(_, res) {
    res.redirect(oauthUrl);
  }

  async oauth2Login(req, res, next) {
    try {
      const {code} = req.query;
      const userId = await service.oauth2Login(code);

      const rfToken = Cryptographer.generateToken({userId}, configs.RT_SECRET);
      const accessToken = Cryptographer.generateToken(
        {userId},
        configs.AT_SECRET
      );

      res.cookie('rft', rfToken, {httpOnly: true});
      const message = 'Successfully login';
      res.status(200).json({
        message,
        data: {accessToken},
      });
      logger.info(Formatter.formatRequestLog(req, res, message));
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
