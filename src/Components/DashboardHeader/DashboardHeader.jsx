import React from "react";
import "./DashboardHeader.css";
import { FiBell, FiMenu } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePeopleOutline } from "react-icons/md";
import logo from "/src/assets/header.png";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext";

const DashboardHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { role, profilePicture } = useRole();

  const handleNotificationsClick = () => {
    const targetRoute =
      role === "hospital"
        ? "/dashboard/notificationsHospital"
        : "/dashboard/notifications";
    navigate(targetRoute);
  };

  const handleProfileClick = () => {
    const targetRoute =
      //   role === "hospital"
      //     ? "/dashboard/settingsHospital"
      //     : "/dashboard/profile";
      // navigate(targetRoute);
      navigate("/dashboard/settingsHospital");
  };

  return (
    <header className="dashboard-header-container">
      <div className="sidebar-logo">
        <img
          src={logo}
          onClick={() => navigate("/")}
          alt="MaternalPath"
          className="sidebar-logo-image"
        />
      </div>

      <div className="dashboard-header-right desktop-dashHeader">
        <button
          className="header-icon-btn"
          aria-label="Notifications"
          onClick={handleNotificationsClick}
        >
          <FiBell size={21} />
          <span className="dashboard-header-bell-dot" />
        </button>

        <button
          className="dashboard-header-avatar"
          aria-label="Profile"
          onClick={handleProfileClick}
          type="button"
        >
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="dashboard-header-avatar-img"
            />
          ) : (
            <MdOutlinePeopleOutline size={21} />
          )}
        </button>
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
