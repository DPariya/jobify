// Design Pattern: Factory Pattern (createToken)
// Principle: SRP (controller only handles request logic)
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';

//create token

const createToken = (user) => {
  // Factory Pattern: Encapsulates token creation logic
  return jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

//Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // return res.status(400).json({ msg: 'Email already exists' });
      throw new CustomError('Email already exists', 400);
    }

    const user = await User.create({ name, email, password });
    const token = createToken(user);

    res.status(201).json({
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    next(err); // Forward to errorHandler
  }
};

//Login
export const login = async (req, res) => {
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

  const token = createToken(user);
  res.status(200).json({
    user: { name: user.name, email: user.email },
    token,
  });
};
