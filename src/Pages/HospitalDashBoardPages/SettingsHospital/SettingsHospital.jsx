import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SettingsHospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    deliveryAmount: "",
    phoneNumber: "",
    hospitalAddress: "",
  });

  const [logoUrl, setLogoUrl] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const serverOrigin = baseURL?.replace(/\/api\/v\d+\/?$/, "");
  const token = localStorage.getItem("token");

  const fetchHospitalProfile = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/hospital/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Full API response:", response);
      const profile = response.data?.data || response.data || {};
      console.log("Profile data:", profile);

      const mapped = {
        hospitalName: profile.hospitalName || "",
        deliveryAmount:
          profile.deliveryFee !== undefined && profile.deliveryFee !== null
            ? Number(profile.deliveryFee).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })
            : "",
        phoneNumber: profile.phoneNumber || "",
        hospitalAddress: profile.address || "",
      };

      setFormData(mapped);
      setOriginalData(mapped);

      if (profile.hospitalLogo) {
        console.log("Logo path from API:", profile.hospitalLogo);

        if (
          profile.hospitalLogo.startsWith("http://") ||
          profile.hospitalLogo.startsWith("https://")
        ) {
          setLogoUrl(profile.hospitalLogo);
          console.log("Logo is full URL:", profile.hospitalLogo);
        } else {
          const fullLogoUrl = `${serverOrigin}${profile.hospitalLogo}`;
          setLogoUrl(fullLogoUrl);
          console.log("Full logo URL:", fullLogoUrl);
        }
      } else {
        setLogoUrl(null);
        console.log("No logo found");
      }
    } catch (error) {
      console.error("Error fetching hospital profile:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load hospital profile",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadLogo = (e) => {
    console.log("[v0] Logo upload triggered");
  };

  const handleSaveChanges = () => {
    setIsSaving(true);
    console.log("[v0] Saving changes:", formData);
    setTimeout(() => {
      setIsSaving(false);
      console.log("[v0] Changes saved successfully");
    }, 1500);
  };

  const handleResetSettings = () => {
    console.log("[v0] Resetting settings");
    if (originalData) {
      setFormData(originalData);
    }
  };

  return (
    <>
      <ToastContainer />
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
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Hospital logo"
                    className="hospital-logo-image"
                  />
                ) : (
                  <PiBuildingOffice className="hospital-logo-icon" />
                )}
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

            {isLoading ? (
              <div className="hospital-settings-loading">
                Loading hospital profile...
              </div>
            ) : (
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
                  <label className="hospital-form-label">
                    Hospital Address
                  </label>
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
            )}
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
