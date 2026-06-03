import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  FiX,
  FiGrid,
  FiHeart,
  FiCreditCard,
  FiBookOpen,
  FiBell,
  FiUser,
} from "react-icons/fi";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import logo from "../../assets/header.png";
import "./Dashboard.css";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard overview", end: true },
    { path: "/dashboard/pregnancyTracker", label: "Pregnancy Tracker" },
    { path: "/dashboard/emergencyWallet", label: "Emergency Wallet" },
    { path: "/dashboard/healthGuidance", label: "Health Guidance" },
    { path: "/dashboard/notifications", label: "Notification" },
    { path: "/dashboard/profile", label: "Profile & Settings" },
  ];

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
