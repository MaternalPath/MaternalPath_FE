import React, { useState } from "react";
import "./SettingsStyles/SecuritySettings.css";
import { RxLaptop } from "react-icons/rx";

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div className="security-settings-container">
      <div className="security-settings-wrapper">
        <h1 className="security-title">Security Settings</h1>

        <div className="settings-section">
          <div className="section-content">
            <div className="section-text">
              <h2 className="section-title">Change Password</h2>
              <p className="section-description">
                Update your account password
              </p>
            </div>
            <button className="change-password-btn">
              <svg
                className="lock-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Change Password
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-content">
            <div className="section-text">
              <h2 className="section-title">Two-Factor Authentication</h2>
              <p className="section-description">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={toggleTwoFactor}
                className="toggle-input"
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-section login-activity-section">
          <h2 className="section-title">Recent Login Activity</h2>

          <div className="login-item">
            <div className="login-icon">
              <RxLaptop />
            </div>
            <div className="login-details">
              <div className="device-name">Chrome on Windows</div>
              <div className="login-meta">New York, USA • 2 hours ago</div>
            </div>
            {/* <div className="current-session-badge">Current Session</div> */}
          </div>

          <div className="login-item">
            <div className="login-icon">
              <RxLaptop />
            </div>
            <div className="login-details">
              <div className="device-name">Safari on MacOS</div>
              <div className="login-meta">Lagos, Nigeria • 1 day ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
