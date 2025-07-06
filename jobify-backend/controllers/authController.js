// Design Pattern: Factory Pattern (createToken)
// Principle: SRP (controller only handles request logic)
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwtUtils.js';
import bcrypt from 'bcryptjs';

//Register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new CustomError('Email already exists', 400);
    }

    const user = await User.create({ name, email, password });

    //generate access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
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
      // return res.status(401).json({ msg: 'Invalid credentials' });
      throw new CustomError('Invalid credentials', 401);
    }

    //match password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // return res.status(401).json({ msg: 'Invalid password' });
      throw new CustomError('Invalid password', 401);
    }

    //generate access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 1000,
    });
    // Clear password from response
    const { password: _, ...safeUser } = user.toObject();
    return res.status(200).json({
      user: safeUser,
      accessToken,
    });
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
    const newAccessToken = generateAccessToken(payload.user);
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error); // Forward to errorHandler
  }
};

export const logout = (req, res, next) => {
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.status(200).json({ msg: 'Logged out' });
};
