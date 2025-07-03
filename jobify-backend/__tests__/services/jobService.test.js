// __tests__/services/jobService.test.js
import { jest } from '@jest/globals';

// ✅ Step 1: Mock the Job model before import
jest.unstable_mockModule('../../models/Job.js', () => ({
  default: {
    create: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  },
}));

// ✅ Step 2:  Dynamically import mocked modules
let jobService;
let Job;

beforeAll(async () => {
  jobService = await import('../../services/jobService.js');
  Job = (await import('../../models/Job.js')).default;
});

describe('Job Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ✅ createJobService()
  describe('createJobService()', () => {
    it('should create and return a new job', async () => {
      const mockJob = {
        _id: '123',
        position: 'Developer',
        company: 'Google',
        jobLocation: 'Berlin',
        jobStatus: 'pending',
        jobType: 'full-time',
        createdBy: '64f7c8a9cc45ab122dbf4343',
      };

      Job.create.mockResolvedValue(mockJob);

      const result = await jobService.createJobService({
        position: 'Developer',
        company: 'Google',
        jobLocation: 'Berlin',
        jobStatus: 'pending',
        jobType: 'full-time',
        userId: '64f7c8a9cc45ab122dbf4343',
      });

      expect(Job.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockJob);
    });
  });

  // ✅ getJobService()
});
