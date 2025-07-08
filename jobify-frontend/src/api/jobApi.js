import API from "./axiosInstance";

export const searchJobs = async (query) => {
  const res = await API.get(`/api/jobs?search=${query}`);
  return res.data;
};

export const getJobs = async () => {
  const res = await API.get("/api/jobs");
  return res.data;
};

export const getJobKeywords = async () => {
  const res = await API.get("/api/jobs/keywords");
  return res.data;
};

// Add more: createJob, updateJob, deleteJob
