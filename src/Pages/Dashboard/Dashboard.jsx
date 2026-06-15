import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FiX, FiLogOut, FiAlertCircle } from "react-icons/fi";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useRole } from "../../context/RoleContext";
import { getNavItems } from "../../config/navItems";
import logo from "../../assets/header.png";

import "./Dashboard.css";

const PROFILE_PATH = "/dashboard/profile";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const navItems = getNavItems(role);

  const isLocked =
    role === "mother" && localStorage.getItem("isUpdated") !== "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isUpdated");
    setRole("mother");
    closeMobileMenu();
    navigate("/login");
  };

  const isLinkLocked = (path) => isLocked && path !== PROFILE_PATH;

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
          {navItems.map((item) => {
            const locked = isLinkLocked(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={(e) => {
                  if (locked) {
                    e.preventDefault();
                    return;
                  }
                  closeMobileMenu();
                }}
                aria-disabled={locked}
                tabIndex={locked ? -1 : undefined}
                className={({ isActive }) =>
                  `mobile-drawer-link ${isActive ? "active" : ""} ${locked ? "disabled" : ""}`
                }
              >
                {item.label}
              </NavLink>
            );
          })}

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
        <Sidebar isLocked={isLocked} />
        <main className="dashboard-content">
          {isLocked && (
            <div className="profile-lock-banner" role="alert">
              <FiAlertCircle size={18} />
              <span>
                Please complete your profile to unlock the rest of your
                dashboard.
              </span>
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
