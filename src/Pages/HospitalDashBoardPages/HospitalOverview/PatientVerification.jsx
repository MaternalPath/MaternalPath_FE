import React, { useState } from "react";
import "./Styles/PatientVerification.css";
import { FiSearch } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientVerification = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [patientData, setPatientData] = useState({
    patientName: "",
    patientId: "",
    pregnancyStage: "",
    walletBalance: 0,
    deliverySavingsGoal: 0,
    preferredHospital: "",
    readinessPercentage: 0,
    status: "",
  });

  const resetPatientData = () => {
    setPatientData({
      patientName: "",
      patientId: "",
      pregnancyStage: "",
      walletBalance: 0,
      deliverySavingsGoal: 0,
      preferredHospital: "",
      readinessPercentage: 0,
      status: "",
    });
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      toast.error("Please enter a Patient ID or Phone Number.");
      return;
    }

    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.get(`${baseURL}/hospital/search-patient`, {
        params: {
          search: searchInput.trim(),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatientData(data);

      toast.success("Patient found successfully.");
    } catch (error) {
      resetPatientData();

      toast.error(
        error.response?.data?.message ||
          "No patient found with the provided details.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
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
    <>
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              className="patient-verification-search-button"
              onClick={handleSearch}
              disabled={loading}
            >
              <FiSearch />
              {loading ? "Searching..." : "Search Patient"}
            </button>
          </div>

          <div className="patient-verification-patient-card">
            <div className="patient-verification-patient-header">
              <div>
                <h3 className="patient-verification-patient-name">
                  {patientData.patientName || "No Patient Selected"}
                </h3>
                <p className="patient-verification-patient-id">
                  Patient ID: {patientData.patientId || "--"}
                </p>
              </div>

              <div className="patient-verification-eligibility-badge">
                {patientData.status || "N/A"}
              </div>
            </div>

            <div className="patient-verification-patient-info-grid">
              <div className="patient-verification-info-item">
                <label>Pregnancy Stage</label>
                <p>{patientData.pregnancyStage || "--"}</p>
              </div>

              <div className="patient-verification-info-item">
                <label>Preferred Hospital</label>
                <p>{patientData.preferredHospital || "--"}</p>
              </div>
            </div>

            <div className="patient-verification-patient-info-grid">
              <div className="patient-verification-info-item">
                <label>Wallet Balance</label>
                <p>₦{patientData.walletBalance.toLocaleString()}</p>
              </div>

              <div className="patient-verification-info-item">
                <label>Delivery Savings Goal</label>
                <p>₦{patientData.deliverySavingsGoal.toLocaleString()}</p>
              </div>
            </div>

            <div className="patient-verification-readiness-section">
              <label>Readiness Status</label>

              <div className="patient-verification-progress-bar-container">
                <div
                  className="patient-verification-progress-bar"
                  style={{
                    width: `${patientData.readinessPercentage}%`,
                  }}
                />
              </div>

              <p>{patientData.readinessPercentage}% of goal achieved</p>
            </div>
          </div>
        </div>

        <div className="patient-verification-notifications-section">
          <h2>Notifications</h2>

          <div className="patient-verification-notifications-list">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`patient-verification-notification-item`}
              >
                <div>{n.icon}</div>
                <div>
                  <p>{n.title}</p>
                  <small>{n.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
};

export default PatientVerification;