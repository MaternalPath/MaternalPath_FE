// import React from "react";
import "./Css/ProfileHeaderCard.css";
import { FiUser, FiEdit2 } from "react-icons/fi";
import { TiEdit } from "react-icons/ti";

const ProfileHeaderCard = ({ data = {}, onEditClick}) => {
  return (
    <div className="settings-card profile-header-card">
      <div className="profile-content">
        <div className="profile-left">
          <div className="avatar">
            <FiUser size={32} />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{data?.name || "Adaeze Nnamdi"}</h2>
            <div className="profile-meta">
              <span>{data?.week || "Week 24"}</span>
              <span className="dot">•</span>
              <span>{data?.trimester || "Second Trimester"}</span>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <div className="detail-label">Estimated Due Date</div>
                <div className="detail-value">
                  {data?.dueDate || "September 18, 2026"}
                </div>
              </div>
              <div className="detail-item">
                <button className="btn-edit" onClick={onEditClick}>
                  <TiEdit size={14} /> Edit Profile
                </button>
              </div>
            </div>
          </div>
          {/* <button className="btn-edit" onClick={onEditClick}>
            <FiEdit2 size={14} /> Edit Profile
          </button> */}
        </div>
      </div>

      <div className="profile-content-mobile">
        <div className="avatar">
          <FiUser size={40} />
        </div>
        <h2 className="profile-name">{data?.name || "Adaeze Nnamdi"}</h2>
        <div className="profile-meta">
          <span>{data?.week || "Week 24"}</span>
          <span className="dot">•</span>
          <span className="badge">{data?.trimester || "Second Trimester"}</span>
        </div>
        <div className="profile-details-mobile">
          <div className="detail-item">
            <div className="detail-label">Estimated Due Date</div>
            <div className="detail-value">
              {data?.dueDate || "September 18, 2026"}
            </div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Preferred Hospital</div>
            <div className="detail-value">
              {data?.hospital || "Lagos General Hospital"}
            </div>
          </div>
        </div>
        <button className="btn-edit-full" onClick={onEditClick}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
