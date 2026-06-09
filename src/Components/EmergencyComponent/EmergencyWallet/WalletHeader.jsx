import React from "react";
import { FiPlus } from "react-icons/fi";
import "./Css/WalletHeader.css";

const WalletHeader = ({ onAddFunds }) => {
  return (
    <header className="wallet-header">
      <div className="header-left">
        <h1>Emergency Wallet</h1>
        <p>Track your delivery savings and stay financially prepared.</p>
      </div>
      <button className="add-funds-btn" onClick={onAddFunds}>
        <FiPlus /> Add Funds
      </button>
    </header>
  );
};

export default WalletHeader;
