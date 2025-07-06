import API from "./axiosInstance";

export const searchJobs = async (query) => {
  const res = await API.get(`/api/jobs/search?position=${query}`);
  return res.data;
};

export const getJobs = async () => {
  const res = await API.get("/api/jobs");
  return res.data;
};

// Add more: createJob, updateJob, deleteJob
