// models/Job.js
// Principle: SRP – Model handles only DB schema
// Design Pattern: Factory-like structure – Mongoose model definition

import { mongoose } from 'mongoose';

const jobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true,
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
  },
  jobLocation: {
    type: String,
    default: 'my city',
    trim: true,
  },
  jobStatus: {
    type: String,
    enum: ['pending', 'interview', 'declined', 'offer'],
    default: 'pending',
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'contract', 'internship'],
    default: 'full-time',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export default mongoose.model('Job', jobSchema);
