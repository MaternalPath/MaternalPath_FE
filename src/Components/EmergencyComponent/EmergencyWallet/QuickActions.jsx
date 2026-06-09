import React from "react";
import { FiPlus, FiTarget, FiDownload, FiHome } from "react-icons/fi";
import "./Css/QuickActions.css";

const QuickActions = ({ onAddFunds }) => {
  const actions = [
    { icon: <FiPlus />, label: "Add Funds", onClick: onAddFunds },
    { icon: <FiTarget />, label: "Update Savings Goal", onClick: () => {} },
    { icon: <FiDownload />, label: "Download Statement", onClick: () => {} },
    { icon: <FiHome />, label: "View Hospital Readiness", onClick: () => {} },
  ];

  return (
    <section className="quick-actions-card">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, idx) => (
          <button key={idx} className="action-btn" onClick={action.onClick}>
            <div className="action-icon">{action.icon}</div>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
