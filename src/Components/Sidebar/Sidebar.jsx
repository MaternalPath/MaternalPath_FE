import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiHeart,
  FiCreditCard,
  FiBookOpen,
  FiBell,
  FiUser,
} from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = () => {
  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard Overview",
      icon: <FiGrid size={20} />,
      end: true,
    },
    {
      path: "/dashboard/pregnancyTracker",
      label: "Pregnancy Tracker",
      icon: <FiHeart size={20} />,
    },
    {
      path: "/dashboard/emergencyWallet",
      label: "Emergency Wallet",
      icon: <FiCreditCard size={20} />,
    },
    {
      path: "/dashboard/healthGuidance",
      label: "Health Guidance",
      icon: <FiBookOpen size={20} />,
    },
    {
      path: "/dashboard/notifications",
      label: "Notifications",
      icon: <FiBell size={20} />,
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: <FiUser size={20} />,
    },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
