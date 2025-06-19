import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister } from '../middleware/validateRegister.js';
import { validateLogin } from '../middleware/validateLogin.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
