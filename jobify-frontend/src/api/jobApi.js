import API from "./axiosInstance";

export const searchJobs = async (query) => {
  const res = await API.get(`/api/jobs?${query}`);
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

export const createJob = async (formData) => {
  const res = await API.post(`/api/jobs`, formData);
  return res.data;
};

export const updateJob = async (jobId, formData) => {
  const res = await API.patch(`/api/jobs/${jobId}`, formData);
  return res.data;
};

export const deleteJob = async (jobId) => {
  const res = await API.delete(`/api/jobs/${jobId}`);
  return res.data;
};
