import React from "react";
import { FiHeart, FiCreditCard, FiChevronRight } from "react-icons/fi";
import "./Css/QuickActions.css";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      icon: <FiHeart size={18} />,
      title: "View Pregnancy Tracker",
      path: "/dashboard/pregnancyTracker",
    },
    {
      icon: <FiCreditCard size={18} />,
      title: "Add to Emergency Wallet",
      path: "/dashboard/emergencyWallet",
    },
  ];

  return (
    <div className="card-quick">
      <h3 className="section-title-quick">Quick Actions</h3>
      <div className="grid-2">
        {actions.map((action, idx) => (
          <Link to={action.path} key={idx} style={{textDecoration:"none"}}>
            <button className="action-btn">
              {action.icon}
              <span>{action.title}</span>
              <FiChevronRight size={18} />
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
