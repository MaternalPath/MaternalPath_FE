import React, { useState, useEffect } from "react";
import "./Styles/PatientVerification.css";
import { FiSearch } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import { searchPatient, getRecentNotifications } from "../../../api/hospital";

const PatientVerification = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(true);

  // Fetch recent notifications
  const fetchRecentNotifications = async () => {
    setNotifLoading(true);
    try {
      const data = await getRecentNotifications();
      const notificationsList = data?.data || data || [];
      setNotifications(notificationsList);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentNotifications();
  }, []);

  const getNotifIcon = (type) => {
    const map = {
      verification_alert: <IoMdCheckmarkCircleOutline />,
      pending_review: <IoTimeOutline />,
      bill_upload_update: <RiErrorWarningLine />,
      system_notification: <FiBell />,
      general: <FiBell />,
    };
    return map[type] || <FiBell />;
  };

  const getNotifStyleType = (type) => {
    const map = {
      verification_alert: "success",
      pending_review: "warning",
      bill_upload_update: "info",
      system_notification: "info",
      general: "info",
    };
    return map[type] || "info";
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      toast.warning("Please enter a Patient ID or Phone Number");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchPatient(searchInput.trim());
      const patient = data?.data || data;

      if (patient && Object.keys(patient).length > 0) {
        setPatientData(patient);
        toast.success("Patient found successfully!");
      } else {
        setPatientData(null);
        toast.info("No patient found with the provided information.");
      }
    } catch (error) {
      console.error("Error searching patient:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to search patient";
      setError(errorMessage);
      toast.error(errorMessage);
      setPatientData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (error || patientData) {
      setError(null);
      setPatientData(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const walletBalance =
    patientData?.walletBalance || patientData?.wallet_balance || 0;
  const savingsGoal =
    patientData?.deliverySavingsGoal || patientData?.delivery_savings_goal || 1;
  const progressPercentage = Math.min((walletBalance / savingsGoal) * 100, 100);

  return (
    <div className="patient-verification-container">
      <ToastContainer />
      <div className="patient-verification-section">
        <div className="patient-verification-section-header">
          <h2 className="patient-verification-section-title">
            Patient Verification
          </h2>
          <p className="patient-verification-section-subtitle">
            Search and verify patient delivery fund status
          </p>
        </div>

        <div className="patient-verification-search-container">
          <input
            type="text"
            className="patient-verification-search-input"
            placeholder="Enter Patient ID or Phone Number (e.g., MP-2024-889 or 08012345678)"
            value={searchInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className="patient-verification-search-button"
            onClick={handleSearch}
            disabled={isLoading}
          >
            <span className="patient-verification-search-icon">
              <FiSearch />
            </span>
            {isLoading ? "Searching..." : "Search Patient"}
          </button>
        </div>

        {isLoading && (
          <div className="patient-verification-loading">
            <div className="patient-verification-loading-spinner"></div>
            <p>Searching for patient...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="patient-verification-error">
            <p>{error}</p>
          </div>
        )}

        {patientData && !isLoading && !error && (
          <div className="patient-verification-patient-card">
            <div className="patient-verification-patient-header">
              <div>
                <h3 className="patient-verification-patient-name">
                  {patientData.patientName ||
                    patientData.patient_name ||
                    patientData.name ||
                    "N/A"}
                </h3>
                <p className="patient-verification-patient-id">
                  Patient ID:{" "}
                  {patientData.patientId ||
                    patientData.patient_id ||
                    patientData.id ||
                    "N/A"}
                </p>
              </div>
              <div className="patient-verification-eligibility-badge">
                {walletBalance >= savingsGoal
                  ? "Eligible for Admission"
                  : "Insufficient Funds"}
              </div>
            </div>

            <div className="patient-verification-patient-info-grid">
              <div className="patient-verification-info-item">
                <label className="patient-verification-info-label">
                  Pregnancy Stage
                </label>
                <p className="patient-verification-info-value">
                  {patientData.pregnancyStage ||
                    patientData.pregnancy_stage ||
                    "Week 0 · Not specified"}
                </p>
              </div>
              <div className="patient-verification-info-item">
                <label className="patient-verification-info-label">
                  Preferred Hospital
                </label>
                <p className="patient-verification-info-value">
                  {patientData.preferredHospital ||
                    patientData.preferred_hospital ||
                    patientData.hospital ||
                    "Not specified"}
                </p>
              </div>
            </div>

            <div className="patient-verification-patient-info-grid">
              <div className="patient-verification-info-item">
                <label className="patient-verification-info-label">
                  Wallet Balance
                </label>
                <p className="patient-verification-info-value">
                  ₦{walletBalance.toLocaleString()}
                </p>
              </div>
              <div className="patient-verification-info-item">
                <label className="patient-verification-info-label">
                  Delivery Savings Goal
                </label>
                <p className="patient-verification-info-value">
                  ₦{savingsGoal.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="patient-verification-readiness-section">
              <label className="patient-verification-readiness-label">
                Readiness Status
              </label>
              <div className="patient-verification-progress-bar-container">
                <div
                  className="patient-verification-progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="patient-verification-progress-text">
                {progressPercentage.toFixed(0)}% of goal achieved
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="patient-verification-notifications-section">
        <div className="patient-verification-section-header">
          <h2 className="patient-verification-section-title">Notifications</h2>
          <p className="patient-verification-section-subtitle">
            Recent activity updates
          </p>
        </div>

        <div className="patient-verification-notifications-list">
          {notifLoading ? (
            <p className="patient-verification-notification-time">Loading...</p>
          ) : notifications.length === 0 ? (
            <p className="patient-verification-notification-time">
              No recent notifications.
            </p>
          ) : (
            notifications.map((notification) => {
              const styleType = getNotifStyleType(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`patient-verification-notification-item patient-verification-notification-${styleType}`}
                >
                  <div
                    className={`patient-verification-notification-icon patient-verification-icon-${styleType}`}
                  >
                    {getNotifIcon(notification.type)}
                  </div>
                  <div className="patient-verification-notification-content">
                    <p className="patient-verification-notification-title">
                      {notification.message || notification.title}
                    </p>
                    <p className="patient-verification-notification-time">
                      {notification.timestamp || notification.time}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          className="patient-verification-view-all-button"
          onClick={() =>
            (window.location.href = "/dashboard/notificationsHospital")
          }
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default PatientVerification;
