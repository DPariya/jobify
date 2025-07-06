const TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const setUser = (user, accessToken) => {
  console.log("user,token in local", user, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, accessToken);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => localStorage.getItem(USER_KEY);

export const clearUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
