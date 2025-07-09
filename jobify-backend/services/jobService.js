// services/jobService.js

import Job from '../models/Job.js';
import { buildJobQuery } from '../utils/buildJobQuery.js';
import { sortOptions } from '../utils/sortMap.js';

// GET JOBS
export const getJobsService = async ({
  userId,
  status,
  jobType,
  search,
  sort = 'latest',
  page = 1,
  limit = 6,
  position,
}) => {
  // Build Mongo query
  const queryObject = buildJobQuery({
    userId,
    status,
    jobType,
    search,
    position,
  });
  const sortBy = sortOptions[sort] || { createdAt: -1 };
  const skip = (Number(page) - 1) * Number(limit);
  const numericLimit = Number(limit);
  const jobsQuery = Job.find(queryObject).sort(sortBy).skip(skip).limit(numericLimit).lean().exec();

  const countQuery = Job.countDocuments(queryObject).exec();

  const [jobs, totalJobs] = await Promise.all([jobsQuery, countQuery]);
  const numOfPages = Math.ceil(totalJobs / numericLimit);

  return {
    jobs,
    totalJobs,
    currentPage: Number(page),
    numOfPages,
    count: jobs.length,
  };
};

// CREATE JOB
export const createJobService = async ({
  position,
  company,
  jobLocation,
  jobStatus,
  jobType,
  userId,
}) => {
  const job = await Job.create({
    position,
    company,
    jobLocation,
    jobStatus,
    jobType,
    createdBy: userId,
  });
  return job;
};

// UPDATE JOB
export const updateJobService = async ({ jobId, userId, updatedData }) => {
  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    updatedData,
    { new: true, runValidators: true }
  );
  return job;
};

// DELETE JOB
export const deleteJobService = async ({ jobId, userId }) => {
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });
  return job;
};
