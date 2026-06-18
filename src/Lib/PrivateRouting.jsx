import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const PrivateRouting = () => {
  const { token } = useRole();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/getStarted" state={{ from: location }} replace />
  );
};

export default PrivateRouting;
