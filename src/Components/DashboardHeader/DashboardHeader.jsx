import React from "react";
import "./DashboardHeader.css";
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const DashboardHeader = () => {

  return (
    <header className="dashboard-header-container">
     <div className="sidebar-wrapper">
        <div className="sidebar-logo">
          <img
            className="sidebar-logo-image"
            src="/src/assets/header.png"
            alt="Maternal-Path"
          />
        </div>
 </div>
      <div className="dashboard-header-right">
        <button className="dashboard-header-bell" aria-label="Notifications">
          <FiBell />
          <span className="dashboard-header-bell-dot" />
        </button>

        <div className="dashboard-header-user-info">
          <div className="dashboard-header-user-row">
            <IoSettingsOutline />
          </div>
        </div>
        <div className="dashboard-header-user">
          <div className="dashboard-header-avatar">
            <MdOutlinePeopleOutline />
          </div>
        </div>
      </div>
     
    </header>
  );
};

export default DashboardHeader;
