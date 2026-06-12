import React, { useState } from "react";
import "./SettingsStyles/SettingsHospital.css";
import SecuritySettings from "./SecuritySettings";
import NotificationPreferences from "./NotificationPreferences";
import AccountSettings from "./AccountSettings";
import { PiBuildingOffice } from "react-icons/pi";
import { GrUpload } from "react-icons/gr";
import { RiUser3Line } from "react-icons/ri";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";

const SettingsHospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: "St. Mary's Hospital",
    adminFullName: "Dr. Emily Carter",
    deliveryAmount: "300,000.00",
    phoneNumber: "+1 (555) 123-4567",
    hospitalAddress:
      "123 Healthcare Drive, Medical District, City, State 12345",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadLogo = (e) => {
    console.log("[v0] Logo upload triggered");
    // Handle logo upload logic here
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    console.log("[v0] Saving changes:", formData);
    // Simulate save action
    setTimeout(() => {
      setIsSaving(false);
      console.log("[v0] Changes saved successfully");
    }, 1500);
  };

  const handleResetSettings = () => {
    console.log("[v0] Resetting settings");
    // Reset logic would go here
    setFormData({
      hospitalName: "St. Mary's Hospital",
      adminFullName: "Dr. Emily Carter",
      deliveryAmount: "300,000.00",
      phoneNumber: "+1 (555) 123-4567",
      hospitalAddress:
        "123 Healthcare Drive, Medical District, City, State 12345",
    });
  };

  return (
    <>
      <div className="hospital-settings-container">
        <div className="hospital-settings-header">
          <div className="hospital-settings-title-section">
            <h1 className="hospital-settings-title">Settings</h1>
            <p className="hospital-settings-subtitle">
              Manage hospital account preferences and verification settings.
            </p>
          </div>
          <div className="hospital-settings-actions">
            <button
              className="hospital-btn hospital-btn-secondary"
              onClick={handleResetSettings}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
              Reset Settings
            </button>
            <button
              className="hospital-btn hospital-btn-primary"
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="hospital-settings-content">
          <div className="hospital-profile-settings-section">
            <h2 className="hospital-section-title">Profile Settings</h2>

            <div className="hospital-logo-upload-section">
              <div className="hospital-logo-icon-container">
                <PiBuildingOffice className="hospital-logo-icon" />
              </div>
              <div className="hospital-logo-info">
                <h3 className="hospital-logo-title">Hospital Logo</h3>
                <p className="hospital-logo-description">
                  Upload your hospital logo (PNG, JPG - Max 5MB)
                </p>
                <button
                  className="hospital-btn-upload"
                  onClick={handleUploadLogo}
                >
                  <GrUpload />
                  Upload Logo
                </button>
              </div>
            </div>

            <div className="hospital-form-grid">
              <div className="hospital-form-group">
                <label className="hospital-form-label">Hospital Name</label>
                <div className="hospital-input-wrapper">
                  <PiBuildingOffice className="hospital-input-icon" />
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="hospital-form-input"
                    placeholder="St. Mary's Hospital"
                  />
                </div>
              </div>

              <div className="hospital-form-group">
                <label className="hospital-form-label">Admin Full Name</label>
                <div className="hospital-input-wrapper">
                  <RiUser3Line className="hospital-input-icon" />
                  <input
                    type="text"
                    name="adminFullName"
                    value={formData.adminFullName}
                    onChange={handleInputChange}
                    className="hospital-form-input"
                    placeholder="Dr. Emily Carter"
                  />
                </div>
              </div>

              <div className="hospital-form-group">
                <label className="hospital-form-label">Delivery Amount</label>
                <div className="hospital-input-wrapper">
                  <span className="hospital-currency-symbol">₦</span>
                  <input
                    type="text"
                    name="deliveryAmount"
                    value={formData.deliveryAmount}
                    onChange={handleInputChange}
                    className="hospital-form-input"
                    placeholder="300,000.00"
                  />
                </div>
              </div>

              <div className="hospital-form-group">
                <label className="hospital-form-label">Phone Number</label>
                <div className="hospital-input-wrapper">
                  <IoCallOutline className="hospital-input-icon" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="hospital-form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="hospital-form-group hospital-form-group-full">
                <label className="hospital-form-label">Hospital Address</label>
                <div className="hospital-input-wrapper">
                  <GrLocation className="hospital-inputAddress-icon" />
                  <textarea
                    type="text"
                    name="hospitalAddress"
                    value={formData.hospitalAddress}
                    onChange={handleInputChange}
                    className="hospital-form-input-Address"
                    placeholder="123 Healthcare Drive, Medical District, City, State 12345"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SecuritySettings />
      <NotificationPreferences />
      <AccountSettings />
    </>
  );
};

export default SettingsHospital;
