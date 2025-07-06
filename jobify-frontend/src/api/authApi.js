import API from "./axiosInstance";

export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/api/auth/login", credentials);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const registerUser = async (userData) => {
  const res = await API.post("/api/auth/register", userData);
  return res.data;
};

export const logoutUser = async () => {
  await API.post("/api/auth/logout");
};
