import { createContext, useContext, useState } from "react";

const DEFAULT_ROLE = "mother";
const ROLE_KEY = "role";
const TOKEN_KEY = "token";

const readRole = () => {
  const stored = localStorage.getItem(ROLE_KEY);
  return stored === "hospital" || stored === "mother" ? stored : DEFAULT_ROLE;
};

const RoleContext = createContext({
  role: DEFAULT_ROLE,
  token: null,
  login: () => {},
  logout: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(readRole);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const login = (newToken, newRole) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ROLE_KEY, newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem("isUpdated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    setToken(null);
    setRole(DEFAULT_ROLE);
  };

  return (
    <RoleContext.Provider value={{ role, token, login, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => useContext(RoleContext);
