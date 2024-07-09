import { Router } from 'express';
import authControllers from '../controllers/authController.js';

const router = Router();

router.get('/', authControllers.testAuth);

export default router;