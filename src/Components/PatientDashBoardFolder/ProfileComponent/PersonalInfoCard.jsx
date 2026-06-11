import React from "react";
import "./Css/PersonalInfoCard.css";
import { FiEdit2 } from "react-icons/fi";

const PersonalInfoCard = () => {
  return (
    <div className="settings-card personal-info-card">
      <div className="card-header">
        <h3 className="card-title">Personal Information</h3>
        <button className="btn-text">
          <FiEdit2 size={14} /> Edit
        </button>
      </div>
      
      <div className="info-grid-web">
        <div className="info-col">
          <div className="info-item">
            <div className="info-label">First name</div>
            <div className="info-value">Adaeze</div>
          </div>
          <div className="info-item">
            <div className="info-label">Last name</div>
            <div className="info-value">Nnamdi</div>
          </div>
          <div className="info-item">
            <div className="info-label">Phone Number</div>
            <div className="info-value">+234 803 456 7890</div>
          </div>
          <div className="info-item">
            <div className="info-label">Residential Location</div>
            <div className="info-value">Lagos, Nigeria</div>
          </div>
        </div>
        <div className="info-col">
          <div className="info-item">
            <div className="info-label">Email Address</div>
            <div className="info-value">adeaze.nnamdi@email.com</div>
          </div>
          <div className="info-item">
            <div className="info-label">Date of Birth</div>
            <div className="info-value">March 15, 1995</div>
          </div>
        </div>
      </div>

      <div className="info-list-mobile">
        <div className="info-item">
          <div className="info-label">Full Name</div>
          <div className="info-value">Adeaze Nnamdi</div>
        </div>
        <div className="info-item">
          <div className="info-label">Email Address</div>
          <div className="info-value">adeaze.nnamdi@email.com</div>
        </div>
        <div className="info-item">
          <div className="info-label">Phone Number</div>
          <div className="info-value">+234 801 234 5678</div>
        </div>
        <div className="info-item">
          <div className="info-label">Date of Birth</div>
          <div className="info-value">March 15, 1995</div>
        </div>
        <div className="info-item">
          <div className="info-label">Location</div>
          <div className="info-value">Lagos, Nigeria</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;