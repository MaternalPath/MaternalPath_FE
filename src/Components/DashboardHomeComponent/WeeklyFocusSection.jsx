import React from "react";
import "./Css/WeeklyFocusSection.css";
import { FiHeart, FiTarget } from "react-icons/fi";

const WeeklyFocusSection = () => {
  const weeklyFocus = [
    {
      title: "Nutrition",
      desc: "Iron-rich foods and proper hydration",
      cardBg: "#F0F6FF",
      cardBorder: "#D6E4FF",
      iconBg: "#E0ECFF",
      iconColor: "#3B82F6",
      textColor: "#3B82F6",
      titleColor: "#3B82F6",
      icon: <FiHeart size={16} />,
    },
    {
      title: "Wellness",
      desc: "Gentle prenatal yoga and adequate rest",
      cardBg: "#F0FDF4",
      cardBorder: "#D1FAE5",
      iconBg: "#DCFCE7",
      iconColor: "#10B981",
      textColor: "#10B981",
      titleColor: "#10B981",
      icon: <FiHeart size={16} />,
    },
    {
      title: "Milestone",
      desc: "Second trimester progressing well",
      cardBg: "#FFFFFF",
      cardBorder: "#E5E7EB",
      iconBg: "#F9FAFB",
      iconColor: "#374151",
      textColor: "#374151",
      titleColor: "#374151",
      icon: <FiTarget size={16} />,
    },
  ];

  return (
    <div className="focus-section">
      <h3 className="section-title">This Week's Focus</h3>
      <div className="focus-grid">
        {weeklyFocus.map((item, idx) => (
          <div
            key={idx}
            className="focus-card"
            style={{
              background: item.cardBg,
              borderColor: item.cardBorder,
            }}
          >
            <div
              className="focus-icon"
              style={{
                background: item.iconBg,
                color: item.iconColor,
              }}
            >
              {item.icon}
            </div>
            <div className="focus-title" style={{ color: item.titleColor }}>
              {item.title}
            </div>
            <div className="focus-desc" style={{ color: item.textColor }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyFocusSection;
