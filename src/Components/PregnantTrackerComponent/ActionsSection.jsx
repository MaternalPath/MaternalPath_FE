import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiChevronRight } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import "./Css/ActionsSection.css";

const ActionsSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="quick-actions-card">
        <h3 className="section-title">Quick Actions</h3>
        <div className="actions-row">
          <button className="action-btn" onClick={() => navigate('/tracker')}>
            <FiHeart className="action-icon" />
            <span>View Pregnancy Tracker</span>
            <FiChevronRight className="chevron" />
          </button>
          <button className="action-btn" onClick={() => navigate('/wallet')}>
            <LuWallet className="action-icon" />
            <span>Add to Emergency Wallet</span>
            <FiChevronRight className="chevron" />
          </button>
        </div>
      </section>

      <section className="wellness-card">
        <div className="wellness-icon">
          <FiHeart />
        </div>
        <h3>You're Doing Wonderfully</h3>
        <p className="wellness-text">
          Every day brings you closer to meeting your little one. Remember to take time for yourself, stay hydrated, and rest when your body needs it. You're not alone on this journey.
        </p>
        <p className="wellness-tip">
          Wellness Tip: Consider gentle prenatal yoga or meditation to reduce stress and connect with your baby.
        </p>
      </section>
    </>
  );
};

export default ActionsSection;
