import React from "react";
import "./Css/EmergencyWalletCard.css";
import { FiCreditCard, FiChevronRight } from "react-icons/fi";

const EmergencyWalletCard = () => {
  return (
    <div className="settings-card emergency-wallet-card">
      <div className="card-header">
        <h3 className="card-title">
          <FiCreditCard size={18} /> Emergency Wallet Settings
        </h3>
        <button className="btn-primary">Edit Savings Goal</button>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Savings Goal Amount</div>
          <div className="info-value">₦400,000</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Balance</div>
          <div className="info-value">₦285,000</div>
        </div>
        <div className="info-item">
          <div className="info-label">Weekly Contribution</div>
          <div className="info-value">₦10,000</div>
        </div>
        <div className="info-item">
          <div className="info-label">Linked Payment Method</div>
          <div className="info-value">Bank Account - GTBank ***4567</div>
        </div>
      </div>

      <button className="btn-link">
        <FiCreditCard size={16} /> Manage Payment Methods <FiChevronRight size={16} />
      </button>

      <div className="info-list-mobile">
        <h3 className="card-title-mobile">Emergency Wallet Settings</h3>
        <div className="info-item">
          <div className="info-label">Savings Goal</div>
          <div className="info-value">₦400,000</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Balance</div>
          <div className="info-value">₦285,000</div>
        </div>
        <div className="info-item">
          <div className="info-label">Weekly Contribution</div>
          <div className="info-value">₦7,500</div>
        </div>
        <div className="info-item">
          <div className="info-label">Linked Payment Method</div>
          <div className="info-value">•••• •••• •••• 7843</div>
        </div>
        <button className="btn-primary-full">Edit Savings Goal</button>
        <button className="btn-link-mobile">
          Manage Payment Methods <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EmergencyWalletCard;