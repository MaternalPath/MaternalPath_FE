import React from "react";
import "./Css/RecentNotificationsCard.css";
import { FiBell, FiChevronRight, FiHeart } from "react-icons/fi";

const formatTime = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const RecentNotificationsCard = ({ notifications = [] }) => {
  return (
    <section className="card card-notifications">
      <div className="card-header">
        <div className="card-title">
          <FiBell size={18} />
          Recent Notifications
        </div>
        <a className="card-link">
          View All <FiChevronRight size={14} />
        </a>
      </div>
      <div className="notification-list">
        {notifications.length === 0 && (
          <p className="notification-empty">No new notifications.</p>
        )}
        {notifications.map((item, idx) => (
          <div key={item.id ?? idx} className="notification-item">
            <div className="notification-icon">
              <FiHeart size={16} />
            </div>
            <div className="notification-content">
              <div className="notification-title">
                {item.title ?? item.message ?? "Notification"}
              </div>
              {item.description && (
                <div className="notification-desc">{item.description}</div>
              )}
              <div className="notification-time">
                {formatTime(item.createdAt ?? item.time)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentNotificationsCard;
