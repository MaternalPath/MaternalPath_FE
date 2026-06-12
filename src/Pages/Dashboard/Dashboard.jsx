import  { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FiX, FiLogOut } from "react-icons/fi";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useRole } from "../../context/RoleContext";
import { getNavItems } from "../../config/navItems";
import logo from "../../assets/header.png";

import "./Dashboard.css";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const navItems = getNavItems(role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole("mother");
    closeMobileMenu();
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

      {isMobileMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={closeMobileMenu}></div>
      )}
      <aside className={`mobile-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <img src={logo} alt="MaternalPath" className="drawer-logo" />
          <button className="drawer-close" onClick={closeMobileMenu}>
            <FiX size={24} />
          </button>
        </div>

        <nav className="mobile-drawer-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `mobile-drawer-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <button
            type="button"
            className="mobile-drawer-logout"
            onClick={handleLogout}
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
