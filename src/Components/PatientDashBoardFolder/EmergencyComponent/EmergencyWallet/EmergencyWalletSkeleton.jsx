import React from "react";
import "../../DashboardHomeComponent/Css/DashboardSkeleton.css";

const Block = ({ width = "100%", height = 14, radius = 6, style }) => (
  <span
    className="skeleton-block"
    style={{ width, height, borderRadius: radius, ...style }}
  />
);

const EmergencyWalletSkeleton = () => {
  return (
    <div className="dashboard-skeleton" aria-busy="true" aria-label="Loading emergency wallet">
      <div className="skeleton-welcome">
        <Block width="220px" height={26} />
        <Block width="320px" height={14} />
      </div>

      <div className="skeleton-card skeleton-hero">
        <div className="skeleton-hero-left">
          <Block width="180px" height={32} />
          <Block width="60%" />
          <div className="skeleton-stats" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="skeleton-stat">
                <Block width="120px" height={10} />
                <Block width="140px" height={18} />
              </div>
            ))}
          </div>
          <Block width="100%" height={8} radius={4} />
        </div>
        <div className="skeleton-hero-right">
          <Block width={160} height={160} radius={12} />
        </div>
      </div>

      <div className="skeleton-focus-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div className="skeleton-card">
          <Block width="180px" height={18} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-list-item">
              <Block width={28} height={28} radius={14} />
              <div className="skeleton-list-text">
                <Block width="40%" height={14} />
              </div>
              <Block width="80px" height={14} />
            </div>
          ))}
        </div>
        <div className="skeleton-card">
          <Block width="180px" height={18} />
          {[0, 1, 2, 3].map((i) => (
            <Block key={i} width="100%" height={56} radius={10} />
          ))}
        </div>
      </div>

      <div className="skeleton-card">
        <div className="skeleton-row">
          <Block width="180px" height={18} />
          <Block width="80px" height={14} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton-row" style={{ gap: 16 }}>
            <Block width="14%" height={14} />
            <Block width="20%" height={14} />
            <Block width="30%" height={14} />
            <Block width="14%" height={14} />
            <Block width="14%" height={14} />
          </div>
        ))}
      </div>

      <div className="skeleton-card">
        <Block width="200px" height={18} />
        <div className="skeleton-stats">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton-stat">
              <Block width="100px" height={10} />
              <Block width="120px" height={16} />
            </div>
          ))}
        </div>
        <Block width="100%" height={8} radius={4} />
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
    </div>
  );
};

export default EmergencyWalletSkeleton;
