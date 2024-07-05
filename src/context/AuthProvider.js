import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=> JSON.parse(localStorage.getItem("user")));

  const login = (newUser, callback) => {
    setUser(newUser);
    callback();
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = (callback) => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
