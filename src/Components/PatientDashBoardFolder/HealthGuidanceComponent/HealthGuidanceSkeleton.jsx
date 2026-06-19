import React from "react";
import "../DashboardHomeComponent/Css/DashboardSkeleton.css";

const Block = ({ width = "100%", height = 14, radius = 6, style }) => (
  <span
    className="skeleton-block"
    style={{ width, height, borderRadius: radius, ...style }}
  />
);

const HealthGuidanceSkeleton = () => {
  return (
    <div className="dashboard-skeleton" aria-busy="true" aria-label="Loading health guidance">
      <div className="skeleton-welcome">
        <Block width="220px" height={26} />
        <Block width="320px" height={14} />
      </div>

      <div className="skeleton-card skeleton-hero">
        <div className="skeleton-hero-left">
          <Block width="120px" height={28} />
          <Block width="70%" />
          <Block width="100%" height={48} radius={10} />
          <div className="skeleton-stats" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div className="skeleton-stat">
              <Block width="100px" height={10} />
              <Block width="160px" height={18} />
            </div>
            <div className="skeleton-stat">
              <Block width="100px" height={10} />
              <Block width="160px" height={18} />
            </div>
          </div>
        </div>
        <div className="skeleton-hero-right">
          <Block width={140} height={140} radius={12} />
        </div>
      </div>

      <div className="skeleton-card">
        <Block width="200px" height={18} />
        <div className="skeleton-focus-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton-focus-card">
              <Block width="60%" height={14} />
              <Block width="90%" height={10} />
              <Block width="80%" height={10} />
            </div>
          ))}
        </div>
        <Block width="100%" height={60} radius={10} />
        <Block width="180px" height={16} />
        <div className="skeleton-focus-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {[0, 1, 2, 3].map((i) => (
            <Block key={i} width="100%" height={36} radius={8} />
          ))}
        </div>
      </div>

      <div className="skeleton-card">
        <Block width="200px" height={18} />
        <div className="skeleton-focus-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton-list-item">
              <Block width={36} height={36} radius={8} />
              <div className="skeleton-list-text">
                <Block width="50%" height={14} />
                <Block width="80%" height={10} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skeleton-focus-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        {[0, 1].map((i) => (
          <div key={i} className="skeleton-card">
            <Block width="200px" height={18} />
            <Block width="60%" height={12} />
            {[0, 1, 2, 3].map((j) => (
              <Block key={j} width="100%" height={12} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthGuidanceSkeleton;
