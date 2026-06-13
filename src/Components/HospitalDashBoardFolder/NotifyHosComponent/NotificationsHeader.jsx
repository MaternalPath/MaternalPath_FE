import React from "react";
import {
  FiFilter,
  FiCheckCircle,
  FiBell,
  FiAlertCircle,
  FiCheck,
  FiFileText,
} from "react-icons/fi";
import "./Css/NotificationsHeader.css";

const stats = [
  { icon: <FiBell />, trend: "+12", value: "6", label: "Total Notifications" },
  {
    icon: <FiAlertCircle />,
    trend: "+3",
    value: "8",
    label: "Pending Reviews",
  },
  { icon: <FiCheck />, trend: "+5", value: "15", label: "Verification Alerts" },
  {
    icon: <FiFileText />,
    trend: "+2",
    value: "6",
    label: "Bill Upload Updates",
  },
];

const tabs = [
  "All Notifications",
  "Verification Alerts",
  "Bill Updates",
  "Reviews",
  "Security Alerts",
];

const NotificationsHeader = ({ activeTab, onTabChange }) => {
  return (
    <div className="notif-header">
      <div className="notif-header-top">
        <div>
          <h1 className="notif-title">Notifications</h1>
          <p className="notif-subtitle">
            Stay updated on maternal verification and hospital activities.
          </p>
        </div>

        <div className="notif-header-actions">
          <button className="notif-filter-btn">
            <FiFilter />
            Filter Notifications
          </button>
          <button className="notif-mark-btn">
            <FiCheckCircle />
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="notif-stats-grid">
        {stats.map((stat, index) => (
          <div className="notif-stat-card" key={index}>
            <div className="notif-stat-top">
              <span className="notif-stat-icon">{stat.icon}</span>
              <span className="notif-stat-trend">↗ {stat.trend}</span>
            </div>
            <p className="notif-stat-value">{stat.value}</p>
            <p className="notif-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="notif-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`notif-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationsHeader;
