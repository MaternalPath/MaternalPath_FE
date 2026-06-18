import React, { useRef } from "react";
import {
  FiUser,
  FiFileText,
  FiUploadCloud,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "./Styles/BillForm.css";

const BillForm = ({
  formData,
  onChange,
  uploadProgress,
  setUploadProgress,
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange("file", file);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 75) clearInterval(interval);
      }, 200);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      onChange("file", file);
      setUploadProgress(75);
    }
  };

  const cancelUpload = () => {
    onChange("file", null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bill-form">
      <div className="form-card">
        <h3 className="card-title">
          <FiUser /> Patient Identification
        </h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name (Lookup)</label>
            <div className="input-icon">
              <input
                type="text"
                placeholder="Start typing name..."
                value={formData.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
              />
              <FiSearch className="icon-right" />
            </div>
          </div>

          <div className="form-group">
            <label>Maternal ID</label>
            <input
              type="text"
              value={formData.maternalId}
              onChange={(e) => onChange("maternalId", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => onChange("phoneNumber", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Expected Delivery Date (EDD)</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={formData.edd}
              onChange={(e) => onChange("edd", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-card">
        <h3 className="card-title">
          <FiFileText /> Bill Details
        </h3>

        <div className="form-grid">
          <div className="form-group">
            <label>Reference Number</label>
            <input
              type="text"
              value={formData.referenceNumber}
              onChange={(e) => onChange("referenceNumber", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => onChange("category", e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="antenatal">Antenatal Care</option>
              <option value="delivery">Delivery</option>
              <option value="postnatal">Postnatal Care</option>
            </select>
          </div>

          <div className="form-group">
            <label>Amount (₦)</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => onChange("amount", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Billing Date</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={formData.billingDate}
              onChange={(e) => onChange("billingDate", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={formData.dueDate}
              onChange={(e) => onChange("dueDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="form-card">
        <h3 className="card-title">
          <FiUploadCloud /> Document Upload
        </h3>

        <div
          className="upload-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">
            <FiUploadCloud />
          </div>
          <p className="upload-text">
            Drag and drop billing files here or{" "}
            <span className="browse">browse</span>
          </p>
          <p className="upload-hint">
            Supported formats: PDF, JPG, PNG (Max 20MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
          />
        </div>

        {formData.file && (
          <div className="file-item">
            <div className="file-icon">
              <FiFileText />
            </div>
            <div className="file-info">
              <p className="file-name">{formData.file.name}</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="file-size">1.4 MB</span>
            </div>
            <div className="file-status">
              <span>Uploading... {uploadProgress}%</span>
              <button onClick={cancelUpload} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="form-card">
        <h3 className="card-title">
          <FiMenu /> Additional Notes
        </h3>
        <textarea
          placeholder="Add any clinical context or special billing instructions here..."
          value={formData.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button className="btn-outline">Cancel Upload</button>
        <button className="btn-primary">Submit for Verification</button>
      </div>
    </div>
  );
};

export default BillForm;
