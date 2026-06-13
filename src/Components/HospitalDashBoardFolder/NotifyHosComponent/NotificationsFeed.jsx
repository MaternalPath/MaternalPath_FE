import React from "react";
import {
  FiCheck,
  FiFileText,
  FiActivity,
  FiAlertCircle,
  FiShield,
  FiEye,
  FiX,
} from "react-icons/fi";
import "./Css/NotificationsFeed.css";

const notifications = [
  {
    id: 1,
    icon: <FiCheck />,
    iconType: "green",
    title: "New Patient Verification Request",
    description:
      "Sarah Johnson has submitted a maternal fund verification request for $4,500",
    time: "10 minutes ago",
    badge: "Pending Review",
    badgeType: "orange",
    highlight: false,
  },
  {
    id: 2,
    icon: <FiFileText />,
    iconType: "teal",
    title: "Uploaded Bill Confirmation",
    description: "Bill BL-2024-042 has been successfully uploaded and verified",
    time: "1 hour ago",
    badge: "Confirmed",
    badgeType: "green",
    highlight: true,
  },
  {
    id: 3,
    icon: <FiActivity />,
    iconType: "gray",
    title: "Delivery Readiness Alert",
    description:
      "Emily Chen is now at Week 38 - delivery preparation checklist updated",
    time: "3 hours ago",
    badge: null,
    highlight: false,
  },
  {
    id: 4,
    icon: <FiAlertCircle />,
    iconType: "red",
    title: "Pending Review Reminder",
    description: "Verification request VER-2024-087 requires your approval",
    time: "5 hours ago",
    badge: "Awaiting Approval",
    badgeType: "red",
    highlight: false,
  },
  {
    id: 5,
    icon: <FiCheck />,
    iconType: "green",
    title: "Wallet Verification Approved",
    description:
      "Patient wallet for Jessica Brown has been verified and approved",
    time: "1 day ago",
    badge: "Approved",
    badgeType: "green",
    highlight: false,
  },
  {
    id: 6,
    icon: <FiShield />,
    iconType: "red",
    title: "Hospital Authorization Update",
    description: "Your hospital verification permissions have been updated",
    time: "2 days ago",
    badge: "Updated",
    badgeType: "green",
    highlight: false,
  },
];

const NotificationsFeed = () => {
  return (
    <div className="notif-feed">
      <h2 className="notif-feed-title">All Notifications</h2>
      <div className="notif-feed-list">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`notif-card ${item.highlight ? "highlight" : ""}`}
          >
            <div className={`notif-card-icon ${item.iconType}`}>
              {item.icon}
            </div>
            <div className="notif-card-content">
              <h3 className="notif-card-title">{item.title}</h3>
              <p className="notif-card-desc">{item.description}</p>
              <div className="notif-card-footer">
                <span className="notif-card-time">{item.time}</span>
                {item.badge && (
                  <span className={`notif-badge ${item.badgeType}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
            <div className="notif-card-actions">
              <button title="View">
                <FiEye />
              </button>
              <button title="Dismiss">
                <FiX />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsFeed;
