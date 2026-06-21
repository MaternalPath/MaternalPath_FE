import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const PublicRoute = () => {
  const { token, logout } = useRole();

  useEffect(() => {
    if (token) {
      localStorage.removeItem("token"); // use your actual key
      localStorage.removeItem("user"); // clear any other auth data
      logout(); // clear context
    }
  }, [token, logout]);

  return <Outlet />;
};

export default PublicRoute;
