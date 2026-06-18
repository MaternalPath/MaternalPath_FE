import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Styles/PatientDetails.css";

export default function PatientDetails() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchPatientDetails = async () => {
    if (!patientId) {
      setError("No patient ID provided.");
      setLoading(false);
      return;
    }

    if (!token) {
      toast.error("Authentication token not found.");
      setError("Authentication required.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseURL}/hospital/verification-requests/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const raw = response.data?.data || response.data;

      if (!raw || Object.keys(raw).length === 0) {
        setError("No patient data found.");
        setLoading(false);
        return;
      }

      // Calculate financial values
      const savingsGoal =
        raw.deliverySavingsGoal ||
        raw.delivery_savings_goal ||
        raw.savingsGoal ||
        0;
      const currentSavings =
        raw.walletBalance || raw.wallet_balance || raw.currentSavings || 0;
      const remaining = Math.max(savingsGoal - currentSavings, 0);
      const progress =
        savingsGoal > 0
          ? Math.min(Math.round((currentSavings / savingsGoal) * 100), 100)
          : 0;

      // Get full name and initials
      const fullName =
        raw.patientName || raw.patient_name || raw.name || "Unknown Patient";
      const initials = fullName
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      // Map API response to component format
      const mappedPatient = {
        name: fullName,
        initials,
        patientId: raw.patientId || raw.patient_id || raw.id || "—",
        phone: raw.phoneNumber || raw.phone_number || raw.phone || "—",
        email: raw.email || raw.emailAddress || "—",
        pregnancyWeek:
          raw.pregnancyStage || raw.pregnancy_stage || raw.pregnancyWeek || "—",
        dueDate: raw.dueDate || raw.due_date || raw.expectedDueDate || "—",
        hospital:
          raw.preferredHospital ||
          raw.preferred_hospital ||
          raw.hospital ||
          "—",
        status: raw.authorizationStatus || raw.status || "Pending",
        savingsGoal,
        currentSavings,
        remaining,
        progress,
        lastVerification:
          raw.lastVerification || raw.last_verification || raw.updatedAt || "—",
        bills: raw.bills || raw.recentBills || [],
      };

      setPatient(mappedPatient);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to load patient details.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [patientId]);

  const handleClose = () => navigate("/dashboard/verifyPatient");
  const handleUploadBill = () => console.log("Upload new bill");

  // Loading skeleton
  if (loading) {
    return (
      <div className="patient-details-overlay">
        <div className="patient-details-modal">
          <div className="patient-details-header">
            <div>
              <div
                className="skeleton-text"
                style={{ width: "180px", height: "22px" }}
              />
              <div
                className="skeleton-text"
                style={{ width: "260px", height: "14px", marginTop: "8px" }}
              />
            </div>
            <button className="patient-details-close" onClick={handleClose}>
              ✕
            </button>
          </div>
          <div className="patient-details-content">
            <div className="patient-details-grid">
              <div className="patient-info-card">
                <div className="patient-header-row">
                  <div
                    className="skeleton-avatar"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <div
                      className="skeleton-text"
                      style={{ width: "140px", height: "18px" }}
                    />
                    <div
                      className="skeleton-text"
                      style={{
                        width: "100px",
                        height: "13px",
                        marginTop: "4px",
                      }}
                    />
                  </div>
                </div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div className="detail-row" key={i}>
                    <div
                      className="skeleton-text"
                      style={{ width: "120px", height: "13px" }}
                    />
                    <div
                      className="skeleton-text"
                      style={{ width: "160px", height: "13px" }}
                    />
                  </div>
                ))}
              </div>
              <div className="wallet-summary-card">
                <div
                  className="skeleton-text"
                  style={{ width: "120px", height: "18px" }}
                />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div className="wallet-item" key={i}>
                    <div
                      className="skeleton-text"
                      style={{ width: "100px", height: "13px" }}
                    />
                    <div
                      className="skeleton-text"
                      style={{ width: "80px", height: "13px" }}
                    />
                  </div>
                ))}
                <div
                  className="skeleton-text"
                  style={{ width: "100%", height: "8px", marginTop: "12px" }}
                />
              </div>
            </div>
            <div className="pregnancy-summary-section">
              <div
                className="skeleton-text"
                style={{ width: "160px", height: "18px" }}
              />
              <div className="pregnancy-summary-grid">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="summary-card" key={i}>
                    <div
                      className="skeleton-text"
                      style={{ width: "80px", height: "11px" }}
                    />
                    <div
                      className="skeleton-text"
                      style={{
                        width: "120px",
                        height: "16px",
                        marginTop: "4px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="patient-details-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button className="btn btn-primary" disabled>
              ⬆ Upload New Bill
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
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
            <div className="error-state">
              <p>{error}</p>
              <button onClick={fetchPatientDetails} className="retry-btn">
                Retry
              </button>
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

  if (!patient) {
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
            <div className="not-found-state">
              <p>Patient not found</p>
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

  const p = patient;
  const savingsGoal = p.savingsGoal || 0;
  const currentSavings = p.currentSavings || 0;
  const remaining = p.remaining ?? Math.max(savingsGoal - currentSavings, 0);
  const progress =
    p.progress ??
    Math.min(Math.round((currentSavings / savingsGoal) * 100), 100);

  return (
    <div className="patient-details-overlay">
      <div className="patient-details-modal">
        {/* Header */}
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

        {/* Main Content */}
        <div className="patient-details-content">
          {/* Two Column Section */}
          <div className="patient-details-grid">
            {/* Patient Info Card */}
            <div className="patient-info-card">
              <div className="patient-header-row">
                <div className="patient-avatar">{p.initials}</div>
                <div>
                  <h2 className="patient-name">{p.name}</h2>
                  <p className="patient-id">ID: {p.patientId}</p>
                </div>
              </div>

              <div className="patient-details-list">
                <div className="detail-row">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-value">{p.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{p.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pregnancy Week</span>
                  <span className="detail-value">{p.pregnancyWeek}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Expected Delivery Date</span>
                  <span className="detail-value">{p.dueDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Preferred Hospital</span>
                  <span className="detail-value">{p.hospital}</span>
                </div>
              </div>
            </div>

            {/* Wallet Summary Card */}
            <div className="wallet-summary-card">
              <div className="wallet-header">
                <h3 className="wallet-title">Wallet Summary</h3>
                <span className={`wallet-badge ${p.status?.toLowerCase()}`}>
                  {p.status}
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

          {/* Pregnancy Summary Section */}
          <div className="pregnancy-summary-section">
            <h3 className="section-title">Pregnancy Summary</h3>
            <div className="pregnancy-summary-grid">
              <div className="summary-card">
                <p className="summary-label">CURRENT WEEK</p>
                <p className="summary-value">{p.pregnancyWeek}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">EXPECTED DELIVERY</p>
                <p className="summary-value">{p.dueDate}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">ASSIGNED HOSPITAL</p>
                <p className="summary-value">{p.hospital}</p>
              </div>
              <div className="summary-card">
                <p className="summary-label">LAST VERIFICATION</p>
                <p className="summary-value">{p.lastVerification}</p>
              </div>
            </div>
          </div>

          {/* Recent Bills Section */}
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
                {p.bills && p.bills.length > 0 ? (
                  p.bills.map((bill, idx) => (
                    <tr key={idx}>
                      <td>{bill.type || bill.billType || "—"}</td>
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

        {/* Footer */}
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
