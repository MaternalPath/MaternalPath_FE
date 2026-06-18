import React from "react";
import { FiActivity, FiHeart, FiChevronRight } from "react-icons/fi";
import "./Css/PregnancyOverview.css";
import babyIllustration from "../../../assets/baby.png";

const TRIMESTER_NAMES = {
  1: "First Trimester",
  2: "Second Trimester",
  3: "Third Trimester",
};

const TOTAL_WEEKS = 40;

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

const DEFAULT_SYMPTOMS = [
  "Mild back discomfort",
  "Increased energy levels",
  "Occasional leg cramps",
  "Improved sleep quality",
];

const DEFAULT_NUTRITION = [
  "Iron-rich foods: Spinach, beans, lean meat",
  "Calcium sources: Milk, yogurt, cheese",
  "Whole grains: Brown rice, oats, millet",
  "Hydrate with 8-10 glasses of water daily",
];

const DEFAULT_MOBILE_SYMPTOMS = [
  "Increased energy levels typical for second trimester",
  "Mild backaches as baby grows",
  "Baby movements becoming more noticeable",
  "Skin may develop pregnancy glow",
];

const PregnancyOverview = ({ overview }) => {
  const info = overview?.info ?? {};
  const week = info.week ?? 24;
  const progressValue = parseFloat(info.pregnancyProgress);
  const progress = Number.isFinite(progressValue)
    ? progressValue
    : Math.min(100, Math.round((week / TOTAL_WEEKS) * 100));

  const data = {
    week,
    totalWeeks: TOTAL_WEEKS,
    progress,
    trimester: TRIMESTER_NAMES[Number(info.trimester)] ?? "—",
    dueDate: formatDate(info.estimatedDueDate) || "—",
    daysRemaining: info.daysUntilDueDate ?? "—",
    babySize: info.babySize ?? "Size of a cantaloupe",
    preferredHospital: info.preferredHospital ?? "—",
  };

  const symptoms = info.symptoms ?? DEFAULT_SYMPTOMS;
  const nutrition = info.nutrition ?? DEFAULT_NUTRITION;
  const mobileSymptoms = info.mobileSymptoms ?? DEFAULT_MOBILE_SYMPTOMS;

  return (
    <>
      <section className="overview-card">
        <div className="overview-content">
          <div className="overview-info">
            <div className="week-title">
              <h2>Week {data.week}</h2>
              <span className="trimester">{data.trimester}</span>
            </div>
            <p className="week-desc desktop-only"></p>
            <p className="week-desc mobile-only">
              {data.progress}% complete • {data.totalWeeks} weeks total
            </p>

            <div className="stats-grid desktop-only">
              <div className="stat">
                <span className="label">Estimated Due Date</span>
                <span className="value">{data.dueDate}</span>
              </div>
              <div className="stat">
                <span className="label">Days Until Due Date</span>
                <span className="value">{data.daysRemaining} days</span>
              </div>
              <div className="stat">
                <span className="label">Baby Size Comparison</span>
                <span className="value">{data.babySize}</span>
              </div>
              <div className="stat">
                <span className="label">Pregnancy Progress</span>
                <span className="value">{data.progress}% Complete</span>
              </div>
            </div>

            <div className="progress-section">
              <span className="progress-label desktop-only">Journey Timeline</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${data.progress}%` }}
                />
              </div>
              <div className="progress-markers desktop-only">
                <span>Week {data.week}</span>
                <span>{data.progress}%</span>
              </div>
            </div>

            <div className="mobile-stats mobile-only">
              <div className="mobile-stat">
                <span className="label">Estimated Due Date</span>
                <span className="value">{data.dueDate}</span>
              </div>
              <div className="mobile-stat">
                <span className="label">Days Remaining</span>
                <span className="value">{data.daysRemaining} days</span>
              </div>
            </div>
          </div>

          <div className="overview-illustration desktop-only">
            <img src={babyIllustration} alt="Baby" />
          </div>
        </div>
      </section>

      <div className="info-cards-row desktop-only">
        <div className="info-card">
          <div className="card-header">
            <FiActivity className="card-icon" />
            <h3>What to Expect This Week</h3>
          </div>
          <p className="card-sub">Common symptoms and body changes</p>
          <ul className="card-list">
            {symptoms.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className="info-card">
          <div className="card-header">
            <span className="card-icon">🍎</span>
            <h3>Nutrition Guidance</h3>
          </div>
          <p className="card-sub">Recommended foods and hydration</p>
          <ul className="card-list">
            {nutrition.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>

      <section className="mobile-section mobile-only">
        <h3 className="section-title">What to Expect This Week</h3>
        <div className="carousel-container">
          <div className="carousel-card">
            <div className="carousel-header">
              <div className="carousel-icon">
                <FiHeart />
              </div>
              <h4>Physical Changes</h4>
            </div>
            <ul className="carousel-list">
              {mobileSymptoms.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <button className="carousel-arrow">
            <FiChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
    </>
  );
};

export default PregnancyOverview;
