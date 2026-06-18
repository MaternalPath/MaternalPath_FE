import React from "react";
import "./Css/EmergencyWalletCard.css";
import { FiCreditCard, FiChevronRight } from "react-icons/fi";

const formatNaira = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? `₦${num.toLocaleString()}` : "₦0";
};

const EmergencyWalletCard = ({ data }) => {
  const balance = data?.currentBalance ?? 0;
  const goal = data?.savingsGoal ?? 0;
  const progress = Number(data?.savingsProgress) || 0;

  return (
    <div className="card card-wallet">
      <div className="card-header">
        <div className="card-title">
          <FiCreditCard size={18} />
          Emergency Wallet
        </div>
        <a className="card-link">
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
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EmergencyWalletCard;
