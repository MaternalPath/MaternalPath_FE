import React from "react";
import "./Css/ProfileHeaderCard.css";
import { FiUser, FiEdit2 } from "react-icons/fi";

const ProfileHeaderCard = () => {
  return (
    <div className="settings-card profile-header-card">
      <div className="profile-content">
        <div className="profile-left">
          <div className="avatar">
            <FiUser size={32} />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Adaeze Nnamdi</h2>
            <div className="profile-meta">
              <span>Week 24</span>
              <span className="dot">•</span>
              <span>Second Trimester</span>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <div className="detail-label">Estimated Due Date</div>
                <div className="detail-value">September 18, 2026</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Preferred Hospital</div>
                <div className="detail-value">Lagos General Hospital</div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn-edit">
          <FiEdit2 size={14} /> Edit Profile
        </button>
      </div>

      <div className="profile-content-mobile">
        <div className="avatar">
          <FiUser size={40} />
        </div>
        <h2 className="profile-name">Adaeze Nnamdi</h2>
        <div className="profile-meta">
          <span>Week 24</span>
          <span className="dot">•</span>
          <span className="badge">Second Trimester</span>
        </div>
        <div className="profile-details-mobile">
          <div className="detail-item">
            <div className="detail-label">Estimated Due Date</div>
            <div className="detail-value">September 18, 2026</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Preferred Hospital</div>
            <div className="detail-value">Lagos General Hospital</div>
          </div>
        </div>
        <button className="btn-edit-full">Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;