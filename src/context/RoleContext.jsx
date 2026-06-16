import { createContext, useContext, useState, useEffect } from "react";

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
  loading: true,
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(readRole);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedRole = localStorage.getItem(ROLE_KEY);

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole || DEFAULT_ROLE);
    }
    setLoading(false);
  }, []);

  const login = (newToken, newRole) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ROLE_KEY, newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    setToken(null);
    setRole(DEFAULT_ROLE);
  };

  return (
    <RoleContext.Provider value={{ role, token, login, logout, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
