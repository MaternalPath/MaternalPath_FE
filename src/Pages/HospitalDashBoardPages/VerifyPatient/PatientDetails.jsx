import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Styles/PatientDetails.css";

export default function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const { patientId: motherId } = useParams();
  const selectedPatient = location.state?.patient || null;

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

    const effectiveMotherId = motherId;

    if (!effectiveMotherId) {
      setError("No patient selected");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Normalize selected patient data from navigation state
      const normalizedSelectedPatient = selectedPatient
        ? (() => {
            const mother = selectedPatient.mother || {};
            return {
              fullName:
                selectedPatient.fullName ||
                selectedPatient.patientName ||
                `${mother.firstName || ""} ${mother.lastName || ""}`.trim() ||
                "—",
              maternalId:
                selectedPatient.navId ||
                selectedPatient.id ||
                selectedPatient.maternalId ||
                mother.id ||
                "—",
              phoneNumber:
                selectedPatient.phoneNumber || mother.phoneNumber || "—",
              email: selectedPatient.email || mother.email || "—",
              pregnancyWeek:
                selectedPatient.week || selectedPatient.pregnancyWeek || "—",
              expectedDeliveryDate:
                selectedPatient.dueDate ||
                selectedPatient.expectedDueDate ||
                "—",
              preferredHospital:
                selectedPatient.hospital ||
                selectedPatient.preferredHospital ||
                "—",
              savingsGoal: selectedPatient.savingsGoal || 0,
              walletBalance: selectedPatient.walletBalance || 0,
              status: selectedPatient.status || "Pending",
              verifiedAt: selectedPatient.verifiedAt || null,
              readiness: selectedPatient.readiness || "Not Assessed",
              recentBills: selectedPatient.recentBills || [],
            };
          })()
        : null;

      let patientData = null;

      if (normalizedSelectedPatient) {
        patientData = normalizedSelectedPatient;
        setPatient(normalizedSelectedPatient);
      } else {
        const patientRes = await axios.get(
          `${baseURL}/patients/${effectiveMotherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        console.log("Patient API Response:", patientRes.data);
        patientData = patientRes.data?.data || patientRes.data || {};
        setPatient(patientData);
      }

      // ✅ Build dashboard data from patient data (since hospital users can't access /patient/dashboard)
      const savingsGoal =
        patientData.savingsGoal || patientData.deliverySavingsGoal || 0;
      const currentSavings = patientData.walletBalance || 0;
      const progress =
        savingsGoal > 0
          ? Math.min(Math.round((currentSavings / savingsGoal) * 100), 100)
          : 0;

      const dashboardData = {
        wallet: {
          savingsGoal: savingsGoal,
          currentSavings: currentSavings,
          remainingAmount: Math.max(savingsGoal - currentSavings, 0),
          savingsProgress: `${progress}%`,
        },
        pregnancy: {
          currentWeek: patientData.pregnancyWeek || 0,
          expectedDelivery:
            patientData.expectedDeliveryDate || patientData.dueDate || "—",
          preferredHospital:
            patientData.preferredHospital || patientData.hospital || "—",
          lastVerification: {
            status: patientData.status || "Pending",
            verifiedAt: patientData.verifiedAt || null,
            readiness: patientData.readiness || "Not Assessed",
          },
        },
        recentBills: patientData.recentBills || [],
      };

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
    if (motherId) {
      fetchPatientDetails();
    } else {
      setError("No patient ID provided");
      setLoading(false);
    }
  }, [motherId]);

  const handleClose = () => navigate("/dashboard/verifyPatient");

  const handleUploadBill = () => {
    if (motherId) {
      navigate(`/dashboard/uploadNewBill?motherId=${motherId}`);
    } else {
      toast.error("Patient ID not found. Please try again.");
    }
  };

  // Helper function to format pregnancy week
  const formatPregnancyWeek = (weekValue) => {
    if (!weekValue) return "—";
    const weekStr = weekValue.toString();
    if (weekStr.includes("Week")) return weekStr;
    return `Week ${weekStr}`;
  };

  // Helper function to format date
  const formatDate = (dateValue) => {
    if (!dateValue) return "—";
    try {
      return new Date(dateValue).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateValue;
    }
  };

  if (loading) {
    return (
      <div className="patient-details-overlay">
        <div className="patient-details-modal">
          <div className="patient-details-loading">
            <div className="loading-spinner"></div>
            <p>Loading patient details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-details-overlay">
        <div className="patient-details-modal">
          <div className="patient-details-error">
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

  const pregnancyWeek = formatPregnancyWeek(
    patient?.pregnancyWeek || dashboard?.pregnancy?.currentWeek,
  );

  const dueDate = formatDate(
    patient?.expectedDeliveryDate || dashboard?.pregnancy?.expectedDelivery,
  );

  const hospital =
    patient?.preferredHospital ||
    dashboard?.pregnancy?.preferredHospital ||
    "—";

  // Get last verification data
  const lastVerificationStatus =
    dashboard?.pregnancy?.lastVerification?.status ||
    patient?.status ||
    "Pending";
  const lastVerificationDate =
    dashboard?.pregnancy?.lastVerification?.verifiedAt ||
    patient?.verifiedAt ||
    null;
  const lastVerificationFormatted = lastVerificationDate
    ? formatDate(lastVerificationDate)
    : "—";

  // Get wallet data
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

  // Determine if patient is verified
  const isVerified =
    lastVerificationStatus?.toLowerCase() === "approved" ||
    lastVerificationDate !== null;

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
            {/* Patient Info Card */}
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
                <div
                  className="detail-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 0",
                  }}
                >
                  <span
                    className="detail-label"
                    style={{
                      flexShrink: 0,
                    }}
                  >
                    Email Address
                  </span>
                  <span
                    className="detail-value"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                      minWidth: 0,
                      marginLeft: "10px",
                      textAlign: "left",
                      fontSize: "14px",
                      maxWidth: "200px",
                    }}
                  >
                    {email.length > 20
                      ? `${email.split("@")[0].slice(0, 4)}...@${email.split("@")[1]}`
                      : email}
                  </span>
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

            {/* Wallet Summary Card */}
            <div className="wallet-summary-card">
              <div className="wallet-header">
                <h3 className="wallet-title">Wallet Summary</h3>
                <span
                  className={`wallet-badge ${lastVerificationStatus?.toLowerCase()}`}
                >
                  {lastVerificationStatus}
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
                {isVerified ? (
                  <div>
                    <p className="summary-value">{lastVerificationFormatted}</p>
                    <p className="summary-status approved">
                      {lastVerificationStatus}
                    </p>
                  </div>
                ) : (
                  <p className="summary-value not-verified">—</p>
                )}
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
          <button
            className="btnDetails btnDetails-secondary"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="btnDetails btnDetails-primary"
            onClick={handleUploadBill}
          >
            ⬆ Upload New Bill
          </button>
        </div>
      </div>
    </div>
  );
}
