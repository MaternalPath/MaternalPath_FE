import React, { useState } from "react";
import "./Styles/BillUploadAuthorization.css";

const BillUploadAuthorization = () => {
  const [billAmount, setBillAmount] = useState("0.00");
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleRequestAuthorization = () => {
    setShowStatus(true);
  };

  const handleCancel = () => {
    setBillAmount("0.00");
    setFileName("");
    setNotes("");
    setShowStatus(false);
  };

  return (
    <div className="bill-upload-authorization-container">
      <div className="bill-upload-authorization-card">
        <div className="bill-upload-authorization-header">
          <h2 className="bill-upload-authorization-title">
            Bill Upload & Authorization
          </h2>
          <p className="bill-upload-authorization-subtitle">
            Upload hospital bill and request fund authorization
          </p>
        </div>

        <div className="bill-upload-authorization-form">
          <div className="bill-upload-authorization-form-row">
            <div className="bill-upload-authorization-form-section">
              <label className="bill-upload-authorization-form-label">
                Bill Amount
              </label>
              <div className="bill-upload-authorization-input-wrapper">
                <span className="bill-upload-authorization-currency-symbol">
                  ₦
                </span>
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="0.00"
                  className="bill-upload-authorization-bill-input"
                />
              </div>
            </div>

            <div className="bill-upload-authorization-form-section">
              <label className="bill-upload-authorization-form-label">
                Upload Hospital Bill
              </label>
              <div className="bill-upload-authorization-file-upload-wrapper">
                <input
                  type="file"
                  id="bill-upload-authorization-file-input"
                  onChange={handleFileChange}
                  className="bill-upload-authorization-file-input"
                />
                <label
                  htmlFor="bill-upload-authorization-file-input"
                  className="bill-upload-authorization-file-upload-button"
                >
                  <svg
                    className="bill-upload-authorization-upload-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span>{fileName ? fileName : "Choose File"}</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bill-upload-authorization-form-section">
            <label className="bill-upload-authorization-form-label">
              Notes / Description
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any relevant notes or details about the bill..."
              className="bill-upload-authorization-notes-textarea"
            ></textarea>
          </div>

          <div className="bill-upload-authorization-button-group">
            <button
              className="bill-upload-authorization-btn-primary"
              onClick={handleRequestAuthorization}
            >
              Request Authorization
            </button>
            <button
              className="bill-upload-authorization-btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {showStatus && (
            <div className="bill-upload-authorization-status-alert">
              <div className="bill-upload-authorization-alert-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div className="bill-upload-authorization-alert-content">
                <h3 className="bill-upload-authorization-alert-title">
                  Awaiting Patient Authorization
                </h3>
                <p className="bill-upload-authorization-alert-message">
                  OTP has been sent to patient's phone. Approval pending.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillUploadAuthorization;
