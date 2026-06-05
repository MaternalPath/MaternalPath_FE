import React from 'react';
import { FiHeart, FiCreditCard, FiChevronRight } from 'react-icons/fi';
import './Css/QuickActions.css';

const QuickActions = () => {
  const actions = [
    { icon: <FiHeart size={18} />, title: 'View Pregnancy Tracker' },
    { icon: <FiCreditCard size={18} />, title: 'Add to Emergency Wallet' }
  ];

  return (
    <div className="cardQuick">
      <h3 className="section-title">Quick Actions</h3>
      <div className="grid-2">
        {actions.map((action, idx) => (
          <button key={idx} className="action-btn">
            {action.icon}
            <span>{action.title}</span>
            <FiChevronRight size={18} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;