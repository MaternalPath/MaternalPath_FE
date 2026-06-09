import React from "react";
import { FiShield, FiLock, FiCheck, FiHeart } from "react-icons/fi";
import "../AddFundCom/Css/PaymentSecurityCard.css";

const PaymentSecurityCard = () => {
  const items = [
    { icon: <FiCheck />, text: "Secure payment encryption" },
    { icon: <FiLock />, text: "Protected wallet transactions" },
    { icon: <FiCheck />, text: "Trusted healthcare savings" },
    { icon: <FiHeart />, text: "Safe KoraPay integration" },
  ];

  return (
    <div className="security-card">
      <h3><FiShield /> Payment Security</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>
            {item.icon} {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentSecurityCard;
