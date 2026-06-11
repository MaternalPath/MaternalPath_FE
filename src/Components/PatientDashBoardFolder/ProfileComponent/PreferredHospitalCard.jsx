import React from "react";
import "./Css/PreferredHospitalCard.css";
import { FiHome } from "react-icons/fi";

const PreferredHospitalCard = () => {
  return (
    <div className="settings-card preferred-hospital-card">
      <div className="card-header">
        <h3 className="card-title">
          <FiHome size={18} /> Preferred Hospital
        </h3>
        <button className="btn-primary">Select Hospital</button>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Selected Hospital</div>
          <div className="info-value">Lagos General Hospital</div>
        </div>
        <div className="info-item">
          <div className="info-label">Hospital Contact</div>
          <div className="info-value">+234 1 234 5678</div>
        </div>
        <div className="info-item">
          <div className="info-label">Hospital Address</div>
          <div className="info-value">Island Hospital Road, Lagos</div>
        </div>
        <div className="info-item">
          <div className="info-label">Estimated Delivery Cost</div>
          <div className="info-value">₦400,000</div>
        </div>
      </div>

      <div className="info-list-mobile">
        <h3 className="card-title-mobile">Preferred Hospital</h3>
        <div className="info-item">
          <div className="info-label">Hospital Name</div>
          <div className="info-value">Lagos General Hospital</div>
        </div>
        <div className="info-item">
          <div className="info-label">Hospital Address</div>
          <div className="info-value">Broad Street, Marina, Lagos</div>
        </div>
        <div className="info-item">
          <div className="info-label">Contact Number</div>
          <div className="info-value">+234 1 234 5678</div>
        </div>
        <div className="info-item">
          <div className="info-label">Estimated Delivery Cost</div>
          <div className="info-value">₦400,000</div>
        </div>
        <button className="btn-primary-full">Select Hospital</button>
      </div>
    </div>
  );
};

export default PreferredHospitalCard;