import React from "react";
import "./Css/EmergencyWalletCard.css";
import { FiCreditCard, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const formatNaira = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? `₦${num.toLocaleString()}` : "₦0";
};

const EmergencyWalletCard = ({ dashboardData: data }) => {
  const navigate = useNavigate();
  const balance = data?.currentBalance ?? 0;
  const goal = data?.savingsGoal ?? 0;
  const progress = Number(data?.savingsProgress) || 0;

  const goToWallet = () => navigate("/dashboard/emergencyWallet");

  return (
    <div
      className="card card-wallet"
      onClick={goToWallet}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToWallet();
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div className="card-header">
        <div className="card-title">
          <FiCreditCard size={18} />
          Emergency Wallet
        </div>
        <a
          className="card-link"
          onClick={(e) => {
            e.stopPropagation();
            goToWallet();
          }}
          style={{ cursor: "pointer" }}
        >
          View Details <FiChevronRight size={16} />
        </a>
      </div>

      <div className="wallet-stats">
        <div className="stat-item">
          <div className="stat-label">Current Balance</div>
          <div className="stat-value">{formatNaira(balance)}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Savings Goal</div>
          <div className="stat-value">{formatNaira(goal)}</div>
        </div>
      </div>

      <div className="wallet-progress-header">
        <span className="stat-label">Savings Progress</span>
        <span className="percentage">{progress}% Complete</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default EmergencyWalletCard;
