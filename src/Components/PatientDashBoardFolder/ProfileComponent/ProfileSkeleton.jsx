import React from "react";
import "./Css/ProfileSkeleton.css";

const Block = ({ width = "100%", height = 14, radius = 6, style }) => (
  <span
    className="profile-skeleton-block"
    style={{ width, height, borderRadius: radius, ...style }}
  />
);

const FieldRow = () => (
  <div className="profile-skeleton-field">
    <Block width="120px" height={10} />
    <Block width="60%" height={14} />
  </div>
);

const SimpleCard = ({ rows = 3 }) => (
  <div className="profile-skeleton-card">
    <div className="profile-skeleton-card-header">
      <Block width="200px" height={18} />
      <Block width="60px" height={28} radius={8} />
    </div>
    <div className="profile-skeleton-fields">
      {Array.from({ length: rows }).map((_, i) => (
        <FieldRow key={i} />
      ))}
    </div>
  </div>
);

const ProfileSkeleton = () => {
  return (
    <div className="profile-skeleton" aria-busy="true" aria-label="Loading profile">
      <div className="profile-skeleton-page-header">
        <Block width="260px" height={26} />
        <Block width="360px" height={14} />
      </div>

      <div className="profile-skeleton-card profile-skeleton-header-card">
        <Block width={72} height={72} radius={36} />
        <div className="profile-skeleton-header-info">
          <Block width="200px" height={20} />
          <div className="profile-skeleton-row">
            <Block width="80px" height={12} />
            <Block width="100px" height={12} />
          </div>
          <div className="profile-skeleton-row profile-skeleton-row-gap">
            <div className="profile-skeleton-field">
              <Block width="120px" height={10} />
              <Block width="140px" height={14} />
            </div>
            <Block width="110px" height={32} radius={8} />
          </div>
        </div>
      </div>

      <SimpleCard rows={4} />
      <SimpleCard rows={4} />
      <SimpleCard rows={3} />
      <SimpleCard rows={3} />
      <SimpleCard rows={3} />
      <SimpleCard rows={3} />
    </div>
  );
};

export default ProfileSkeleton;
