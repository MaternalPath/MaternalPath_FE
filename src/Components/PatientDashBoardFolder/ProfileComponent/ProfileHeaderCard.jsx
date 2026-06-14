import React from "react";
import "./Css/ProfileHeaderCard.css";
import { FiUser, FiEdit2 } from "react-icons/fi";


const ProfileHeaderCard = ({ data = {}, onEditClick, editing}) => {
  const fullName = data?.name || `${data?.firstName || ""} ${data?.lastName || ""}`.trim();
  const trimesterLabel = data?.trimester ? `Trimester ${data?.trimester}` : "Second Trimester";
  

  return (
    <div className="settings-card profile-header-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">Profile Header</h3>
          <p className="card-subtitle">Basic profile details and pregnancy summary.</p>
        </div>
        <button type="button" className="btn-text" onClick={onEditClick}>
          <FiEdit2 size={14} /> Edit
        </button>
      </div>

        <div className="profile-content">
          <div className="profile-left">
            <div className="avatar">
              {data?.image ? (
                <img src={data?.image} alt="Profile" className="profile-image" />
              ) : (
                <FiUser size={32} />
              )}
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{fullName || "Adaeze Nnamdi"}</h2>
              <div className="profile-meta">
                <span>Week {data?.week || data?.currentPregnancyWeek || 24}</span>
                <span className="dot">•</span>
                <span>{trimesterLabel}</span>
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <div className="detail-label">Estimated Due Date</div>
                  <div className="detail-value">{data?.estimatedDueDate || data?.dueDate || "September 18, 2026"}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Preferred Hospital</div>
                  <div className="detail-value">{data?.preferredHospital || "Lagos General Hospital"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="profile-content-mobile">
        <div className="avatar-mobile">
          {data?.image ? (
            <img src={data?.image} alt="Profile" className="profile-image-mobile" />
          ) : (
            <FiUser size={40} />
          )}
        </div>
        {editing ? (
          <div className="profile-edit-grid-mobile">
            <div className="field-row">
              <label>First name</label>
              <input
                className="field-input"
                type="text"
                value={data?.firstName || ""}
                onChange={(e) => onFieldChange?.("firstName", e.target.value)}
              />
            </div>
            <div className="field-row">
              <label>Last name</label>
              <input
                className="field-input"
                type="text"
                value={data?.lastName || ""}
                onChange={(e) => onFieldChange?.("lastName", e.target.value)}
              />
            </div>
          </div>
        ) : (
          <h2 className="profile-name">{fullName || "Adaeze Nnamdi"}</h2>
        )}
        <div className="profile-meta">
          <span>Week {data?.week || data?.currentPregnancyWeek || 24}</span>
          <span className="dot">•</span>
          <span className="badge">{trimesterLabel}</span>
        </div>
        <div className="profile-details-mobile">
          <div className="detail-item">
            <div className="detail-label">Estimated Due Date</div>
            {editing ? (
              <input
                className="field-input"
                type="date"
                value={data?.estimatedDueDate || data?.dueDate || ""}
                onChange={(e) => onFieldChange?.("estimatedDueDate", e.target.value)}
              />
            ) : (
              <div className="detail-value">{data?.estimatedDueDate || data?.dueDate || "September 18, 2026"}</div>
            )}
          </div>
          <div className="detail-item">
            <div className="detail-label">Preferred Hospital</div>
            {editing ? (
              <input
                className="field-input"
                type="text"
                value={data?.preferredHospital || ""}
                onChange={(e) => onFieldChange?.("preferredHospital", e.target.value)}
              />
            ) : (
              <div className="detail-value">{data?.preferredHospital || "Lagos General Hospital"}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
