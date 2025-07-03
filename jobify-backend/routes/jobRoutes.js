// routes/jobRoutes.js
// Pattern: Chain of Responsibility (auth → validator → controller)

import express from 'express';
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  suggestJob,
} from '../controllers/jobController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { validateJob } from '../validator/jobValidator.js';

const router = express.Router();

// Create & Get all jobs

router.route('/').post(authMiddleware, validateJob, createJob).get(authMiddleware, getAllJobs);

// Update or Delete specific job
router
  .route('/:id')
  .patch(authMiddleware, validateJob, updateJob)
  .delete(authMiddleware, deleteJob);

// Job Suggestion
router.route('/suggest').get(authMiddleware, suggestJob);

export default router;
