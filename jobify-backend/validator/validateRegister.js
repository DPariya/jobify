// Design Pattern: Strategy Pattern (choose validation schema at runtime)
// Principle: Open/Closed Principle (easy to extend schemas)
// Principle: SRP (separates validation from controller)
import { z } from 'zod';
import { handleZodValidation } from '../utils/handleZodValidation.js';
//zod schema for validate register

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const validateRegister = handleZodValidation(registerSchema);
