import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const PrivateRouting = () => {
  const { token, role, emailVerified } = useRole();
  const location = useLocation();

  // 1. No token = go to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Has token but email not verified = go to OTP
  if (!emailVerified) {
    const otpRoute =
      role === "hospital" ? "/otpVerificationHos" : "/otpVerification";
    const email = localStorage.getItem("email"); // optional: pass email if you store it
    return (
      <Navigate to={otpRoute} state={{ from: location, email, role }} replace />
    );
  }

  // 3. Token + verified = allow dashboard routes
  return <Outlet />;
};

export default PrivateRouting;
