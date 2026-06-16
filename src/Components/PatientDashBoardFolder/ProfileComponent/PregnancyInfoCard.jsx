import React from "react";
import "./Css/PregnancyInfoCard.css";
import { FiEdit2 } from "react-icons/fi";

const PregnancyInfoCard = ({ data = {}, onEditClick }) => {
  return (
    <div className="settings-card pregnancy-info-card">
      <div className="card-header">
        <h3 className="card-title">Pregnancy Information</h3>
    
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Expected Date of Delivery (EDD)</div>
          <div className="info-value">{data?.estimatedDueDate || data?.dueDate || "December 19, 2025"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Pregnancy Week</div>
          <div className="info-value">Week {data?.currentPregnancyWeek || 24}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Trimester</div>
          <div className="info-value">{data?.trimester ? `Trimester ${data?.trimester}` : "Second Trimester"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Emergency Contact</div>
          <div className="info-value">{data?.emergencyContact || "(Name - Phone Number)"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Blood Type</div>
          <div className="info-value">{data?.bloodType || "O+"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Allergies</div>
          <div className="info-value">{data?.allergies || "No known allergies"}</div>
        </div>
        <div className="info-item full-width">
          <div className="info-label">Existing Health Conditions</div>
          <div className="info-value">{data?.existingHealthConditions || "None"}</div>
        </div>
      </div>

      <div className="info-list-mobile">
        <div className="info-item">
          <div className="info-label">Estimated Due Date</div>
          <div className="info-value">{data?.estimatedDueDate || data?.dueDate || "September 18, 2026"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Week</div>
          <div className="info-value">Week {data?.currentPregnancyWeek || 24}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Trimester</div>
          <div className="info-value">{data?.trimester ? `Trimester ${data?.trimester}` : "Second Trimester"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Emergency Contact</div>
          <div className="info-value">{data?.emergencyContact || "Chidi Nnamdi"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Blood Type</div>
          <div className="info-value">{data?.bloodType || "O+"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Known Allergies</div>
          <div className="info-value">{data?.allergies || "None"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Existing Health Conditions</div>
          <div className="info-value">{data?.existingHealthConditions || "No known allergies"}</div>
        </div>
        <button type="button" className="btn-primary-full" onClick={onEditClick}>
          <FiEdit2 size={14} /> Update Pregnancy Information
        </button>
      </div>
    </div>
  );
};

export default PregnancyInfoCard;
