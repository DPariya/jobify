import { useState, createContext } from "react";
import { getUser, setUser, clearUser } from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());

  const login = (userData) => {
    const { user, accessToken } = userData;
    setUser(user, accessToken);
    setUserState(userData);
  };
  const logout = () => {
    clearUser();
    setUserState(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
