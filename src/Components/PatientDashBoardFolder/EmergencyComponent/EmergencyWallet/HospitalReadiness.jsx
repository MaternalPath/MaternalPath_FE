import React from "react";
import { BsHospital } from "react-icons/bs";
import "./Css/HospitalReadiness.css";

const HospitalReadiness = ({ data }) => {
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;
  const coverage = Math.round((data.currentBalance / data.savingsGoal) * 100);

  return (
    <section className="hospital-readiness-card">
      <div className="card-header">
        <BsHospital />
        <h3>Hospital Readiness</h3>
      </div>
      
      <div className="readiness-stats">
        <div className="stat-item">
          <span className="stat-label">Preferred Hospital</span>
          <span className="stat-value">Lagos General Hospital</span>
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
          <span className="status-badge moderate">Moderate Preparedness</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${coverage}%` }} />
      </div>
    </section>
  );
};

export default HospitalReadiness;
