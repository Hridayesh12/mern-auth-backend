import express from 'express';
import { signupController, loginController, refreshTokenController, logoutController } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);
router.post('/logout', logoutController);

export default router;
