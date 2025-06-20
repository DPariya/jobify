import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister } from '../validator/validateRegister.js';
import { validateLogin } from '../validator/validateLogin.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
