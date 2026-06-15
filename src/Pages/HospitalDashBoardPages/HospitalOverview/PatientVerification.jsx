import React, { useState } from "react";
import "./Styles/PatientVerification.css";
import { FiSearch } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";

const PatientVerification = () => {
  const handleSearch = () => {};

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const notifications = [
    {
      id: 1,
      type: "success",
      icon: <IoMdCheckmarkCircleOutline />,
      title: "OTP verified for patient #MRP-2845",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "warning",
      icon: <IoTimeOutline />,
      title: "Authorization pending for ₦385,000",
      time: "12 min ago",
    },
    {
      id: 3,
      type: "info",
      icon: <RiErrorWarningLine />,
      title: "New verification request received",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="patient-verification-container">
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
            placeholder="Enter Patient ID or Phone Number"
            // value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="patient-verification-search-button"
            onClick={handleSearch}
          >
            <span className="patient-verification-search-icon">
              <FiSearch />
            </span>
            Search Patient
          </button>
        </div>

        <div className="patient-verification-patient-card">
          <div className="patient-verification-patient-header">
            <div>
              <h3 className="patient-verification-patient-name">
                Adaeze Nnamdi
              </h3>
              <p className="patient-verification-patient-id">
                Patient ID: MRP-2847
              </p>
            </div>
            <div className="patient-verification-eligibility-badge">
              Eligible for Admission
            </div>
          </div>

          <div className="patient-verification-patient-info-grid">
            <div className="patient-verification-info-item">
              <label className="patient-verification-info-label">
                Pregnancy Stage
              </label>
              <p className="patient-verification-info-value">
                Week 38 · Third Trimester
              </p>
            </div>
            <div className="patient-verification-info-item">
              <label className="patient-verification-info-label">
                Preferred Hospital
              </label>
              <p className="patient-verification-info-value">
                Lagos General Hospital
              </p>
            </div>
          </div>

          <div className="patient-verification-patient-info-grid">
            <div className="patient-verification-info-item">
              <label className="patient-verification-info-label">
                Wallet Balance
              </label>
              <p className="patient-verification-info-value">₦425,000</p>
            </div>
            <div className="patient-verification-info-item">
              <label className="patient-verification-info-label">
                Delivery Savings Goal
              </label>
              <p className="patient-verification-info-value">₦400,000</p>
            </div>
          </div>

          <div className="patient-verification-readiness-section">
            <label className="patient-verification-readiness-label">
              Readiness Status
            </label>
            <div className="patient-verification-progress-bar-container">
              <div className="patient-verification-progress-bar"></div>
            </div>
            <p className="patient-verification-progress-text">
              106% of goal achieved
            </p>
          </div>
        </div>
      </div>

      <div className="patient-verification-notifications-section">
        <div className="patient-verification-section-header">
          <h2 className="patient-verification-section-title">Notifications</h2>
          <p className="patient-verification-section-subtitle">
            Recent activity updates
          </p>
        </div>

        <div className="patient-verification-notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`patient-verification-notification-item patient-verification-notification-${notification.type}`}
            >
              <div
                className={`patient-verification-notification-icon patient-verification-icon-${notification.type}`}
              >
                {notification.icon}
              </div>
              <div className="patient-verification-notification-content">
                <p className="patient-verification-notification-title">
                  {notification.title}
                </p>
                <p className="patient-verification-notification-time">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="patient-verification-view-all-button">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default PatientVerification;
