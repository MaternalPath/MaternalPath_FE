import React from "react";
import "./Card.css";
import { FiCreditCard, FiChevronRight } from "react-icons/fi";

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <FiCreditCard size={18} />
          Emergency Wallet
        </div>
        <a className="card-link">
          View Details <FiChevronRight size={16} />
        </a>
      </div>
    </div>
  );
};

export default Card;
