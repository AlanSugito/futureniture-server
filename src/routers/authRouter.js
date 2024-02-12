import {Router} from 'express';
import {AuthController} from '../controllers/index.js';

// eslint-disable-next-line new-cap
const router = Router();
const authController = new AuthController();

router.get('/login/google', authController.googleOAuth);
router.get('/login/google/callback', authController.oauth2Login);

export default router;
