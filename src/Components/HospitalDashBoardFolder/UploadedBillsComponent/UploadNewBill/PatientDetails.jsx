import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Styles/PatientDetails.css";

export default function PatientDetails() {
  const navigate = useNavigate();
  const { patientId: motherId } = useParams(); // 👈 reads :patientId from the URL, stores as motherId

  const [patient, setPatient] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchPatientDetails = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setLoading(false);
      setError("Authentication required");
      return;
    }

    if (!motherId) {
      setError("No patient selected");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [patientRes, dashboardRes] = await Promise.all([
        axios.get(`${baseURL}/patients/${motherId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${baseURL}/patient/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { motherId },
        }),
      ]);

      const patientData = patientRes.data?.data || patientRes.data || null;
      const dashboardData =
        dashboardRes.data?.data || dashboardRes.data || null;

      setPatient(patientData);
      setDashboard(dashboardData);
    } catch (err) {
      console.error("Error fetching patient details:", err);
      const msg =
        err.response?.data?.message || "Failed to load patient details";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [motherId]);

  const handleClose = () => navigate("/dashboard/verifyPatient");
  const handleUploadBill = () => {
    navigate(`/dashboard/uploadNewBill?motherId=${motherId}`);
  };

  if (loading) {
    return (
      <div className="patient-details-overlay">
        <div className="patient-details-modal">
          <div style={{ padding: "60px", textAlign: "center" }}>
            Loading patient details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-details-overlay">
        <div className="patient-details-modal">
          <div
            style={{ padding: "60px", textAlign: "center", color: "#dc2626" }}
          >
            <p>{error}</p>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fullName = patient?.fullName || "—";
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const patientId = patient?.maternalId || "—";
  const phone = patient?.phoneNumber || "—";
  const email = patient?.email || "—";
  const pregnancyWeek = patient?.pregnancyWeek
    ? `Week ${patient.pregnancyWeek}`
    : dashboard?.pregnancy?.currentWeek
      ? `Week ${dashboard.pregnancy.currentWeek}`
      : "—";
  const dueDate =
    patient?.expectedDeliveryDate ||
    dashboard?.pregnancy?.expectedDelivery ||
    "—";
  const hospital =
    patient?.preferredHospital ||
    dashboard?.pregnancy?.preferredHospital ||
    "—";

  const status = dashboard?.pregnancy?.lastVerification?.status || "Pending";
  const lastVerification = dashboard?.pregnancy?.lastVerification?.verifiedAt
    ? new Date(
        dashboard.pregnancy.lastVerification.verifiedAt,
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "—";

  const savingsGoal = dashboard?.wallet?.savingsGoal || 0;
  const currentSavings = dashboard?.wallet?.currentSavings || 0;
  const remaining =
    dashboard?.wallet?.remainingAmount ??
    Math.max(savingsGoal - currentSavings, 0);
  const progress = dashboard?.wallet?.savingsProgress
    ? parseFloat(dashboard.wallet.savingsProgress)
    : savingsGoal
      ? Math.min(Math.round((currentSavings / savingsGoal) * 100), 100)
      : 0;

  const bills = dashboard?.recentBills || [];

  return (
    <div className="patient-details-overlay">
      <div className="patient-details-modal">
        <div className="patient-details-header">
          <div>
            <h1 className="patient-details-title">Patient Details</h1>
            <p className="patient-details-subtitle">
              Review patient information before uploading a new bill.
            </p>
          </div>
          <button className="patient-details-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="patient-details-content">
          <div className="patient-details-grid">
            <div className="patient-info-card">
              <div className="patient-header-row">
                <div className="patient-avatar">{initials}</div>
                <div>
                  <h2 className="patient-name">{fullName}</h2>
                  <p className="patient-id">ID: {patientId}</p>
                </div>
              </div>

              <div className="patient-details-list">
                <div className="detail-row">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-value">{phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pregnancy Week</span>
                  <span className="detail-value">{pregnancyWeek}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Expected Delivery Date</span>
                  <span className="detail-value">{dueDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Preferred Hospital</span>
                  <span className="detail-value">{hospital}</span>
                </div>
              </div>
            </div>

            <div className="wallet-summary-card">
              <div className="wallet-header">
                <h3 className="wallet-title">Wallet Summary</h3>
                <span className={`wallet-badge ${status?.toLowerCase()}`}>
                  {status}
                </span>
              </div>

              <div className="wallet-items">
                <div className="wallet-item">
                  <span className="wallet-label">Savings Goal</span>
                  <span className="wallet-amount">
                    ₦{savingsGoal.toLocaleString()}
                  </span>
                </div>
                <div className="wallet-item">
                  <span className="wallet-label">Current Savings</span>
                  <span className="wallet-amount">
                    ₦{currentSavings.toLocaleString()}
                  </span>
                </div>
                <div className="wallet-item">
                  <span className="wallet-label">Remaining Amount</span>
                  <span className="wallet-amount">
                    ₦{remaining.toLocaleString()}
                  </span>
                </div>
                <div className="wallet-progress">
                  <div className="progress-label-row">
                    <span className="wallet-label">Savings Progress</span>
                    <span className="progress-percentage">{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pregnancy-summary-section">
            <h3 className="section-title">Pregnancy Summary</h3>
            <div className="pregnancy-summary-grid">
              <div className="summary-card">
                <p className="summary-label">CURRENT WEEK</p>
                <p className="summary-value">{pregnancyWeek}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">EXPECTED DELIVERY</p>
                <p className="summary-value">{dueDate}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">ASSIGNED HOSPITAL</p>
                <p className="summary-value">{hospital}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">LAST VERIFICATION</p>
                <p className="summary-value">{lastVerification}</p>
              </div>
            </div>
          </div>

          <div className="recent-bills-section">
            <h3 className="section-title">Recent Bills</h3>
            <table className="bills-table">
              <thead>
                <tr>
                  <th>BILL TYPE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {bills && bills.length > 0 ? (
                  bills.map((bill, idx) => (
                    <tr key={idx}>
                      <td>
                        {bill.category || bill.type || bill.billType || "—"}
                      </td>
                      <td>
                        {bill.amount
                          ? `₦${Number(bill.amount).toLocaleString()}`
                          : "—"}
                      </td>
                      <td>
                        <span
                          className={`status-badge ${(bill.status || "").toLowerCase()}`}
                        >
                          {bill.status || "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        color: "#9ca3af",
                        textAlign: "center",
                        padding: "16px",
                      }}
                    >
                      No bills found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="patient-details-footer">
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleUploadBill}>
            ⬆ Upload New Bill
          </button>
        </div>
      </div>
    </div>
  );
}
