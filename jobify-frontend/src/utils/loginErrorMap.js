// src/utils/loginErrorMap.js
export const loginErrorMap = {
  USER_NOT_FOUND: {
    message: "This account not registered, please register yourself",
    action: (navigate) => navigate("/register"),
  },
};

export const defaultLoginError = {
  message: "Something went wrong. Please try again.",
};
