import React, { useEffect, useState } from "react";
import { FiActivity, FiHeart, FiChevronRight } from "react-icons/fi";
import "./Css/PregnancyOverview.css";
import babyIllustration from "../../../assets/baby.png";
import { getTrimesterInformation } from "../../../api/mothers";

const defaultSymptoms = [
  "Mild back discomfort",
  "Increased energy levels",
  "Occasional leg cramps",
  "Improved sleep quality"
];

const defaultNutrition = [
  "Iron-rich foods: Spinach, beans, lean meat",
  "Calcium sources: Milk, yogurt, cheese",
  "Whole grains: Brown rice, oats, millet",
  "Hydrate with 8-10 glasses of water daily"
];

const defaultMobileSymptoms = [
  "Increased energy levels typical for second trimester",
  "Mild backaches as baby grows",
  "Baby movements becoming more noticeable",
  "Skin may develop pregnancy glow"
];

const PregnancyOverview = () => {
  const [trimesterInfo, setTrimesterInfo] = useState(null);
  const [trimesterLoading, setTrimesterLoading] = useState(false);
  const [trimesterError, setTrimesterError] = useState("");

  const trimesterLabel =
    typeof trimesterInfo?.trimester === "number"
      ? `Trimester ${trimesterInfo.trimester}`
      : trimesterInfo?.trimesterName ||
        trimesterInfo?.trimester ||
        trimesterInfo?.currentTrimester ||
        "Second Trimester";

  const data = {
    week:
      trimesterInfo?.week ||
      trimesterInfo?.currentPregnancyWeek ||
      trimesterInfo?.pregnancyWeek ||
      24,
    trimester: trimesterLabel,
    dueDate:
      trimesterInfo?.dueDate ||
      trimesterInfo?.estimatedDueDate ||
      trimesterInfo?.expectedDeliveryDate ||
      "September 18, 2026",
    daysRemaining:
      trimesterInfo?.daysRemaining ||
      trimesterInfo?.days_until_due ||
      trimesterInfo?.daysUntilDue ||
      128,
    babySize:
      trimesterInfo?.babySize ||
      trimesterInfo?.baby_size ||
      trimesterInfo?.growthComparison ||
      "Size of a cantaloupe",
    progress:
      trimesterInfo?.progress ||
      trimesterInfo?.pregnancyProgress ||
      trimesterInfo?.completion ||
      60,
    totalWeeks:
      trimesterInfo?.totalWeeks ||
      trimesterInfo?.total_weeks ||
      trimesterInfo?.pregnancyDurationWeeks ||
      40
  };

  const symptoms =
    trimesterInfo?.symptoms ||
    trimesterInfo?.whatToExpect ||
    trimesterInfo?.weekHighlights ||
    defaultSymptoms;
  const nutrition =
    trimesterInfo?.nutrition ||
    trimesterInfo?.nutritionGuidance ||
    trimesterInfo?.nutritionTips ||
    defaultNutrition;
  const mobileSymptoms =
    trimesterInfo?.mobileSymptoms ||
    trimesterInfo?.mobileTips ||
    trimesterInfo?.weekMobileHighlights ||
    defaultMobileSymptoms;

  useEffect(() => {
    const loadTrimesterInfo = async () => {
      setTrimesterLoading(true);
      setTrimesterError("");

      try {
        const info = await getTrimesterInformation();
        setTrimesterInfo(info);
      } catch (error) {
        setTrimesterError(
          error?.response?.data?.message ||
          error?.message ||
          "Unable to load trimester information."
        );
      } finally {
        setTrimesterLoading(false);
      }
    };

    loadTrimesterInfo();
  }, []);


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
            <p className="week-desc mobile-only">{data.progress}% complete • {data.totalWeeks} weeks total</p>

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
                <div className="progress-fill" style={{ width: `${data.progress}%` }} />
              </div>
              <div className="progress-markers desktop-only">
                <span>Week 1</span>
                <span>Week {data.totalWeeks}</span>
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

      {trimesterLoading && (
        <div className="trimester-loading">Loading trimester information...</div>
      )}
      {trimesterError && (
        <div className="trimester-error">{trimesterError}</div>
      )}

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
