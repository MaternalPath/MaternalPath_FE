import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DEFAULT_ROLE = "mother";
const ROLE_KEY = "role";
const TOKEN_KEY = "token";
const PROFILE_PICTURE_KEY = "profilePicture";
const HOSPITAL_LOGO_KEY = "hospitalLogo";
const EMAIL_VERIFIED_KEY = "emailVerified";
const EMAIL_KEY = "email";

const readRole = () => {
  const stored = localStorage.getItem(ROLE_KEY);
  return stored === "hospital" || stored === "mother" ? stored : DEFAULT_ROLE;
};

const readIsUpdated = () => localStorage.getItem("isUpdated") === "true";
const readProfilePicture = () =>
  localStorage.getItem(PROFILE_PICTURE_KEY) || "";
const readHospitalLogo = () => localStorage.getItem(HOSPITAL_LOGO_KEY) || "";
const readEmailVerified = () =>
  localStorage.getItem(EMAIL_VERIFIED_KEY) === "true";

const RoleContext = createContext({
  role: DEFAULT_ROLE,
  token: null,
  isUpdated: false,
  profilePicture: "",
  hospitalLogo: "",
  emailVerified: false,
  isLoading: false,
  login: () => {},
  logout: () => {},
  setIsUpdated: () => {},
  setProfilePicture: () => {},
  setHospitalLogo: () => {},
  setEmailVerified: () => {},
  fetchHospitalProfile: () => {},
});

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(readRole);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isUpdated, setIsUpdatedState] = useState(readIsUpdated);
  const [profilePicture, setProfilePictureState] = useState(readProfilePicture);
  const [hospitalLogo, setHospitalLogoState] = useState(readHospitalLogo);
  const [emailVerified, setEmailVerifiedState] = useState(readEmailVerified);
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL?.trim();

  const login = (newToken, newRole, verified = false, email = "") => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ROLE_KEY, newRole);
    localStorage.setItem(EMAIL_VERIFIED_KEY, String(verified));
    // Use the single EMAIL_KEY constant for consistency
    if (email) localStorage.setItem(EMAIL_KEY, email);
    setToken(newToken);
    setRole(newRole);
    setEmailVerifiedState(verified);
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

  const setHospitalLogo = (url) => {
    const next = url || "";
    if (next) {
      localStorage.setItem(HOSPITAL_LOGO_KEY, next);
    } else {
      localStorage.removeItem(HOSPITAL_LOGO_KEY);
    }
    setHospitalLogoState(next);
  };

  const setEmailVerified = (value) => {
    localStorage.setItem(EMAIL_VERIFIED_KEY, String(value));
    setEmailVerifiedState(Boolean(value));
  };

  const fetchHospitalProfile = async () => {
    if (!token || role !== "hospital" || !baseURL) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/hospital/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseData = response?.data?.data || response;

      // Extract logo URL
      let logoUrl = null;
      if (Array.isArray(responseData)) {
        logoUrl = responseData[1] || null;
      } else {
        logoUrl = responseData?.hospitalLogo || null;
      }

      // FIX: Clear priority rule — profilePicture takes precedence over logo.
      // Only fall back to logo if no dedicated profilePicture exists.
      if (logoUrl) {
        setHospitalLogo(logoUrl);
      }

      if (responseData?.profilePicture) {
        // Dedicated profile picture exists — use it
        setProfilePicture(responseData.profilePicture);
      } else if (logoUrl) {
        // No profile picture — fall back to hospital logo
        setProfilePicture(logoUrl);
      }
    } catch (error) {
      console.error("Error fetching hospital profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (role === "hospital" && token && emailVerified) {
      fetchHospitalProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, token, emailVerified]);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem("isUpdated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    localStorage.removeItem(PROFILE_PICTURE_KEY);
    localStorage.removeItem(HOSPITAL_LOGO_KEY);
    localStorage.removeItem(EMAIL_VERIFIED_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setToken(null);
    setRole(DEFAULT_ROLE);
    setIsUpdatedState(false);
    setProfilePictureState("");
    setHospitalLogoState("");
    setEmailVerifiedState(false);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        token,
        isUpdated,
        profilePicture,
        hospitalLogo,
        emailVerified,
        isLoading,
        login,
        logout,
        setIsUpdated,
        setProfilePicture,
        setHospitalLogo,
        setEmailVerified,
        fetchHospitalProfile,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
