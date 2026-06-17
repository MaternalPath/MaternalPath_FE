import React from "react";
import "./Css/PersonalInfoCard.css";
import { FiEdit2 } from "react-icons/fi";

const PersonalInfoCard = ({ data = {}, onEditClick }) => {
  return (
    <div className="settings-card personal-info-card">
      <div className="card-header">
        <h3 className="card-title">Personal Information</h3>
     
      </div>

      <div className="info-grid-web">
        <div className="info-col">
          <div className="info-item">
            <div className="info-label">First name</div>
            <div className="info-value">{data?.firstName || "Not Set yet"}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Last name</div>
            <div className="info-value">{data?.lastName || "Not Set yet"}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Phone Number</div>
            <div className="info-value">{data?.phoneNumber || " Not Set yet"}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Residential Location</div>
            <div className="info-value">{data?.address || " Not Set yet"}</div>
          </div>
        </div>
        <div className="info-col">
          <div className="info-item">
            <div className="info-label">Email Address</div>
            <div className="info-value">{data?.email || "Not Set yet"}</div>
          </div>
          <div className="info-item">
            <div className="info-label">Date of Birth</div>
            <div className="info-value">{data?.dateOfBirth || "Not Set yet"}</div>
          </div>
        </div>
      </div>

      <div className="info-list-mobile">
        <div className="info-item">
          <div className="info-label">Full Name</div>
          <div className="info-value">{`${data?.firstName || "Not Set yet"} ${data?.lastName || "Not Set yet"}`.trim()}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Email Address</div>
          <div className="info-value">{data?.email || "Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Phone Number</div>
          <div className="info-value">{data?.phoneNumber || "Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Date of Birth</div>
          <div className="info-value">{data?.dateOfBirth || "Not Set yet"}</div>
        </div>
        <div className="info-item">
          <div className="info-label">Location</div>
          <div className="info-value">{data?.address || "Not Set yet"}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;
