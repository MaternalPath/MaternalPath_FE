import { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiX, FiLogOut, FiAlertCircle } from "react-icons/fi";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useRole } from "../../context/RoleContext";
import { getNavItems } from "../../config/navItems";
import LogoutModal from "../../Auth/LogoutModal/LogoutModal";
import logo from "../../assets/header.png";
import "./Dashboard.css";

const PROFILE_PATH = "/dashboard/profile";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutMode, setLogoutMode] = useState("login");
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { role, logout, isUpdated } = useRole();
  const navItems = getNavItems(role);

  const isLocked = role === "mother" && !isUpdated;

  const handleLogoLogout = () => {
    setLogoutMode("landing");
    setShowLogoutModal(true);
  };

  const handleSidebarLogout = () => {
    setLogoutMode("login");
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    closeMobileMenu();

    if (logoutMode === "landing") {
      window.location.href = "/";
    }
  };

  const isLinkLocked = (path) => isLocked && path !== PROFILE_PATH;

  return (
    <div className="dashboard-layout">
      <DashboardHeader
        onMenuClick={() => setIsMobileMenuOpen(true)}
        onLogoutClick={handleLogoLogout}
      />

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
          <div className="mobile-drawer-links">
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
                  title={locked ? "Complete your profile to unlock" : undefined}
                  className={({ isActive }) =>
                    `mobile-drawer-link ${isActive ? "active" : ""} ${locked ? "disabled" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <button
            type="button"
            className="mobile-drawer-logout"
            onClick={handleSidebarLogout}
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      <div className="dashboard-body">
        <Sidebar isLocked={isLocked} onLogoutClick={handleSidebarLogout} />
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

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleConfirmLogout}
        title={
          logoutMode === "landing"
            ? "Leave dashboard?"
            : "Log out of your account?"
        }
        description={
          logoutMode === "landing"
            ? "You’ll be logged out and returned to the homepage."
            : "You’ll be returned to the login screen. You can always log back in."
        }
        confirmText={logoutMode === "landing" ? "Go to Homepage" : "Log Out"}
      />
    </div>
  );
};

export default Dashboard;
