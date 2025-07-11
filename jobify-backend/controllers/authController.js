// Design Pattern: Factory Pattern (createToken)
// Principle: SRP (controller only handles request logic)
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';
import { verifyToken } from '../utils/jwtUtils.js';
import { sendAuthResponse } from '../utils/sendAuthResponse.js';

//Register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new CustomError('Email already exists', 400, 'EMAIL_ALREADY_EXISTS');
    }

    const user = await User.create({ name, email, password });

    return sendAuthResponse(res, user);
  } catch (err) {
    next(err); // Forward to errorHandler
  }
};

//Login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError('User not found, register instead', 404, 'USER_NOT_FOUND');
    }

    //match password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // return res.status(401).json({ msg: 'Invalid password' });
      throw new CustomError('Invalid password', 401);
    }
    return sendAuthResponse(res, user);
  } catch (error) {
    next(error); // Forward to errorHandler
  }
};

// Create refresh token
export const refreshToken = async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);

  try {
    const payload = verifyToken(token, process.env.REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) return res.sendStatus(401);

    return sendAuthResponse(res, user);
  } catch (error) {
    console.log('error', error);
    next(error); // Forward to errorHandler
  }
};

export const logout = (req, res, next) => {
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.status(200).json({ msg: 'Logged out' });
};
