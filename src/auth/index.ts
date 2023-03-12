import express from 'express';
import authMiddleware from 'middlewares/auth-middleware';
import { login } from './methods/login';
import { register } from './methods/register';
import { refreshToken } from './methods/auth';

const router = express.Router();

router.post(('/login'), login);
router.post(('/register'), register);
router.post(('/auth'), authMiddleware, refreshToken);

export default router;
