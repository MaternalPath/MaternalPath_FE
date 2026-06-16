import { createContext, useContext, useState } from "react";

const DEFAULT_ROLE = "mother"; // "mother" | "hospital"
const ROLE_KEY = "role";

const readRole = () => {
  const stored = localStorage.getItem(ROLE_KEY);
  return stored === "hospital" || stored === "mother" ? stored : DEFAULT_ROLE;
};

const RoleContext = createContext({
  role: DEFAULT_ROLE,
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(readRole);

  const setRole = (next) => {
    setRoleState(next);
    localStorage.setItem(ROLE_KEY, next);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => useContext(RoleContext);
