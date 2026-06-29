import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { FiFileText, FiUser, FiPhone, FiShield } from "react-icons/fi";
import "./Css/ActionsSection.css";

const ActionsSection = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <FiFileText />,
      label: "Read Full Weekly Guide",
      onClick: () => {},
    },
    { icon: <FiUser />, label: "Update Health Info", onClick: () => {} },
    {
      icon: <FiPhone />,
      label: "Contact Healthcare Professional",
      onClick: () => {},
    },
    {
      icon: <LuWallet />,
      label: "View Emergency Wallet",
      onClick: () => navigate("/wallet"),
    },
  ];

  return (
    <>
      <section className="mobile-section mobile-only">
        <h3 className="mobile-section-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className="quick-action-btn"
              onClick={action.onClick}
            >
              <div className="action-icon-circle">{action.icon}</div>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="wellness-card mobile-only">
        <div className="wellness-icon">
          <FiHeart />
        </div>
        <h3>You're Doing Wonderfully</h3>
        <p className="wellness-text">
          Every day brings you closer to meeting your little one. Remember to
          take time for yourself, stay hydrated, and rest when your body needs
          it. You're not alone on this journey.
        </p>
        <p className="wellness-tip">
          Wellness Tip: Consider gentle prenatal yoga or meditation to reduce
          stress and connect with your baby.
        </p>
      </section>

      {/* Keep desktop version */}
      <section className="wellness-card desktop-only">
        {/*... existing desktop code... */}
      </section>
    </>
  );
};

export default ActionsSection;

