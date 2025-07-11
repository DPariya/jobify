import API from "./axiosInstance";
import formatAxiosError from "../utils/formatAxiosError";

export const getJobs = async (page = 1) => {
  try {
    const res = await API.get(`/api/jobs?page=${page}`);
    return res.data;
  } catch (error) {
    throw formatAxiosError(error, "Error in fetching jobs");
  }
};

export const getJobKeywords = async () => {
  try {
    const res = await API.get("/api/jobs/keywords");
    return res.data;
  } catch (error) {
    throw formatAxiosError(error, "Error in fetching job's keyword");
  }
};

export const createJob = async (formData) => {
  try {
    const res = await API.post(`/api/jobs`, formData);
    return res.data;
  } catch (error) {
    throw formatAxiosError(error, "Error in creating job");
  }
};

export const updateJob = async (jobId, formData) => {
  try {
    const res = await API.patch(`/api/jobs/${jobId}`, formData);
    return res.data;
  } catch (error) {
    throw formatAxiosError(error, "Error in updating job");
  }
};

export const deleteJob = async (jobId) => {
  try {
    const res = await API.delete(`/api/jobs/${jobId}`);
    return res.data;
  } catch (error) {
    throw formatAxiosError(error, "Error in deleting job");
  }
};
