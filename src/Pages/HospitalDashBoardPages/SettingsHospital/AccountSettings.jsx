import React, { useState } from "react";
import "./SettingsStyles/AccountSettings.css";
import { Shield, Lock, Check, Zap } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    approvalAuthLevel: "",
    walletThreshold: "$5,000",
    readinessFrequency: "",
  });

  const privacyFeatures = [
    {
      id: 1,
      title: "Data Protection Enabled",
      status: "Active",
      icon: <Shield size={18} color="#1b5e6a" />,
    },
    {
      id: 2,
      title: "End-to-End Encryption",
      status: "Active",
      icon: <Lock size={18} color="#1b5e6a" />,
    },
    {
      id: 3,
      title: "HIPAA Compliant",
      status: "Verified",
      icon: <Check size={18} color="#1b5e6a" />,
    },
    {
      id: 4,
      title: "Secure Document Storage",
      status: "Active",
      icon: <Zap size={18} color="#1b5e6a" />,
    },
  ];

  const activityLog = [
    {
      id: 1,
      action: "Password changed",
      timestamp: "2 days ago",
    },
    {
      id: 2,
      action: "Two-factor authentication enabled",
      timestamp: "1 week ago",
    },
    {
      id: 3,
      action: "Notification preferences updated",
      timestamp: "2 weeks ago",
    },
    {
      id: 4,
      action: "Profile information updated",
      timestamp: "3 weeks ago",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogOut = () => {
    console.log("[v0] Log out clicked");
  };

  const handleDeleteAccount = () => {
    console.log("[v0] Delete account clicked");
  };

  return (
    <div className="account-settings-container">
      <div className="account-settings-content">
        <div className="settings-top-section">
          <div className="settings-card verification-section">
            <h2 className="verification-card-title">Verification Settings</h2>

            <div className="verification-form-group">
              <label className="verification-form-label">
                Approval Authorization Level
              </label>
              <input
                type="text"
                name="approvalAuthLevel"
                value={formData.approvalAuthLevel}
                onChange={handleInputChange}
                className="verification-form-input"
                // placeholder="Select authorization level"
              />
            </div>

            <div className="verification-form-group">
              <label className="verification-form-label">
                Wallet Verification Threshold
              </label>
              <input
                type="text"
                name="walletThreshold"
                value={formData.walletThreshold}
                onChange={handleInputChange}
                className="verification-form-input"
                placeholder="$5,000"
              />
            </div>

            <div className="verification-form-group">
              <label className="verification-form-label">
                Readiness Review Frequency
              </label>
              <input
                type="text"
                name="readinessFrequency"
                value={formData.readinessFrequency}
                onChange={handleInputChange}
                className="verification-form-input"
                // placeholder="Select frequency"
              />
            </div>
          </div>

          <div className="settings-card privacy-section">
            <h2 className="privacy-card-title">Privacy & Data</h2>

            <div className="privacy-features">
              {privacyFeatures.map((feature) => (
                <div key={feature.id} className="privacy-item">
                  <div className="privacy-icon">{feature.icon}</div>
                  <div className="privacy-content">
                    <p className="privacy-title">{feature.title}</p>
                  </div>
                  <span
                    className={`privacy-badge ${feature.status.toLowerCase()}`}
                  >
                    {feature.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="recent-activity-section">
          <h2 className="recent-section-title">Recent Account Activity</h2>

          <div className="recent-activity-list">
            {activityLog.map((activity) => (
              <div key={activity.id} className="recent-activity-item">
                <div className="recent-activity-dot"></div>
                <div className="recent-activity-content">
                  <p className="recent-activity-action">{activity.action}</p>
                </div>
                <span className="recent-activity-timestamp">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="management-section">
          <h2 className="management-section-title">Account Management</h2>
          <p className="management-description">
            Manage your account settings and access
          </p>

          <div className="management-buttons">
            <button
              className="management-btn management-btn-logout"
              onClick={handleLogOut}
            >
              <FiLogOut size={18} />
              Log Out
            </button>
            <button
              className="management-btn management-btn-delete"
              onClick={handleDeleteAccount}
            >
              <RiDeleteBinLine size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
