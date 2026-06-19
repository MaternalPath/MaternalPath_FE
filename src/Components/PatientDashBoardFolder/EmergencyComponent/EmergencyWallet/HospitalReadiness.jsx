import React from "react";
import { BsHospital } from "react-icons/bs";
import "./Css/HospitalReadiness.css";

const HospitalReadiness = ({ data }) => {
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;
  const coverage = data.savingsGoal
    ? Math.round((data.currentBalance / data.savingsGoal) * 100)
    : Number(data.savingsProgress) || 0;

  const toTitleCase = (str) =>
    String(str || "")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  const preparednessLabel = toTitleCase(data.preparedness) || "—";
  const preparednessKey = String(data.preparedness || "").toLowerCase();
  const badgeClass = preparednessKey.includes("high")
    ? "high"
    : preparednessKey.includes("moderate")
      ? "moderate"
      : "low";

  return (
    <section className="hospital-readiness-card">
      <div className="card-header">
        <BsHospital />
        <h3>Hospital Readiness</h3>
      </div>

      <div className="readiness-stats">
        <div className="stat-item">
          <span className="stat-label">Preferred Hospital</span>
          <span className="stat-value">{data.preferredHospital || "—"}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Estimated Delivery Cost</span>
          <span className="stat-value">{formatCurrency(data.savingsGoal)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Wallet Coverage</span>
          <span className="stat-value">{coverage}% Covered</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Eligibility Status</span>
          <span className={`status-badge ${badgeClass}`}>{preparednessLabel}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${coverage}%` }} />
      </div>
    </section>
  );
};

export default HospitalReadiness;
