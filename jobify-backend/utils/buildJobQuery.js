// utils/buildJobQuery.js
export const buildJobQuery = ({ userId, status, jobType, search }) => {
  const queryObject = {
    createdBy: userId,
  };

  // Optional filter
  if (status && status != 'all') {
    queryObject.jobStatus = status;
  }
  if (jobType && jobType != 'all') {
    queryObject.jobType = jobType;
  }
  // Search
  if (search) {
    queryObject.$text = { $search: search };
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { jobLocation: { $regex: search, $options: 'i' } },
    ];
  }

  return queryObject;
};
