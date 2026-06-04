import React from "react";
import "./Css/PregnancyHeroCard.css";
import Baby from "../../assets/baby.png";

const PregnancyHeroCard = ({ data }) => {
  return (
    <div className="card card-hero">
      <div className="hero-content">
        <div className="hero-left">
          <h2>
            Week {data.week} <span className="trimester">{data.trimester}</span>
          </h2>
          <p className="subtitle">
            Your baby is growing beautifully this week.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Estimated Due Date</div>
              <div className="stat-value">{data.dueDate}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Days Until Due Date</div>
              <div className="stat-value">{data.daysUntilDue} days</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Preferred Hospital</div>
              <div className="stat-value">{data.hospital}</div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">Pregnancy Progress</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${data.pregnancyProgress}%` }}
              ></div>
            </div>
            <div className="progress-range">
              <span>Week 1</span>
              <span>Week 40</span>
            </div>
          </div>
        </div>

        <aside className="hero-right">
          <img src={Baby} alt="Baby illustration" className="baby-img" />
        </aside>
      </div>
    </div>
  );
};

export default PregnancyHeroCard;
