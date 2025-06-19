// Design Pattern: Strategy Pattern (choose validation schema at runtime)
// Principle: Open/Closed Principle (easy to extend schemas)
// Principle: SRP (separates validation from controller)
import { z } from 'zod';

//zod schema for validate register

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err) {
    const error = err.errors?.[0]?.message || 'Invalid input';
    return res.status(400).json({ msg: error });
  }
};
