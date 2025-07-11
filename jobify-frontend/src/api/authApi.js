import API from "./axiosInstance";
import formatAxiosError from "../utils/formatAxiosError";

export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/api/auth/login", credentials);
    return res.data;
  } catch (error) {
    throw formatAxiosError(error, "Login failed");
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await API.post("/api/auth/register", userData);
    return res.data;
  } catch (error) {
    throw formatAxiosError(error, "Register failed");
  }
};

export const logoutUser = async () => {
  await API.post("/api/auth/logout");
};
