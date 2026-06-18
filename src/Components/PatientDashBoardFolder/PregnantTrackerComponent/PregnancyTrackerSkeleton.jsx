import React from "react";
import "./Css/PregnancyTrackerSkeleton.css";

const Block = ({ width = "100%", height = 14, radius = 6, style }) => (
  <span
    className="tracker-skeleton-block"
    style={{ width, height, borderRadius: radius, ...style }}
  />
);

const PregnancyTrackerSkeleton = () => {
  return (
    <div className="tracker-skeleton" aria-busy="true" aria-label="Loading pregnancy tracker">
      <div className="tracker-skeleton-header">
        <Block width="260px" height={28} />
        <Block width="320px" height={14} />
      </div>

      <div className="tracker-skeleton-card tracker-skeleton-hero">
        <div className="tracker-skeleton-hero-left">
          <Block width="160px" height={28} />
          <Block width="60%" height={14} />
          <div className="tracker-skeleton-stats">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="tracker-skeleton-stat">
                <Block width="80px" height={10} />
                <Block width="120px" height={18} />
              </div>
            ))}
          </div>
          <Block width="100%" height={8} radius={4} />
        </div>
        <div className="tracker-skeleton-hero-right">
          <Block width={140} height={140} radius={12} />
        </div>
      </div>

      <div className="tracker-skeleton-info-row">
        {[0, 1].map((i) => (
          <div key={i} className="tracker-skeleton-card">
            <div className="tracker-skeleton-row">
              <Block width={20} height={20} radius={6} />
              <Block width="180px" height={16} />
            </div>
            <Block width="60%" height={12} />
            {[0, 1, 2, 3].map((j) => (
              <Block key={j} width={`${85 - j * 7}%`} height={12} />
            ))}
          </div>
        ))}
      </div>

      <div className="tracker-skeleton-card">
        <Block width="220px" height={18} />
        <div className="tracker-skeleton-reminders">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="tracker-skeleton-reminder">
              <Block width={32} height={32} radius={8} />
              <Block width="70%" height={14} />
              <Block width="50%" height={10} />
            </div>
          ))}
        </div>
      </div>

      <div className="tracker-skeleton-card">
        <Block width="200px" height={18} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="tracker-skeleton-timeline-item">
            <div className="tracker-skeleton-row">
              <Block width="140px" height={16} />
              <Block width="80px" height={20} radius={10} />
            </div>
            <Block width="100px" height={12} />
            <div className="tracker-skeleton-tag-row">
              <Block width={110} height={22} radius={11} />
              <Block width={130} height={22} radius={11} />
              <Block width={140} height={22} radius={11} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PregnancyTrackerSkeleton;
