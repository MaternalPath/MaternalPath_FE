import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useRole } from "../context/RoleContext";
const PrivateRouting = () => {
  const { token, role, emailVerified } = useRole();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!emailVerified) {
    const otpRoute =
      role === "hospital" ? "/otpVerificationHos" : "/otpVerification";
    const email = localStorage.getItem("email") || "";
    return (
      <Navigate to={otpRoute} state={{ from: location, email, role }} replace />
    );
  }

  return <Outlet />;
};
export const RoleRoute = ({ allowedRole }) => {
  const { role } = useRole();

  if (role !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRouting;
