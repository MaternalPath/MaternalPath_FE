import React, { useState } from "react";
import "./Css/NotificationPreferencesCard.css";

const NotificationPreferencesCard = () => {
  const [preferences, setPreferences] = useState({
    pregnancy: true,
    wellness: true,
    savings: true,
    hospital: true,
    email: false,
  });

  const togglePref = (key) => {
    setPreferences((prev) => ({...prev, [key]:!prev[key] }));
  };

  const items = [
    { key: "pregnancy", label: "Pregnancy reminders" },
    { key: "wellness", label: "Wellness tips" },
    { key: "savings", label: "Savings reminders" },
    { key: "hospital", label: "Hospital notifications" },
    { key: "email", label: "Email notifications" },
  ];

  return (
    <div className="settings-card">
      <div className="card-title">Notification Preferences</div>
      <div className="settings-list">
        {items.map((item) => (
          <div key={item.key} className="settings-row">
            <span className="settings-label">{item.label}</span>
            <button
              type="button"
              className={`toggle ${preferences[item.key]? "active" : ""}`}
              onClick={() => togglePref(item.key)}
              aria-pressed={preferences[item.key]}
            >
              <span className="toggle-thumb"></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferencesCard;