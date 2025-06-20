// middleware/authMiddleware.js
// Pattern: Middleware / Chain of Responsibility
// Principle: SRP – handles only auth verification

import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('Authorization invalid', 401);
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to req so controller can use it
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
    };
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
export default authMiddleware;
