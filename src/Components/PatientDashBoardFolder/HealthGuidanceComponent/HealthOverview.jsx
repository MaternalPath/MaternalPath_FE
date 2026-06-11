import React from "react";
import { FiHeart } from "react-icons/fi";
import "./Css/HealthOverview.css";
import babyIllustration from "../../../assets/baby.png";

const HealthOverview = () => {
  return (
    <section className="week-overview-card">
      <div className="overview-grid">
        <div className="overview-left">
          <div className="week-header">
            <h2>Week 24</h2>
            <span className="trimester">Second Trimester</span>
          </div>
          <p className="week-desc">Focus on iron-rich nutrition and proper hydration this week.</p>

          <div className="wellness-status">
            <div className="status-title">
              <FiHeart />
              <span>Wellness Status</span>
            </div>
            <p>You and your baby are doing well. Continue following your personalized care plan.</p>
          </div>

          <div className="focus-row">
            <div className="focus-card">
              <span className="label">This Week's Focus</span>
              <span className="value">Nutrition & Hydration</span>
            </div>
            <div className="focus-card">
              <span className="label">Health Status</span>
              <span className="value">Healthy Progress</span>
            </div>
          </div>
        </div>

        <div className="overview-illustration">
          <img src={babyIllustration} alt="Baby illustration" />
        </div>
      </div>
    </section>
  );
};

export default HealthOverview;
