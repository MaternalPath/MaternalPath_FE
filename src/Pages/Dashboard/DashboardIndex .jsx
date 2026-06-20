import { Navigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import DashboardHome from "../PatientDashBoardPages/DashboardHome/DashboardHome";

const DashboardIndex = () => {
  const { role, isUpdated } = useRole();

  if (!role) return null;

  if (role === "hospital") {
    return <Navigate to="/dashboard/hospitalOverview" replace />;
  }

  if (role === "mother") {
    return isUpdated ? (
      <DashboardHome />
    ) : (
      <Navigate to="/dashboard/profile" replace />
    );
  }

  return <Navigate to="/login" replace />;
};

export default DashboardIndex;
