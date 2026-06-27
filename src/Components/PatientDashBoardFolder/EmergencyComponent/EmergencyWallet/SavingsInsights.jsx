import React, { useState } from "react";
import {
  FiCheck,
  FiTrendingUp,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import "./Css/SavingsInsights.css";

const SavingsInsights = ({ monthlyData, data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;
  const weeklyRec =
    data.weeksRemaining > 0
      ? Math.round(data.remainingAmount / data.weeksRemaining)
      : 0;

  const recommendationText =
    data.weeklyRecommendationText ||
    `Saving ${formatCurrency(weeklyRec)} weekly will help you meet your goal before delivery`;

  const currentContributionLabel =
    Number(data.weeklyContribution) > 0
      ? `${formatCurrency(data.weeklyContribution)} per week`
      : "No active weekly contribution";

  const onTrackText =
    data.onTrackText ||
    "At your current pace, you'll reach 100% of your goal by late August.";

  const insights = [
    {
      type: "recommendation",
      title: "Weekly Contribution Recommended",
      text: recommendationText,
    },
    {
      type: "current",
      label: "Current Weekly Contribution",
      value: currentContributionLabel,
    },
    {
      type: "weeks",
      label: "Weeks Remaining Until Due Date",
      value: `${data.weeksRemaining || 0} weeks`,
    },
    {
      type: "track",
      label: "On Track",
      text: onTrackText,
      negative: /not reach|won['’]t|will not|behind/i.test(onTrackText),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % insights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + insights.length) % insights.length);
  };

  return (
    <div className="savings-insights-wrapper">
      <div className="desktop-view">
        <section className="savings-progress-card">
          <h3>
            <span className="icon">📊</span> Savings Progress
          </h3>
          <div className="months-list">
            {monthlyData.map((item) => (
              <div key={item.month} className={`month-item ${item.status}`}>
                <div className="month-left">
                  <div
                    className={`month-icon ${item.status === "active" ? "active" : ""}`}
                  >
                    {item.status === "done" ? (
                      <FiCheck />
                    ) : item.status === "active" ? (
                      <div className="dot" />
                    ) : null}
                  </div>
                  <div>
                    <span className="month-name">{item.month}</span>
                    {item.isTarget && (
                      <span className="target-label">
                        Target: {formatCurrency(item.amount)}
                      </span>
                    )}
                  </div>
                </div>
                {!item.isTarget && (
                  <span className="month-amount">
                    {formatCurrency(item.amount)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="savings-insights-card">
          <h3>Savings Insights</h3>
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`insight-box ${insight.type} ${insight.negative ? "negative" : ""}`}
            >
              {insight.type === "recommendation" ? (
                <>
                  <div className="insight-icon">
                    <FiTrendingUp />
                  </div>
                  <div className="insight-content">
                    <h4>{insight.title}</h4>
                    <p>{insight.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="insight-label">{insight.label}</p>
                  {insight.value && (
                    <p className="insight-value">{insight.value}</p>
                  )}
                  {insight.text && (
                    <p className="insight-text">{insight.text}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </section>
      </div>

      <div className="mobile-view">
        <section className="savings-progress-card">
          <h3>
            <span className="icon">📊</span> Savings Progress
          </h3>
          <div className="months-grid-mobile">
            {monthlyData.slice(0, 3).map((item) => (
              <div key={item.month} className={`month-card ${item.status}`}>
                <div
                  className={`month-icon ${item.status === "done" ? "done" : ""}`}
                >
                  {item.status === "done" && <FiCheck />}
                </div>
                <span className="month-name">{item.month}</span>
                <span className="month-amount">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="savings-insights-card mobile-carousel">
          <h3>Savings Insights</h3>
          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                touchAction: "pan-y",
              }}
            >
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`insight-slide ${insight.type} ${insight.negative ? "negative" : ""}`}
                >
                  {insight.type === "recommendation" ? (
                    <>
                      <div className="insight-icon">
                        {/* <FiTrendingUp /> */}
                      </div>
                      <div className="insight-content">
                        <h4>{insight.title}</h4>
                        <p>{insight.text}</p>
                      </div>
                    </>
                  ) : (
                    <div className="insight-content-full">
                      <p className="insight-label">{insight.label}</p>
                      {insight.value && (
                        <p className="insight-value">{insight.value}</p>
                      )}
                      {insight.text && (
                        <p className="insight-text">{insight.text}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {insights.length > 1 && (
              <>
                <button className="carousel-btn prev" onClick={prevSlide}>
                  <FiChevronLeft />
                </button>
                <button className="carousel-btn next" onClick={nextSlide}>
                  <FiChevronRight />
                </button>
              </>
            )}
          </div>
          <div className="carousel-dots">
            {insights.map((_, idx) => (
              <button
                key={idx}
                className={`dot ${currentSlide === idx ? "active" : ""}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SavingsInsights;
