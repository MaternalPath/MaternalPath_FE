import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Styles/HospitalVerificationHistory.css";

const HospitalVerificationHistory = () => {
  const [verificationData, setVerificationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchVerificationHistories = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setLoading(false);
      setError("Authentication required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${baseURL}/hospital/verification-histories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = response.data?.data || response.data || [];
      setVerificationData(data);
    } catch (err) {
      console.error("Error fetching verification histories:", err);
      const msg =
        err.response?.data?.message || "Failed to load verification history";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationHistories();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "hospital-verification-history-status-approved";
      case "Pending":
        return "hospital-verification-history-status-pending";
      case "Declined":
        return "hospital-verification-history-status-declined";
      default:
        return "";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "—";
    return `₦${Number(amount).toLocaleString()}`;
  };

  return (
    <div className="hospital-verification-history-container">
      <div className="hospital-verification-history-card">
        <div className="hospital-verification-history-header">
          <h2 className="hospital-verification-history-title">
            Verification History
          </h2>
          <p className="hospital-verification-history-subtitle">
            Recent patient fund verification requests
          </p>
        </div>

        <div className="hospital-verification-history-table-wrapper">
          {loading ? (
            <div className="hospital-verification-history-loading">
              Loading verification history...
            </div>
          ) : error ? (
            <div className="hospital-verification-history-error">
              <p>{error}</p>
              <button
                onClick={fetchVerificationHistories}
                className="retry-btn"
              >
                Retry
              </button>
            </div>
          ) : verificationData.length === 0 ? (
            <div className="hospital-verification-history-empty">
              No verification history found.
            </div>
          ) : (
            <table className="hospital-verification-history-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Amount Requested</th>
                  <th>Authorization Status</th>
                  <th>Hospital Status</th>
                </tr>
              </thead>
              <tbody>
                {verificationData.map((record, index) => (
                  <tr key={record.id || index}>
                    <td>{record.patientName || "—"}</td>
                    <td>{formatDate(record.date)}</td>
                    <td>{formatAmount(record.amountRequested)}</td>
                    <td>
                      <span
                        className={`hospital-verification-history-status-badge ${getStatusClass(record.authorizationStatus)}`}
                      >
                        {record.authorizationStatus || "—"}
                      </span>
                    </td>
                    <td>{record.hospitalStatus || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalVerificationHistory;
