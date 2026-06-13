import React, { useState } from "react";
import "./Styles/HospitalVerificationHistory.css";

const HospitalVerificationHistory = () => {
  const verificationData = [
    {
      id: 1,
      patientName: "Chidinma Adeyemi",
      date: "May 10, 2026",
      amountRequested: "₦385,000",
      authorizationStatus: "Approved",
      hospitalStatus: "Lagos General Hospital",
    },
    {
      id: 2,
      patientName: "Blessing Okonkwo",
      date: "May 09, 2026",
      amountRequested: "₦420,000",
      authorizationStatus: "Approved",
      hospitalStatus: "St. Mary's Hospital", 
    },
    {
      id: 3,
      patientName: "Fatima Ibrahim",
      date: "May 08, 2026",
      amountRequested: "₦350,000",
      authorizationStatus: "Pending",
      hospitalStatus: "Community Health Center", 
    },
    {
      id: 4,
      patientName: "Grace Nwosu",
      date: "May 07, 2026",
      amountRequested: "₦280,000",
      authorizationStatus: "Declined",
      hospitalStatus: "Augusta Memorial Hospital", 
    },
    {
      id: 5,
      patientName: "Grace Nwosu",
      date: "May 07, 2026",
      amountRequested: "₦280,000",
      authorizationStatus: "Declined",
      hospitalStatus: "GoldenCross Specialist Hospital", 
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "hospital-status-approved";
      case "Pending":
        return "hospital-status-pending";
      case "Declined":
        return "hospital-status-declined";
      default:
        return "";
    }
  };

  return (
    <div className="hospital-verification-history-container">
      <div className="hospital-verification-history-card">
        <div className="hospital-history-header">
          <h2 className="hospital-history-title">Verification History</h2>
          <p className="hospital-history-subtitle">
            Recent patient fund verification requests
          </p>
        </div>

        <div className="hospital-table-wrapper">
          <table className="hospital-verification-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Amount Requested</th>
                <th>Authorization Status</th>
                <th>Hospital Status</th>
              </tr>
            </thead>
            <tbody>
              {verificationData.map((record) => (
                <tr key={record.id}>
                  <td>{record.patientName}</td>
                  <td>{record.date}</td>
                  <td>{record.amountRequested}</td>
                  <td>
                    <span
                      className={`hospital-status-badge ${getStatusClass(record.authorizationStatus)}`}
                    >
                      {record.authorizationStatus}
                    </span>
                  </td>
                  <td>{record.hospitalStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalVerificationHistory;