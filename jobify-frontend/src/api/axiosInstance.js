import axios from "axios";
import { getToken, setUser, clearUser } from "../utils/localStorage";
import { toast } from "react-toastify";
import useAuth from "./../contexts/useAuth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //  Required to send refreshToken cookie
});

// Request interceptor: attach accessToken
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

// Response interceptor: handle expired access token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle response errors
    const originalRequest = error.config;

    //If token expired and not already retried
    if (
      (error?.response?.status == 401 || error?.response?.status == 500) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { logout } = useAuth();
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL / api / auth / refresh - token}`,
          {
            withCredentials: true,
          }
        );
        const newToken = res.accessToken;
        setUser({ user: res.user, accessToken: newToken }); // TODO:: get User from backend
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        clearUser();
        logout();
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
