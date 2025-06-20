// controllers/jobController.js
// Pattern: Template Method for all CRUD actions
// Principle: SRP – Controller only handles business logic

import Job from '../models/Job.js';
import CustomError from '../utils/CustomError.js';

// Create Job

export const createJob = async (req, res, next) => {
  try {
    const { position, company, jobLocation, jobStatus, jobType } = req.body;
    const job = await Job.create({
      position,
      company,
      jobLocation,
      jobStatus,
      jobType,
      createdBy: req.user.userId, // added from authMiddleware
    });

    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// Get all jobs

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt');
    res.status(200).json({ jobs, count: jobs.length });
  } catch (error) {
    next(error);
  }
};

// Update job

export const updateJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findOneAndUpdate(
      {
        _id: jobId,
        createdBy: req.user.userId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) throw new CustomError('Job not found or not yours', 404);
    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};

// Delete job

export const deleteJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findOneAndDelete({
      _id: jobId,
      createdBy: req.user.userId,
    });

    if (!job) throw new CustomError('Job not found or not yours', 404);
    res.status(200).json({ msg: 'Job deleted' });
  } catch (error) {
    next(error);
  }
};
