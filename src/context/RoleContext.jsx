import { createContext, useContext, useState } from "react";

const DEFAULT_ROLE = "mother";

const RoleContext = createContext({
  role: DEFAULT_ROLE,
  setRole: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(DEFAULT_ROLE);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
