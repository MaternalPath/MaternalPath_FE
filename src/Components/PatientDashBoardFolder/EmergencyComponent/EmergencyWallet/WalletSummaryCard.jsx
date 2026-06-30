import React from "react";
import { FiTarget, FiPlus } from "react-icons/fi";
import "./Css/WalletSummaryCard.css";

const WalletSummaryCard = ({ data, onAddFunds }) => {
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;
  const progressPercent = data.savingsGoal
    ? Math.round((data.currentBalance / data.savingsGoal) * 100)
    : Number(data.savingsProgress) || 0;
  const toTitleCase = (str) =>
    String(str || "")
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");
  const getReadinessStatus = () => {
    if (data.preparedness) return toTitleCase(data.preparedness);
    if (progressPercent >= 80) return "Highly Prepared";
    if (progressPercent >= 50) return "Moderate Preparedness";
    return "Needs Attention";
  };

  return ( 
    <section className="wallets-summary-card">
      <div className="summary-main">
        <div className="balance-section">
          <h2>{formatCurrency(data.currentBalance)}</h2>
          <p className="label">Current Savings Balance</p>
          <p className="subtext">You're making great progress toward your delivery goal.</p>
          
          <div className="stats-grid-wallet">
            <div className="stat-item">
              <span className="stat-label">Delivery Savings Goal</span>
              <span className="stat-value">{formatCurrency(data.savingsGoal)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Remaining Amount Needed</span>
              <span className="stat-value">{formatCurrency(data.remainingAmount)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Estimated Due Date</span>
              <span className="stat-value">{data.estimatedDueDate}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Days Until Due Date</span>
              <span className="stat-value">{data.daysUntilDue} days</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">
              <span>Savings Progress</span>
              <span className="percent">{progressPercent}% Complete</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="progress-markers">
              <span>{data.currentBalance}</span>
              <span>{formatCurrency(data.savingsGoal)}</span>
            </div>
          </div>

          <div className="mobile-only">
            <div className="mobile-stats">
              <div className="mobile-stat">
                <span className="mobile-label">Current Balance</span>
                <span className="mobile-value">{formatCurrency(data.currentBalance)}</span>
              </div>
              <div className="mobile-stat">
                <span className="mobile-label">Savings Goal</span>
                <span className="mobile-value">{formatCurrency(data.savingsGoal)}</span>
              </div>
            </div>
            <button className="add-funds-mobile" onClick={onAddFunds}>
              <FiPlus /> Add Funds
            </button>
            <div className="mobile-footer-stats">
              <div className="footer-stat">
                <span className="label">Remaining</span>
                <span className="value">{formatCurrency(data.remainingAmount)}</span>
              </div>
              <div className="footer-stat">
                <span className="label">Due In</span>
                <span className="value">{data.daysUntilDue} days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="readiness-card">
          <div className="readiness-icon">
            <FiTarget />
          </div>
          <p className="readiness-label">Readiness Status</p>
          <h3>{getReadinessStatus()}</h3>
          <div className="readiness-badge">{progressPercent}% Ready</div>
        </div>
      </div>
    </section>
  );
};

export default WalletSummaryCard;
