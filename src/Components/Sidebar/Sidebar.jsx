import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useRole } from "../../context/RoleContext";
import { getNavItems } from "../../config/navItems";
import LogoutModal from "../LogoutModal/LogoutModal";
import "./Sidebar.css";

const PROFILE_PATH = "/dashboard/profile";

const Sidebar = ({ isLocked = false }) => {
  const navigate = useNavigate();
  const { role, logout } = useRole();
  const navItems = getNavItems(role);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <aside className="sidebar-navi">
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const locked = isLocked && item.path !== PROFILE_PATH;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={(e) => {
                  if (locked) e.preventDefault();
                }}
                aria-disabled={locked}
                tabIndex={locked ? -1 : undefined}
                title={locked ? "Complete your profile to unlock" : undefined}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""} ${locked ? "disabled" : ""}`
                }
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          className="sidebar-logout"
          onClick={() => setShowLogoutModal(true)}
        >
          <span className="sidebar-icon">
            <FiLogOut size={18} />
          </span>
          <span className="sidebar-label">Logout</span>
        </button>
      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleConfirmLogout}
      />
    </>
  );
};

export default Sidebar;
