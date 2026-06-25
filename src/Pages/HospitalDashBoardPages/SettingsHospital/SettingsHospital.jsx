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
import { FaHospitalUser } from "react-icons/fa";
import { MdEdit, MdSave, MdCancel, MdUpload } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const SettingsHospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    deliveryFee: "",
    phoneNumber: "",
    address: "",
    medicalLicenseNumber: "",
  });

  const [logoUrl, setLogoUrl] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [verificationDocUrl, setVerificationDocUrl] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

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

      const responseData = response?.data?.data || response?.data || response;

      const profile = Array.isArray(responseData)
        ? responseData[0]
        : responseData;

      const logo = Array.isArray(responseData)
        ? responseData[1]
        : profile?.hospitalLogo;

      const verificationDoc = Array.isArray(responseData)
        ? responseData[2]
        : profile?.verificationDocuments;

      const mapped = {
        hospitalName: profile?.hospitalName || "",
        deliveryFee:
          profile?.deliveryFee !== undefined && profile?.deliveryFee !== null
            ? Number(profile.deliveryFee).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })
            : "",
        phoneNumber: profile?.phoneNumber || "",
        address: profile?.address || "",
        medicalLicenseNumber: profile?.medicalLicenseNumber || "",
      };

      setFormData(mapped);
      setOriginalData(mapped);

      if (logo) {
        setLogoUrl(logo);
      } else {
        setLogoUrl(null);
      }

      if (verificationDoc) {
        setVerificationDocUrl(verificationDoc);
      } else {
        setVerificationDocUrl(null);
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

      case "deliveryFee":
        if (value) {
          const cleaned = value.replace(/,/g, "");
          if (isNaN(parseFloat(cleaned)) || parseFloat(cleaned) < 0) {
            newErrors.deliveryFee = "Please enter a valid positive number";
          } else {
            delete newErrors.deliveryFee;
          }
        } else {
          delete newErrors.deliveryFee;
        }
        break;

      case "address":
        if (!value.trim()) {
          newErrors.address = "Hospital address is required";
        } else if (value.trim().length < 5) {
          newErrors.address = "Address must be at least 5 characters";
        } else {
          delete newErrors.address;
        }
        break;

      case "medicalLicenseNumber":
        if (!value.trim()) {
          newErrors.medicalLicenseNumber = "Medical license number is required";
        } else {
          delete newErrors.medicalLicenseNumber;
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

    if (name === "deliveryFee") {
      const cleaned = value.replace(/[^0-9,.]/g, "");
      const parts = cleaned.split(".");
      if (parts.length > 2) return;
      if (parts.length === 2 && parts[1].length > 2) return;
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

    if (formData.deliveryFee) {
      const cleaned = formData.deliveryFee.replace(/,/g, "");
      if (isNaN(parseFloat(cleaned)) || parseFloat(cleaned) < 0) {
        newErrors.deliveryFee = "Please enter a valid positive number";
        isValid = false;
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = "Hospital address is required";
      isValid = false;
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
      isValid = false;
    }

    if (!formData.medicalLicenseNumber.trim()) {
      newErrors.medicalLicenseNumber = "Medical license number is required";
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
    setUploadProgress(0);

    try {
      let rawAmount = formData.deliveryFee.replace(/,/g, "");
      const deliveryFee = rawAmount ? parseFloat(rawAmount) : 0;

      const payload = new FormData();
      payload.append("hospitalName", formData.hospitalName.trim());
      payload.append("phoneNumber", formData.phoneNumber.trim());
      payload.append("address", formData.address.trim());
      payload.append("deliveryFee", deliveryFee.toString());
      payload.append(
        "medicalLicenseNumber",
        formData.medicalLicenseNumber.trim(),
      );

      if (logoFile) {
        payload.append("hospitalLogo", logoFile);
      }

      const response = await axios.put(`${baseURL}/hospital/profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
      });

      toast.success("Profile updated successfully!");
      setLogoFile(null);
      await fetchHospitalProfile();
      setErrors({});
      setIsEditing(false);
      setUploadProgress(0);
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
        } else if (status === 404) {
          toast.error("Hospital not found. Please contact support.");
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
      setUploadProgress(0);
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

  const getInitials = (name) => {
    if (!name) return "H";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <main className="hospital-settings-main-container">
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
            <div className="hospital-title-badge">
              <FaHospitalUser className="hospital-title-icon" />
              <h1 className="hospital-settings-title">Settings</h1>
            </div>
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
                <MdEdit size={18} />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="hospital-btn hospital-btn-secondary"
                  onClick={handleCancelEdit}
                  disabled={isSaving || isLoading}
                >
                  <MdCancel size={18} />
                  Cancel
                </button>
                <button
                  className="hospital-btn hospital-btn-success"
                  onClick={handleSaveChanges}
                  disabled={!isFormValid() || isSaving || isLoading}
                >
                  <MdSave size={18} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="hospital-profile-settings-section">
          <div className="hospital-section-header">
            <h2 className="hospital-section-title">Profile Settings</h2>
            {isEditing && <span className="editing-badge">Editing Mode</span>}
          </div>

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
                    setLogoUrl(null);
                  }}
                />
              ) : (
                <div className="hospital-logo-placeholder">
                  <span className="hospital-logo-initials">
                    {getInitials(formData.hospitalName)}
                  </span>
                </div>
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
                <MdUpload size={18} />
                Upload Logo
              </button>
              {isEditing && (
                <span className="hospital-edit-hint">
                  Click to upload a new logo
                </span>
              )}
            </div>
          </div>

          {verificationDocUrl && !isEditing && (
            <div className="hospital-verification-doc">
              <h4>Verification Document</h4>
              <a
                href={verificationDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="verification-doc-link"
              >
                View Verification Document
              </a>
            </div>
          )}

          {isLoading ? (
            <div className="hospital-settings-loading">
              <div className="loading-spinner"></div>
              <p>Loading hospital profile...</p>
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
                <label className="hospital-form-label">
                  Medical License Number{" "}
                  <span className="required-field">*</span>
                </label>
                <div className="hospital-input-wrapper">
                  <RiUser3Line className="hospital-input-icon" />
                  <input
                    type="text"
                    name="medicalLicenseNumber"
                    value={formData.medicalLicenseNumber}
                    onChange={handleInputChange}
                    className={`hospital-form-input ${
                      errors.medicalLicenseNumber ? "input-error" : ""
                    } ${!isEditing ? "input-disabled" : ""}`}
                    placeholder="MED-12345"
                    disabled={!isEditing || isLoading || isSaving}
                    readOnly={!isEditing}
                  />
                </div>
                {errors.medicalLicenseNumber && (
                  <span className="error-message">
                    {errors.medicalLicenseNumber}
                  </span>
                )}
              </div>

              <div className="hospital-form-group">
                <label className="hospital-form-label">
                  Delivery Fee
                  <span className="field-hint">(Optional)</span>
                </label>
                <div className="hospital-input-wrapper">
                  <span className="hospital-currency-symbol">₦</span>
                  <input
                    type="text"
                    name="deliveryFee"
                    value={formData.deliveryFee}
                    onChange={handleInputChange}
                    className={`hospital-form-input ${
                      errors.deliveryFee ? "input-error" : ""
                    } ${!isEditing ? "input-disabled" : ""}`}
                    placeholder="300,000.00"
                    disabled={!isEditing || isLoading || isSaving}
                    readOnly={!isEditing}
                  />
                </div>
                {errors.deliveryFee && (
                  <span className="error-message">{errors.deliveryFee}</span>
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
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`hospital-form-input-Address ${
                      errors.address ? "input-error" : ""
                    } ${!isEditing ? "input-disabled" : ""}`}
                    placeholder="123 Healthcare Drive, Medical District, City, State"
                    rows="3"
                    disabled={!isEditing || isLoading || isSaving}
                    readOnly={!isEditing}
                  />
                </div>
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              {isSaving && uploadProgress > 0 && (
                <div className="upload-progress-container">
                  <div className="upload-progress-bar">
                    <div
                      className="upload-progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="upload-progress-text">
                    Uploading... {uploadProgress}%
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <SecuritySettings />
      <NotificationPreferences />
      <AccountSettings />
    </main>
  );
};

export default SettingsHospital;
