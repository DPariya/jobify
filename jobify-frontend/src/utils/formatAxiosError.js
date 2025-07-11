// src/utils/formatAxiosError.js

const formatAxiosError = (error, defaultMessage = "Something went wrong") => {
  let msg = error?.response?.data?.msg || defaultMessage;
  const code = error?.response?.data?.code || "UNKNOWN_ERROR";
  const status = error?.response?.status || 500;

  const err = new Error(msg);
  err.code = code;
  err.status = status;

  return err;
};

export default formatAxiosError;
