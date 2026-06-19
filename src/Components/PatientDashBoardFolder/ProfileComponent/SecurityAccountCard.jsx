import React from "react";
import { useNavigate } from "react-router-dom";
import "./Css/SecurityAccountCard.css";
import { FiChevronRight } from "react-icons/fi";

const SecurityAccountCard = () => {
  const navigate = useNavigate();
  const items = [
    { label: "Change Password", path: "/forgotPassword" },
    { label: "Privacy Settings" },
    { label: "Terms & Conditions" },
  ];

  return (
    <div className="settings-card">
      <div className="card-title">Security & Account Settings</div>
      <div className="settings-list">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="settings-row link-row"
            onClick={() => item.path && navigate(item.path)}
            style={item.path ? { cursor: "pointer" } : undefined}
          >
            <span className={`settings-label ${item.isLogout? "logout" : ""}`}>
              {item.icon && <span className="logout-icon">{item.icon}</span>}
              {item.label}
            </span>
            <FiChevronRight size={16} className="chevron" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityAccountCard;