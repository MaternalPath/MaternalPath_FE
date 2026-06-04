import React from "react";
import "./Css/TodaysRemindersCard.css";
import { FiCheckCircle, FiCalendar, FiHeart } from "react-icons/fi";

const TodaysRemindersCard = () => {
  const reminders = [
    {
      title: "Prenatal Vitamins",
      subtitle: "Daily - Morning",
      icon: <FiCalendar size={18} />,
    },
    {
      title: "Hydration Goal",
      subtitle: "8-10 glasses today",
      icon: <FiHeart size={18} />,
    },
    {
      title: "Gentle Exercise",
      subtitle: "20-minute walk",
      icon: <FiHeart size={18} />,
    },
  ];

  return (
    <div className="card card-reminders">
      <div className="card-header">
        <div className="card-title">
          <FiCheckCircle size={18} />
          Today's Reminders
        </div>
      </div>
      <div className="reminder-list">
        {reminders.map((item, idx) => (
          <div key={idx} className="reminder-item">
            <div className="reminder-icon">{item.icon}</div>
            <div className="reminder-content">
              <div className="reminder-title">{item.title}</div>
              <div className="reminder-subtitle">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysRemindersCard;
