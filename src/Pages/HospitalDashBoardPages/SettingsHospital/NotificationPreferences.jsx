import React, { useState } from "react";
import "./SettingsStyles/NotificationPreferences.css";

const NotificationPreferences = () => {
  const [notifications, setNotifications] = useState({
    patientVerification: true,
    billUpload: true,
    deliveryReadiness: true,
    emailNotifications: true,
    systemMaintenance: false,
  });

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    console.log("[v0] Toggled", key, "to", !notifications[key]);
  };

  const notificationSettings = [
    {
      id: "patientVerification",
      title: "Patient Verification Alerts",
      description: "Get notified about new verification requests",
      enabled: notifications.patientVerification,
    },
    {
      id: "billUpload",
      title: "Bill Upload Notifications",
      description: "Alerts when new bills are uploaded",
      enabled: notifications.billUpload,
    },
    {
      id: "deliveryReadiness",
      title: "Delivery Readiness Updates",
      description: "Updates on patient delivery preparedness",
      enabled: notifications.deliveryReadiness,
    },
    {
      id: "emailNotifications",
      title: "Email Notifications",
      description: "Receive notifications via email",
      enabled: notifications.emailNotifications,
    },
    {
      id: "systemMaintenance",
      title: "System Maintenance Alerts",
      description: "Notifications about system updates",
      enabled: notifications.systemMaintenance,
    },
  ];

  return (
    <div className="notification-preferences-wrapper">
      <div className="notification-preferences-content">
        <h1 className="preferences-title">Notification Preferences</h1>

        <div className="pre-notification-grid">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="pre-notification-card">
              <div className="card-content-holder">
                <h3 className="content-card-titles">{setting.title}</h3>
                <p className="content-card-description">
                  {setting.description}
                </p>
              </div>

              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id={setting.id}
                  checked={setting.enabled}
                  onChange={() => handleToggle(setting.id)}
                  className="toggle-input"
                />
                <label htmlFor={setting.id} className="toggle-label"></label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
