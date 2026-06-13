import React from "react";
import { FiShield, FiCheck, FiActivity } from "react-icons/fi";
import "./Css/ActivityStatus.css";

const activities = [
  { text: "Verification approved for Sarah Johnson", time: "2 hours ago" },
  { text: "Bill uploaded for Memorial Hospital", time: "4 hours ago" },
  { text: "Wallet confirmation completed", time: "6 hours ago" },
  { text: "Hospital review action for Emily Chen", time: "1 day ago" },
  { text: "Delivery readiness updated", time: "2 days ago" },
];

const systemStatus = [
  {
    icon: <FiShield />,
    label: "Secure Verification",
    status: "Active",
    statusType: "gray",
  },
  {
    icon: <FiCheck />,
    label: "Privacy Compliance",
    status: "Updated",
    statusType: "green",
  },
  {
    icon: <FiActivity />,
    label: "Encrypted Workflow",
    status: "Running",
    statusType: "green",
  },
];

const ActivityStatus = () => {
  return (
    <div className="activity-status">
      <div className="activity-panel">
        <h2 className="activity-status-title">Recent Activity</h2>
        <div className="activity-list">
          {activities.map((item, index) => (
            <div className="activity-row" key={index}>
              <span className="activity-dot"></span>
              <div>
                <p className="activity-text">{item.text}</p>
                <p className="activity-time">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="status-panel">
        <h2 className="activity-status-title">System Status</h2>
        <div className="status-list">
          {systemStatus.map((item, index) => (
            <div className="status-row" key={index}>
              <span className="status-icon">{item.icon}</span>
              <span className="status-label">{item.label}</span>
              <span className={`status-badge ${item.statusType}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStatus;
