import express from "express";
import { register, login, logout } from '../controller/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export { router as authRoutes }
