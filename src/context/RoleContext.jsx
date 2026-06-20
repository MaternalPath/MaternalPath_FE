import { createContext, useContext, useState } from "react";

const DEFAULT_ROLE = "mother";
const ROLE_KEY = "role";
const TOKEN_KEY = "token";
const PROFILE_PICTURE_KEY = "profilePicture";

const readRole = () => {
  const stored = localStorage.getItem(ROLE_KEY);
  return stored === "hospital" || stored === "mother" ? stored : DEFAULT_ROLE;
};

const readIsUpdated = () => localStorage.getItem("isUpdated") === "true";
const readProfilePicture = () => localStorage.getItem(PROFILE_PICTURE_KEY) || "";

const RoleContext = createContext({
  role: DEFAULT_ROLE,
  token: null,
  isUpdated: false,
  profilePicture: "",
  login: () => {},
  logout: () => {},
  setIsUpdated: () => {},
  setProfilePicture: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(readRole);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isUpdated, setIsUpdatedState] = useState(readIsUpdated);
  const [profilePicture, setProfilePictureState] = useState(readProfilePicture);

  const login = (newToken, newRole) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ROLE_KEY, newRole);
    setToken(newToken);
    setRole(newRole);
  };

  const setIsUpdated = (value) => {
    localStorage.setItem("isUpdated", String(value));
    setIsUpdatedState(Boolean(value));
  };

  const setProfilePicture = (url) => {
    const next = url || "";
    if (next) {
      localStorage.setItem(PROFILE_PICTURE_KEY, next);
    } else {
      localStorage.removeItem(PROFILE_PICTURE_KEY);
    }
    setProfilePictureState(next);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem("isUpdated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem(PROFILE_PICTURE_KEY);
    setToken(null);
    setRole(DEFAULT_ROLE);
    setIsUpdatedState(false);
    setProfilePictureState("");
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        token,
        isUpdated,
        profilePicture,
        login,
        logout,
        setIsUpdated,
        setProfilePicture,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
