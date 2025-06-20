// validator/jobValidator.js
// Pattern: Strategy Pattern + HOF for schema middleware
import { z } from 'zod';
import { handleZodValidation } from '../utils/handleZodValidation.js';

const jobSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  jobLocation: z.string().min(1, 'Location is required'),
  jobStatus: z.enum(['pending', 'interview', 'declined', 'offer'], {
    errorMap: () => ({ message: 'Invalid job status' }),
  }),
  jobType: z.enum(['full-time', 'part-time', 'remote', 'contract', 'internship'], {
    errorMap: () => ({ message: 'Invalid job type' }),
  }),
});

export const validateJob = handleZodValidation(jobSchema);
