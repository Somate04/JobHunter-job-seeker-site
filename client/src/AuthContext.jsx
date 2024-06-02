import { createContext, useContext, useState } from "react";

function useAuthService() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (username) => setLoggedInUser(username);
  const logout = () => setLoggedInUser(null);

  const authService = { loggedInUser, login, logout };

  return authService;
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authService = useAuthService();

  return (
    <AuthContext.Provider value={authService}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No auth context");
  }
  return context;
};
