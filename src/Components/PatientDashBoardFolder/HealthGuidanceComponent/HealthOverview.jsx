import React from "react";
import { FiHeart } from "react-icons/fi";
import "./Css/HealthOverview.css";
import babyIllustration from "../../../assets/baby.png";

const HealthOverview = ({ data }) => {
  const week = data?.wellness?.week ?? "—";
  const trimester = data?.trimesterGuide?.trimester || "—";
  const focus = data?.focus || "—";
  const healthStatus = data?.healthStatus || "—";
  const wellnessStatus =
    data?.wellnessStatus ||
    data?.status ||
    "You and your baby are doing well. Continue following your personalized care plan.";
  return (
    <section className="week-overview-card">
      <div className="overview-grid">
        <div className="overview-left">
          <div className="week-header">
            <h2>Week {data.metrix.week}</h2>
            <span className="trimester">{data.metrix.trimester}</span>
          </div>
          <div className="wellness-status">
            <div className="status-title">
              <FiHeart />
              <span>Wellness Status</span>
            </div>
            <p>{data?.wellnessStatus}</p>
          </div>

          <div className="focus-row">
            <div className="focus-card">
              <span className="label">This Week's Focus</span>
              <span className="value">{data.focus}</span>
            </div>
            <div className="focus-card">
              <span className="label">Health Status</span>
              <span className="value">{data.healthStatus}</span>
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