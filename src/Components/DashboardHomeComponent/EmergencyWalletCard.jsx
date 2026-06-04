import React from "react";
import "./Css/EmergencyWalletCard.css";
import { FiCreditCard, FiChevronRight } from "react-icons/fi";

const EmergencyWalletCard = ({ data }) => {
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
          <div className="stat-value">
            ₦{data.walletBalance.toLocaleString()}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Savings Goal</div>
          <div className="stat-value">₦{data.savingsGoal.toLocaleString()}</div>
        </div>
      </div>

      <div className="wallet-progress-header">
        <span className="stat-label">Savings Progress</span>
        <span className="percentage">{data.savingsProgress}% Complete</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${data.savingsProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EmergencyWalletCard;
