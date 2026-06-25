import React, { useState } from "react";
import "./SettingsStyles/AccountSettings.css";
import { Shield, Lock, Check, Zap, Eye, EyeOff } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    approvalAuthLevel: "",
    walletThreshold: "$5,000",
    readinessFrequency: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

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

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast.error("Please enter your password to confirm account deletion");
      return;
    }

    if (!token) {
      toast.error("Authentication token not found. Please login again.");
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`${baseURL}/hospital/delete-account`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          password: deletePassword,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setShowDeleteModal(false);
      setDeletePassword("");

      toast.success("Account deleted successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error deleting account:", error);

      if (error.response) {
        const status = error.response.status;
        const message =
          error.response.data?.message || "Failed to delete account";

        if (status === 401) {
          toast.error("Invalid password or session expired. Please try again.");
        } else if (status === 400) {
          toast.error(message);
        } else if (status === 403) {
          toast.error("You don't have permission to delete this account");
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
      setIsDeleting(false);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setDeletePassword("");
    setShowPassword(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletePassword("");
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="account-settings-container">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 99999 }}
      /> */}

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
            <button className="management-btn management-btn-logout">
              <FiLogOut size={18} />
              Log Out
            </button>
            <button
              className="management-btn management-btn-delete"
              onClick={openDeleteModal}
            >
              <RiDeleteBinLine size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Account</h2>
              <button className="modal-close-btn" onClick={closeDeleteModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-warning-icon">
                <IoWarning />
              </div>
              <p className="modal-warning-text">
                Are you sure you want to delete your account? This action is
                <strong> permanent</strong> and cannot be undone. All your data
                will be permanently removed.
              </p>

              <div className="modal-form-group">
                <label className="modal-form-label">
                  Enter your password to confirm
                </label>
                <div className="modal-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="modal-form-input"
                    placeholder="Enter your password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleDeleteAccount();
                      }
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    className="modal-password-toggle"
                    onClick={togglePasswordVisibility}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#6b7280" />
                    ) : (
                      <Eye size={20} color="#6b7280" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-btn modal-btn-secondary"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="modal-btn modal-btn-danger"
                onClick={handleDeleteAccount}
                disabled={isDeleting || !deletePassword.trim()}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;