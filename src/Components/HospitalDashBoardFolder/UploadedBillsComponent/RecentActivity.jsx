import React from "react";
import { FiFileText, FiShield, FiLock, FiCheckCircle } from "react-icons/fi";
import "./Css/RecentActivity.css";

const activities = [
  { text: "New bill uploaded for Sarah Johnson", time: "2 hours ago" },
  { text: "Bill BL-2024-001 verified and approved", time: "3 hours ago" },
  { text: "Payment confirmed for Maria Garcia", time: "5 hours ago" },
  { text: "Review request sent for Bill BL-2024-003", time: "1 day ago" },
];

const securityItems = [
  { icon: <FiShield />, text: "Secure document upload" },
  { icon: <FiLock />, text: "Encrypted patient billing records" },
  { icon: <FiCheckCircle />, text: "Authorized hospital access" },
  { icon: <FiFileText />, text: "Data privacy compliance" },
];

const RecentActivity = () => {
  return (
    <div className="activity-security">
      <div className="panel">
        <h2 className="panel-title">Recent Activity</h2>
        <div className="panel-list">
          {activities.map((item, index) => (
            <div className="activity-item" key={index}>
              <span className="activity-icon">
                <FiFileText />
              </span>
              <div>
                <p className="activity-text">{item.text}</p>
                <p className="activity-time">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-title">Security &amp; Compliance</h2>
        <div className="panel-list">
          {securityItems.map((item, index) => (
            <div className="security-item" key={index}>
              <span className="security-icon">{item.icon}</span>
              <p className="security-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;