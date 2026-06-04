import React from "react";
import "./DashboardHeader.css";
import { FiBell, FiMenu } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePeopleOutline } from "react-icons/md";
import logo from "../../assets/header.png";

const DashboardHeader = ({ onMenuClick }) => {
  return (
    <header className="dashboard-header-container">
      <div className="sidebar-logo">
        <img src={logo} alt="MaternalPath" className="sidebar-logo-image" />
      </div>

      <div className="dashboard-header-right desktop-dashHeader">
        <button className="header-icon-btn" aria-label="Notifications">
          <FiBell size={20} />
          <span className="dashboard-header-bell-dot" />
        </button>

        <button className="header-icon-btn" aria-label="Settings">
          <IoSettingsOutline size={20} />
        </button>

        <div className="dashboard-header-avatar">
          <MdOutlinePeopleOutline size={20} />
        </div>
      </div>

      <button
        className="menu-toggle mobile-dashHeader"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <FiMenu size={24} />
      </button>
    </header>
  );
};

export default DashboardHeader;
