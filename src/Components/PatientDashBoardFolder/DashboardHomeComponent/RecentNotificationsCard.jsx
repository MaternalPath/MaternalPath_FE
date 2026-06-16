import React from "react";
import "./Css/RecentNotificationsCard.css";
import {
  FiBell,
  FiChevronRight,
  FiHeart,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";

const RecentNotificationsCard = () => {
  const notifications = [
    {
      title: "You are now in Week 24",
      desc: "Your baby is growing beautifully",
      time: "2 hours ago",
      iconBg: "#E0ECFF",
      iconColor: "#3B82F6",
      titleColor: "#10B981",
      icon: <FiHeart size={16} />,
    },
    {
      title: "Savings milestone reached",
      desc: "70% of your delivery goal",
      time: "1 day ago",
      iconBg: "#DCFCE7",
      iconColor: "#10B981",
      titleColor: "#10B981",
      icon: <FiCreditCard size={16} />,
    },

  ];

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
        {notifications.map((item, idx) => (
          <div key={idx} className="notification-item">
            <div
              className="notification-icon"
              style={{ background: item.iconBg, color: item.iconColor }}
            >
              {item.icon}
            </div>
            <div className="notification-content">
              <div
                className="notification-title"
                style={{ color: item.titleColor }}
              >
                {item.title}
              </div>
              <div className="notification-desc">{item.desc}</div>
              <div className="notification-time">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentNotificationsCard;
