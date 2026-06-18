import React from "react";
import "./Css/EmergencyWalletCard.css";
import { FiCreditCard, FiChevronRight, FiEdit2 } from "react-icons/fi";

const EmergencyWalletCard = ({ data = {}, onEditClick }) => {
  return (
    <div className="settings-card emergency-wallet-card">
      <div className="card-header">
        <h3 className="card-title">
          <FiCreditCard size={18} /> Emergency Wallet Settings
        </h3>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Savings Goal Amount</div>
          <div className="info-value">₦{data?.savingsGoalAmount || "Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Balance</div>
          <div className="info-value">₦{data?.currentBalance || "Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Weekly Contribution</div>
          <div className="info-value">₦{data?.weeklyContribution || "Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Linked Payment Method</div>
          <div className="info-value">{data?.linkedPaymentMethod || "Bank Account - GTBank ***4567"}</div>
        </div>
      </div>

      <button type="button" className="btn-link">
        <FiCreditCard size={16} /> Manage Payment Methods <FiChevronRight size={16} />
      </button>

      <div className="info-list-mobile">
        <h3 className="card-title-mobile">Emergency Wallet Settings</h3>
        <div className="info-item">
          <div className="info-label">Savings Goal</div>
          <div className="info-value">₦{data?.savingsGoalAmount ||"Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Balance</div>
          <div className="info-value">₦{data?.currentBalance || "Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Weekly Contribution</div>
          <div className="info-value">₦{data?.weeklyContribution ||"Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Linked Payment Method</div>
          <div className="info-value">{data?.linkedPaymentMethod || "•••• •••• •••• 7843"}</div>
        </div>
        <button type="button" className="btn-primary-full" onClick={onEditClick}>
          <FiEdit2 size={14} /> Edit Savings Goal
        </button>
        <button type="button" className="btn-link-mobile">
          Manage Payment Methods <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EmergencyWalletCard;
