import {Router} from 'express';
import {AuthController} from '../controllers/index.js';

// eslint-disable-next-line new-cap
const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

router.get('/login/google', authController.googleOAuth);
router.get('/login/google/callback', authController.oauth2Login);
router.get('/tokens', authController.getAccessToken);
router.get('/verify/email', authController.verifyEmail);

export default router;
