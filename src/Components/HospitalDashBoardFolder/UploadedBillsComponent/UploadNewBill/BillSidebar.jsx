import React from "react";
import {
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";
import "./Styles/BillSidebar.css";

const BillSidebar = ({ formData, uploadProgress }) => {
  const workflowSteps = [
    {
      id: 1,
      title: "Upload Bill",
      desc: "Initiate submission",
      status: "active",
    },
    {
      id: 2,
      title: "Customer Review",
      desc: "Clinical record validation",
      status: "pending",
    },
    {
      id: 3,
      title: "Fund Validation",
      desc: "Check wallet balance eligibility",
      status: "pending",
    },
    {
      id: 4,
      title: "Final Approval",
      desc: "Completion and disbursement",
      status: "pending",
    },
  ];

  const validationItems = [
    { label: "Patient ID matched", status: "valid", icon: FiCheckCircle },
    {
      label: "File upload progress",
      status: uploadProgress > 0 ? "progress" : "pending",
      icon: FiAlertCircle,
      value: `${uploadProgress}%`,
    },
    { label: "Billing Verification", status: "pending", icon: FiClock },
    { label: "Required fields complete", status: "pending", icon: FiClock },
  ];

  const showSummary = formData.file && uploadProgress >= 75;

  return (
    <div className="bill-sidebar">
      <div className="sidebar-card">
        <h3 className="sidebar-title">Verification Workflow</h3>
        <div className="workflow-steps">
          {workflowSteps.map((step, idx) => (
            <div key={step.id} className={`workflow-step ${step.status}`}>
              <div className="step-indicator">
                {step.status === "active" ? (
                  <div className="step-circle active">
                    <FiCheckCircle />
                  </div>
                ) : (
                  <div className="step-circle"></div>
                )}
                {idx < workflowSteps.length - 1 && (
                  <div className="step-line"></div>
                )}
              </div>
              <div className="step-content">
                <p className="step-title">{step.title}</p>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-card">
        <h3 className="sidebar-title">System Validation</h3>
        <div className="validation-list">
          {validationItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`validation-item ${item.status}`}>
                <Icon className="validation-icon" />
                <span className="validation-label">{item.label}</span>
                <span className={`validation-badge ${item.status}`}>
                  {item.status === "valid" && "VALID"}
                  {item.status === "progress" && item.value}
                  {item.status === "pending" && "PENDING"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {showSummary && (
        <div className="sidebar-card summary-card">
          <h3 className="sidebar-title">
            <FiFileText /> Bill Summary
          </h3>
          <div className="summary-list">
            <div className="summary-row">
              <span>Patient Name</span>
              <span className="value">
                {formData.fullName || "Sarah Smith"}
              </span>
            </div>
            <div className="summary-row">
              <span>Category</span>
              <span className="value">Antenatal Care</span>
            </div>
            <div className="summary-row">
              <span>Date</span>
              <span className="value">Oct 24, 2026</span>
            </div>
          </div>
          <div className="summary-total">
            <span>Total Amount</span>
            <span className="amount">₦ 45,500.00</span>
          </div>
          <div className="summary-status">Status: Pending Submission</div>
        </div>
      )}

      <div className="sidebar-actions mobile-only">
        <button className="btn-primary full">Submit for Verification</button>
        <button className="btn-outline full">Cancel Upload</button>
      </div>
    </div>
  );
};

export default BillSidebar;
