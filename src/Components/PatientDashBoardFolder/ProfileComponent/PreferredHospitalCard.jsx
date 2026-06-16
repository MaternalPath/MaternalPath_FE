import React from "react";
import "./Css/PreferredHospitalCard.css";
import { FiHome, FiEdit2 } from "react-icons/fi";

  const PreferredHospitalCard = ({ data = {}, onEditClick }) => {
    return (
      <div className="settings-card preferred-hospital-card">
        <div className="card-header">
          <h3 className="card-title">
            <FiHome size={18} /> Preferred Hospital
          </h3>
          
      </div>

      <div className="info-grid">
        <div className="info-item">
          <div className="info-label">Selected Hospital</div>
          <div className="info-value">{data?.preferredHospital || "Lagos General Hospital"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Hospital Contact</div>
          <div className="info-value">{data?.hospitalContact || "+234 1 234 5678"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Hospital Address</div>
          <div className="info-value">{data?.hospitalAddress || "Island Hospital Road, Lagos"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Estimated Delivery Cost</div>
          <div className="info-value">{data?.estimatedDeliveryCost ? `₦${data.estimatedDeliveryCost}` : "₦400,000"}</div>
        </div>
      </div>

      <div className="info-list-mobile">
        <h3 className="card-title-mobile">Preferred Hospital</h3>
        <div className="info-item">
          <div className="info-label">Hospital Name</div>
          <div className="info-value">{data?.preferredHospital || "Lagos General Hospital"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Hospital Address</div>
          <div className="info-value">{data?.hospitalAddress || "Broad Street, Marina, Lagos"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Contact Number</div>
          <div className="info-value">{data?.hospitalContact || "+234 1 234 5678"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Estimated Delivery Cost</div>
          <div className="info-value">{data?.estimatedDeliveryCost ? `₦${data.estimatedDeliveryCost}` : "₦400,000"}</div>
        </div>
        <button type="button" className="btn-primary-full" onClick={onEditClick}>
          <FiEdit2 size={14} /> Select Hospital
        </button>
      </div>
    </div>
  );
};

export default PreferredHospitalCard;
