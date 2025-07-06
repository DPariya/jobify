import axios from "axios";
import { getToken } from "../utils/localStorage";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    // Modify the response data or handle the response
    return response.data;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default API;
