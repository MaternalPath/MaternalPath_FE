import React from "react";
import { FaWallet } from "react-icons/fa";
import "../AddFundCom/Css/WalletBalanceCard.css";

const WalletBalanceCard = ({ walletData }) => {
  const { currentBalance, savingsGoal } = walletData;
  const progressPercent = Math.round((currentBalance / savingsGoal) * 100);
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;

  return (
    <div className="wallet-balance-card">
      <p className="label">Current Wallet Balance</p>
      <div className="balance-row">
        <h2>{formatCurrency(currentBalance)}</h2>
        <div className="wallet-icon">
          <FaWallet />
        </div>
      </div>
      <div className="goal-row">
        <span>Savings Goal</span>
        <span>{progressPercent}% Complete</span>
      </div>
      <div className="goal-stats">
        <span className="goal-amount">{formatCurrency(savingsGoal)}</span>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
