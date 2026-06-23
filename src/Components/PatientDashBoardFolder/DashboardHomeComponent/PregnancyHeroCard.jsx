import React from "react";
import "./Css/PregnancyHeroCard.css";
import Baby from "../../../assets/baby.png";

const TRIMESTER_NAMES = {
  1: "First Trimester",
  2: "Second Trimester",
  3: "Third Trimester",
};

const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

const PregnancyHeroCard = ({ dashboardData }) => {
  const trimesterName =
    TRIMESTER_NAMES[Number(dashboardData?.trimester)] ?? "—";
  const progressValue = parseFloat(dashboardData?.pregnancyProgress) || 0;

  return (
    <div className="card card-hero">
      <div className="hero-content">
        <div className="hero-left">
          <h2>
            Week {dashboardData?.week ?? "—"}{" "}
            <span className="trimester">{trimesterName}</span>
          </h2>
      

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Estimated Due Date</div>
              <div className="stat-value">
                {formatDate(dashboardData?.estimatedDueDate)}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Days Until Due Date</div>
              <div className="stat-value">
                {dashboardData?.daysUntilDueDate ?? "—"} days
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Preferred Hospital</div>
              <div className="stat-value">
                {dashboardData?.preferredHospital ?? "—"}
              </div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-label">Pregnancy Progress</div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
            <div className="progress-range">
              <span>Week {dashboardData?.week ?? 1}</span>
              <span>{progressValue}%</span>
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
