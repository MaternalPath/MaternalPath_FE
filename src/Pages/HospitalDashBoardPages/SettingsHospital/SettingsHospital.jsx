import React, { useState, useEffect, useRef } from "react";
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
  const [logoFile, setLogoFile] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
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

      const profile = response.data?.data || response.data || {};

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

      // FIXED: Logo URL construction
      if (profile.hospitalLogo) {
        if (
          profile.hospitalLogo.startsWith("http://") ||
          profile.hospitalLogo.startsWith("https://")
        ) {
          setLogoUrl(profile.hospitalLogo);
        } else {
          // Get base URL without /api/v1 or similar
          const baseWithoutApi = baseURL.replace(/\/api\/v\d+\/?$/, "");
          // Ensure the path has a leading slash
          const logoPath = profile.hospitalLogo.startsWith("/")
            ? profile.hospitalLogo
            : `/${profile.hospitalLogo}`;
          setLogoUrl(`${baseWithoutApi}${logoPath}`);
        }
      } else {
        setLogoUrl(null);
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

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "hospitalName":
        if (!value.trim()) {
          newErrors.hospitalName = "Hospital name is required";
        } else if (value.trim().length < 2) {
          newErrors.hospitalName =
            "Hospital name must be at least 2 characters";
        } else {
          delete newErrors.hospitalName;
        }
        break;

      case "phoneNumber":
        if (!value.trim()) {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!/^[\+\d\s\-\(\)]{10,}$/.test(value.trim())) {
          newErrors.phoneNumber = "Please enter a valid phone number";
        } else {
          delete newErrors.phoneNumber;
        }
        break;

      case "deliveryAmount":
        if (value) {
          const cleaned = value.replace(/,/g, "");
          if (isNaN(parseFloat(cleaned)) || parseFloat(cleaned) < 0) {
            newErrors.deliveryAmount = "Please enter a valid positive number";
          } else {
            delete newErrors.deliveryAmount;
          }
        } else {
          delete newErrors.deliveryAmount;
        }
        break;

      case "hospitalAddress":
        if (!value.trim()) {
          newErrors.hospitalAddress = "Hospital address is required";
        } else if (value.trim().length < 5) {
          newErrors.hospitalAddress = "Address must be at least 5 characters";
        } else {
          delete newErrors.hospitalAddress;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[name];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "deliveryAmount") {
      const cleaned = value.replace(/[^0-9,.]/g, "");
      const parts = cleaned.split(".");
      if (parts.length > 2) {
        return;
      }
      if (parts.length === 2 && parts[1].length > 2) {
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
      validateField(name, cleaned);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      validateField(name, value);
    }
  };

  const handleUploadLogo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG and JPG files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be 5 MB or less.");
      e.target.value = "";
      return;
    }

    setLogoFile(file);
    setLogoUrl(URL.createObjectURL(file));
    toast.success("Logo uploaded successfully!");
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.hospitalName.trim()) {
      newErrors.hospitalName = "Hospital name is required";
      isValid = false;
    } else if (formData.hospitalName.trim().length < 2) {
      newErrors.hospitalName = "Hospital name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^[\+\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number";
      isValid = false;
    }

    if (formData.deliveryAmount) {
      const cleaned = formData.deliveryAmount.replace(/,/g, "");
      if (isNaN(parseFloat(cleaned)) || parseFloat(cleaned) < 0) {
        newErrors.deliveryAmount = "Please enter a valid positive number";
        isValid = false;
      }
    }

    if (!formData.hospitalAddress.trim()) {
      newErrors.hospitalAddress = "Hospital address is required";
      isValid = false;
    } else if (formData.hospitalAddress.trim().length < 5) {
      newErrors.hospitalAddress = "Address must be at least 5 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (originalData) {
      setFormData(originalData);
      setLogoFile(null);
      setErrors({});
      fetchHospitalProfile();
      setIsEditing(false);
    }
  };

  const handleSaveChanges = async () => {
    if (!token) {
      toast.error("Please login again to save changes");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix all validation errors before saving");
      return;
    }

    setIsSaving(true);

    try {
      let rawAmount = formData.deliveryAmount.replace(/,/g, "");
      const deliveryFee = rawAmount ? parseFloat(rawAmount) : 0;

      const payload = new FormData();
      payload.append("hospitalName", formData.hospitalName.trim());
      payload.append("phoneNumber", formData.phoneNumber.trim());
      payload.append("address", formData.hospitalAddress.trim());
      payload.append("deliveryFee", deliveryFee.toString());

      if (logoFile) {
        payload.append("hospitalLogo", logoFile);
      }

      await axios.put(`${baseURL}/hospital/profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      setLogoFile(null);
      await fetchHospitalProfile();
      setErrors({});
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving hospital profile:", error);

      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "Failed to save changes";

        if (status === 401) {
          toast.error("Session expired. Please login again.");
        } else if (status === 400) {
          toast.error(message);
          if (error.response.data?.errors) {
            setErrors(error.response.data.errors);
          }
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(message);
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = () => {
    if (!originalData) return false;

    for (let key in originalData) {
      if (formData[key] !== originalData[key]) {
        return true;
      }
    }

    if (logoFile) return true;
    return false;
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && hasChanges();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="hospital-settings-container">
        <div className="hospital-settings-header">
          <div className="hospital-settings-title-section">
            <h1 className="hospital-settings-title">Settings</h1>
            <p className="hospital-settings-subtitle">
              Manage hospital account preferences and verification settings.
            </p>
          </div>
          <div className="hospital-settings-actions">
            {!isEditing ? (
              <button
                className="hospital-btn hospital-btn-primary"
                onClick={handleEditClick}
                disabled={isLoading || isSaving}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="hospital-btn hospital-btn-secondary"
                  onClick={handleCancelEdit}
                  disabled={isSaving || isLoading}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </button>
                <button
                  className="hospital-btn hospital-btn-success"
                  onClick={handleSaveChanges}
                  disabled={!isFormValid() || isSaving || isLoading}
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
              </>
            )}
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
                    onError={(e) => {
                      console.error("Failed to load image:", logoUrl);
                      e.target.style.display = "none";
                      // Fallback to icon
                      setLogoUrl(null);
                    }}
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
                  disabled={!isEditing || isLoading || isSaving}
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
                  <label className="hospital-form-label">
                    Hospital Name <span className="required-field">*</span>
                  </label>
                  <div className="hospital-input-wrapper">
                    <PiBuildingOffice className="hospital-input-icon" />
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className={`hospital-form-input ${
                        errors.hospitalName ? "input-error" : ""
                      } ${!isEditing ? "input-disabled" : ""}`}
                      placeholder="St. Mary's Hospital"
                      disabled={!isEditing || isLoading || isSaving}
                      readOnly={!isEditing}
                    />
                  </div>
                  {errors.hospitalName && (
                    <span className="error-message">{errors.hospitalName}</span>
                  )}
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
                      className={`hospital-form-input ${
                        errors.deliveryAmount ? "input-error" : ""
                      } ${!isEditing ? "input-disabled" : ""}`}
                      placeholder="300,000.00"
                      disabled={!isEditing || isLoading || isSaving}
                      readOnly={!isEditing}
                    />
                  </div>
                  {errors.deliveryAmount && (
                    <span className="error-message">
                      {errors.deliveryAmount}
                    </span>
                  )}
                </div>

                <div className="hospital-form-group">
                  <label className="hospital-form-label">
                    Phone Number <span className="required-field">*</span>
                  </label>
                  <div className="hospital-input-wrapper">
                    <IoCallOutline className="hospital-input-icon" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`hospital-form-input ${
                        errors.phoneNumber ? "input-error" : ""
                      } ${!isEditing ? "input-disabled" : ""}`}
                      placeholder="+1 (555) 123-4567"
                      disabled={!isEditing || isLoading || isSaving}
                      readOnly={!isEditing}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="error-message">{errors.phoneNumber}</span>
                  )}
                </div>

                <div className="hospital-form-group hospital-form-group-full">
                  <label className="hospital-form-label">
                    Hospital Address <span className="required-field">*</span>
                  </label>
                  <div className="hospital-input-wrapper">
                    <GrLocation className="hospital-inputAddress-icon" />
                    <textarea
                      name="hospitalAddress"
                      value={formData.hospitalAddress}
                      onChange={handleInputChange}
                      className={`hospital-form-input-Address ${
                        errors.hospitalAddress ? "input-error" : ""
                      } ${!isEditing ? "input-disabled" : ""}`}
                      placeholder="123 Healthcare Drive, Medical District, City, State 12345"
                      rows="3"
                      disabled={!isEditing || isLoading || isSaving}
                      readOnly={!isEditing}
                    />
                  </div>
                  {errors.hospitalAddress && (
                    <span className="error-message">
                      {errors.hospitalAddress}
                    </span>
                  )}
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
