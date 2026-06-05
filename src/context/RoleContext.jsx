import { createContext, useContext, useState } from "react";

const DEFAULT_ROLE = "mother"; // "mother" | "hospital"

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

// eslint-disable-next-line react-refresh/only-export-components
export const useRole = () => useContext(RoleContext);
