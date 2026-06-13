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
      <div className="hospital-overview">
        <div className="overview-header">
          <h1>Dashboard Overview</h1>
          <p>Patient verification and fund authorization portal</p>
        </div>

        <div className="stat-cards-container">
          {statCards.map((card, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{card.icon}</div>
              <div className="stat-number">{card.number}</div>
              <div className="stat-label">{card.label}</div>
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