import React from "react";
import "./Css/PregnancyInfoCard.css";

const PregnancyInfoCard = () => {
  return (
    <div className="settings-card pregnancy-info-card">
      <div className="card-header">
        <h3 className="card-title">Pregnancy Information</h3>
        <button className="btn-primary">Update Pregnancy Information</button>
      </div>
      
      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Expected Date of Delivery (EDD)</div>
          <div className="info-value">December 19, 2025</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Pregnancy Week</div>
          <div className="info-value">Week 24</div>
        </div>
        <div className="info-item">
          <div className="info-label">Trimester</div>
          <div className="info-value">Second Trimester</div>
        </div>
        <div className="info-item">
          <div className="info-label">Emergency Contact</div>
          <div className="info-value">(Name - Phone Number)</div>
        </div>
        <div className="info-item">
          <div className="info-label">Blood Type</div>
          <div className="info-value">O+</div>
        </div>
        <div className="info-item">
          <div className="info-label">Allergies</div>
          <div className="info-value">No known allergies</div>
        </div>
        <div className="info-item full-width">
          <div className="info-label">Existing Health Conditions</div>
          <div className="info-value">None</div>
        </div>
      </div>

      <div className="info-list-mobile">
        <div className="info-item">
          <div className="info-label">Estimated Due Date</div>
          <div className="info-value">September 18, 2026</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Week</div>
          <div className="info-value">Week 24</div>
        </div>
        <div className="info-item">
          <div className="info-label">Current Trimester</div>
          <div className="info-value">Second Trimester</div>
        </div>
        <div className="info-item">
          <div className="info-label">Emergency Contact</div>
          <div className="info-value">Chidi Nnamdi</div>
        </div>
        <div className="info-item">
          <div className="info-label">Blood Type</div>
          <div className="info-value">O+</div>
        </div>
        <div className="info-item">
          <div className="info-label">Known Allergies</div>
          <div className="info-value">None</div>
        </div>
        <div className="info-item">
          <div className="info-label">Existing Health Conditions</div>
          <div className="info-value">No known allergies</div>
        </div>
        <button className="btn-primary-full">Update Pregnancy Information</button>
      </div>
    </div>
  );
};

export default PregnancyInfoCard;