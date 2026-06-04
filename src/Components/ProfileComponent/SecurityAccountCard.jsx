import React from "react";
import "./Css/SecurityAccountCard.css";
import { FiChevronRight, FiLogOut } from "react-icons/fi";

const SecurityAccountCard = () => {
  const items = [
    { label: "Change Password" },
    { label: "Privacy Settings" },
    { label: "Terms & Conditions" },
    { label: "Logout", icon: <FiLogOut size={16} />, isLogout: true },
  ];

  return (
    <div className="settings-card">
      <div className="card-title">Security & Account Settings</div>
      <div className="settings-list">
        {items.map((item, idx) => (
          <div key={idx} className="settings-row link-row">
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