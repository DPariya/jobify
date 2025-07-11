// controllers/jobController.js
// Pattern: Template Method for all CRUD actions
// Principle: SRP – Controller only handles business logic

import Job from '../models/Job.js';
import {
  createJobService,
  deleteJobService,
  getJobsService,
  updateJobService,
} from '../services/jobService.js';
import CustomError from '../utils/CustomError.js';
import { buildJobQuery } from '../utils/buildJobQuery.js';
// Create Job

export const createJob = async (req, res, next) => {
  try {
    const job = await createJobService({ ...req.body, userId: req.user.userId });
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// Get all jobs

export const getAllJobs = async (req, res, next) => {
  try {
    const result = await getJobsService({
      userId: req.user.userId,
      ...req.query,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Update job

export const updateJob = async (req, res, next) => {
  try {
    const job = await updateJobService({
      jobId: req.params.id,
      userId: req.user.userId,
      updatedData: req.body,
    });

    if (!job) throw new CustomError('Job not found or not yours', 404);
    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};

// Delete job

export const deleteJob = async (req, res, next) => {
  try {
    const job = await deleteJobService({
      jobId: req.params.id,
      userId: req.user.userId,
    });

    if (!job) throw new CustomError('Job not found or not yours', 404);
    res.status(200).json({ msg: 'Job deleted' });
  } catch (error) {
    next(error);
  }
};

// Suggest job

export const suggestJob = async (req, res, next) => {
  try {
    const regex = new RegExp('^' + req.query, 'i');

    const jobs = await Job.find({
      $or: [{ position: regex }, { company: regex }, { jobLocation: regex }],
    })
      .select('position company jobLocation -_id')
      .limit(10); // increase for better Trie

    const wordSet = new Set();
    jobs.forEach((job) => {
      wordSet.add(job.position);
      wordSet.add(job.company);
      wordSet.add(job.jobLocation);
    });

    const suggestions = Array.from(wordSet).filter(Boolean).slice(0, 5); // limit to 5

    res.status(200).json({ suggestions });
  } catch (error) {
    next(error);
  }
};
// for auto suggestions
export const getJobKeywords = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).select(
      'position company jobLocation -_id'
    );
    const keywords = new Set();
    jobs.forEach((job) => {
      keywords.add(job.position);
      keywords.add(job.company);
      keywords.add(job.jobLocation);
    });

    res.status(200).json({ keywords: Array.from(keywords) });
  } catch (error) {
    next(error);
  }
};
