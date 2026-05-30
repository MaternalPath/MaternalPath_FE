import "./Dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const Dashboard = () => {
  return (
     <div className="dashboard-main">
        <DashboardHeader />
    <div className="dashboard-layout">
      <Sidebar />
     
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
