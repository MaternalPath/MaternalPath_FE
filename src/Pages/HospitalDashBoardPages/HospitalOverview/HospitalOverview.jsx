import React, { useState } from "react";
import "./Styles/HospitalOverview.css";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import BillUploadAuthorization from "./BillUploadAuthorization";
import HospitalVerificationHistory from "./HospitalVerificationHistory";
import PatientVerification from "./PatientVerification";

const HospitalOverview = () => {
  const statCards = [
    {
      icon: <FileText size={18} />,
      number: "142",
      label: "Total Verification Requests",
    },
    {
      icon: <Clock size={18} />,
      number: "8",
      label: "Pending Authorizations",
    },
    {
      icon: <CheckCircle size={18} />,
      number: "128",
      label: "Approved Requests",
    },
    {
      icon: <XCircle size={18} />,
      number: "6",
      label: "Declined Requests",
    },
  ];

  return (
    <>
      <div className="hospital-overview-container">
        <div className="hospital-overview-header">
          <h1 className="hospital-overview-title">Dashboard Overview</h1>
          <p className="hospital-overview-subtitle">
            Patient verification and fund authorization portal
          </p>
        </div>

        <div className="hospital-overview-stat-cards-container">
          {statCards.map((card, index) => (
            <div key={index} className="hospital-overview-stat-card">
              <div className="hospital-overview-stat-icon">{card.icon}</div>
              <div className="hospital-overview-stat-number">{card.number}</div>
              <div className="hospital-overview-stat-label">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
      <PatientVerification />
      <BillUploadAuthorization />
      <HospitalVerificationHistory />
    </>
  );
};

export default HospitalOverview;
