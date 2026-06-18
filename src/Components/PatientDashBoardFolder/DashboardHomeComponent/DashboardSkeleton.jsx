import React from "react";
import "./Css/DashboardSkeleton.css";

const Block = ({ width = "100%", height = 14, radius = 6, style }) => (
  <span
    className="skeleton-block"
    style={{ width, height, borderRadius: radius, ...style }}
  />
);

const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton" aria-busy="true" aria-label="Loading dashboard">
      <div className="skeleton-welcome">
        <Block width="280px" height={26} />
        <Block width="220px" height={14} />
      </div>

      <div className="skeleton-card skeleton-hero">
        <div className="skeleton-hero-left">
          <Block width="180px" height={28} />
          <Block width="60%" />
          <div className="skeleton-stats">
            <div className="skeleton-stat">
              <Block width="80px" height={10} />
              <Block width="120px" height={18} />
            </div>
            <div className="skeleton-stat">
              <Block width="80px" height={10} />
              <Block width="120px" height={18} />
            </div>
            <div className="skeleton-stat">
              <Block width="80px" height={10} />
              <Block width="120px" height={18} />
            </div>
          </div>
          <Block width="100%" height={8} radius={4} />
        </div>
        <div className="skeleton-hero-right">
          <Block width="140px" height={140} radius={12} />
        </div>
      </div>

      <div className="skeleton-card">
        <div className="skeleton-row">
          <Block width="160px" height={18} />
          <Block width="80px" height={14} />
        </div>
        <div className="skeleton-row skeleton-row-gap">
          <div className="skeleton-stat">
            <Block width="100px" height={10} />
            <Block width="140px" height={22} />
          </div>
          <div className="skeleton-stat">
            <Block width="100px" height={10} />
            <Block width="140px" height={22} />
          </div>
        </div>
        <Block width="100%" height={8} radius={4} />
      </div>

      <div className="skeleton-card">
        <Block width="180px" height={18} />
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton-list-item">
            <Block width={32} height={32} radius={8} />
            <div className="skeleton-list-text">
              <Block width="60%" height={14} />
              <Block width="40%" height={10} />
            </div>
          </div>
        ))}
      </div>

      <div className="skeleton-focus-grid">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton-focus-card">
            <Block width={28} height={28} radius={8} />
            <Block width="60%" height={14} />
            <Block width="90%" height={10} />
          </div>
        ))}
      </div>

      <div className="skeleton-card">
        <Block width="200px" height={18} />
        {[0, 1].map((i) => (
          <div key={i} className="skeleton-list-item">
            <Block width={32} height={32} radius={8} />
            <div className="skeleton-list-text">
              <Block width="70%" height={14} />
              <Block width="50%" height={10} />
              <Block width="30%" height={10} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
