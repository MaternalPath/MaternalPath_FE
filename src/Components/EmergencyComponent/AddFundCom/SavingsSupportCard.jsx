import React from "react";
import { FiHeart } from "react-icons/fi";
import "../AddFundCom/Css/SavingsSupportCard.css";

const SavingsSupportCard = () => {
  return (
    <div className="support-card">
      <div className="support-icon">
        <FiHeart />
      </div>
      <h3>Savings Support</h3>
      <p>
        Consistent savings help reduce emergency delivery stress and ensure you're prepared 
        for your maternal health needs.
      </p>
    </div>
  );
};

export default SavingsSupportCard;
