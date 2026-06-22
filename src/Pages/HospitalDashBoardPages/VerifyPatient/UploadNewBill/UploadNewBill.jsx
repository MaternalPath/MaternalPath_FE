import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Styles/UploadNewBill.css";
import { MdPersonOutline } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { RiUploadCloudLine } from "react-icons/ri";
import { BiMenuAltLeft } from "react-icons/bi";

const VALIDATION_TYPES = [
  { key: "patienceIdMatched", label: "Patient ID matched" },
  { key: "fileUploadedProgress", label: "File upload progress" },
  { key: "billingVerification", label: "Billing Verification" },
  { key: "requiredFieldComplete", label: "Required fields complete" },
];

const WORKFLOW_STAGES = [
  { key: "uploadedBill", title: "Upload Bill", subtitle: "Invoice submission" },
  {
    key: "customerReview",
    title: "Customer Review",
    subtitle: "Awaiting mother's approval",
  },
  {
    key: "fundValidation",
    title: "Fund Validation",
    subtitle: "Admin checks patient balance",
  },
  {
    key: "finalApproval",
    title: "Final Approval",
    subtitle: "Admin disbursement",
  },
];

const UploadedNewBill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const motherId = new URLSearchParams(location.search).get("motherId");

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  // ========================
  // FORM STATE
  // ========================
  const [formData, setFormData] = useState({
    fullName: "",
    maternalId: motherId || "",
    phoneNumber: "",
    expectedDeliveryDate: "",
    referenceNumber: "",
    category: "",
    amount: "",
    billingDate: "",
    dueDate: "",
    billNumber: "",
  });

  const [patientLoading, setPatientLoading] = useState(true);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ========================
  // BILL SUMMARY STATE
  // ========================
  const [billId, setBillId] = useState(null);
  const [billSummary, setBillSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // ========================
  // WORKFLOW STATE (from upload response only — read-only display here)
  // ========================
  const [currentStage, setCurrentStage] = useState(null);
  const [nextStage, setNextStage] = useState(null);

  // ========================
  // SYSTEM VALIDATION STATE (Stage 1 checks)
  // ========================
  const [validationResults, setValidationResults] = useState({});
  const [validatingType, setValidatingType] = useState(null);

  // ========================
  // FETCH PATIENT IDENTIFICATION -> GET /api/v1/patients/{motherId}
  // ========================
  const fetchPatientDetails = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setPatientLoading(false);
      return;
    }

    if (!motherId) {
      setPatientLoading(false);
      return;
    }

    setPatientLoading(true);
    try {
      const response = await axios.get(`${baseURL}/patients/${motherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const patient = response.data?.data || response.data || {};

      setFormData((prev) => ({
        ...prev,
        fullName: patient.fullName || "",
        maternalId: patient.maternalId || motherId || "",
        phoneNumber: patient.phoneNumber || "",
        expectedDeliveryDate: patient.expectedDeliveryDate || "",
      }));
    } catch (error) {
      console.error("Error fetching patient details:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load patient details",
      );
    } finally {
      setPatientLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [motherId]);

  const handleClose = () => {
    navigate("/dashboard/verifyPatient");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const kb = bytes / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb.toFixed(0)} KB`;
  };

  // ========================
  // RUN A SINGLE SYSTEM VALIDATION (Stage 1)
  // ========================
  const runValidation = async (id, validationType) => {
    if (!token || !id) return;

    setValidatingType(validationType);
    try {
      const response = await axios.post(
        `${baseURL}/bill/${id}/system-validation`,
        { validationType },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const result = response.data?.data || response.data;

      setValidationResults((prev) => ({
        ...prev,
        [validationType]: result,
      }));
    } catch (error) {
      console.error(`Error running ${validationType} validation:`, error);
      setValidationResults((prev) => ({
        ...prev,
        [validationType]: { status: "error" },
      }));
    } finally {
      setValidatingType(null);
    }
  };

  const runAllValidations = async (id) => {
    for (const { key } of VALIDATION_TYPES) {
      await runValidation(id, key);
    }
  };

  // ========================
  // FETCH BILL SUMMARY
  // ========================
  const fetchBillSummary = async (id) => {
    if (!token || !id) return;

    setSummaryLoading(true);
    try {
      const response = await axios.get(`${baseURL}/bill/${id}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { summaryType: "totalAmount" },
      });

      setBillSummary(response.data?.data || null);
    } catch (error) {
      console.error("Error fetching bill summary:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load bill summary",
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  // ========================
  // UPLOAD BILL (Stage 1) -> POST /api/v1/bill/upload
  // ========================
  const handleUpload = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    if (!file) {
      toast.warning("Please attach a billing document.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.maternalId ||
      !formData.phoneNumber ||
      !formData.category ||
      !formData.amount ||
      !formData.billingDate ||
      !formData.dueDate ||
      !formData.billNumber
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("maternalId", formData.maternalId);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("expectedDeliveryDate", formData.expectedDeliveryDate);
      payload.append("referenceNumber", formData.referenceNumber);
      payload.append("category", formData.category);
      payload.append("amount", formData.amount);
      payload.append("billingDate", formData.billingDate);
      payload.append("dueDate", formData.dueDate);
      payload.append("billNumber", formData.billNumber);
      payload.append("documentUpload", file);

      const response = await axios.post(`${baseURL}/bill/upload`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      const resBody = response.data || {};
      const newBill = resBody.data || {};
      const newBillId = newBill?.id || newBill?.billId || newBill?._id || null;

      if (resBody.workflow) {
        setCurrentStage(resBody.workflow.currentStage || null);
        setNextStage(resBody.workflow.nextStage || null);
      }

      toast.success(resBody.message || "Bill uploaded successfully!");

      if (newBillId) {
        setBillId(newBillId);
        fetchBillSummary(newBillId);
        runAllValidations(newBillId);
      } else {
        console.warn(
          "Upload succeeded but no bill ID was found in the response.",
          resBody,
        );
      }
    } catch (error) {
      console.error("Error uploading bill:", error);
      toast.error(error?.response?.data?.message || "Failed to upload bill");
    } finally {
      setUploading(false);
    }
  };

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "₦0.00";
    return `₦ ${Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`;
  };

  // ========================
  // VALIDATION DISPLAY HELPERS
  // ========================
  const getValidationDisplay = (key) => {
    const result = validationResults[key];

    if (validatingType === key) {
      return {
        icon: "⏳",
        badgeClass: "uploaded-new-bill-pending-badge",
        badgeText: "CHECKING",
        itemClass: "pending",
      };
    }

    if (!result) {
      return {
        icon: "○",
        badgeClass: "uploaded-new-bill-pending-badge",
        badgeText: "PENDING",
        itemClass: "pending",
      };
    }

    const status = result.status || result.valid;
    const isValid = status === "valid" || status === true || status === "VALID";

    if (key === "fileUploadedProgress" && result.value !== undefined) {
      return {
        icon: isValid ? "✓" : "⚠️",
        badgeClass: isValid
          ? "uploaded-new-bill-valid-badge"
          : "uploaded-new-bill-error-badge",
        badgeText: `${result.value}%`,
        itemClass: isValid ? "valid" : "error",
      };
    }

    return {
      icon: isValid ? "✓" : "⚠️",
      badgeClass: isValid
        ? "uploaded-new-bill-valid-badge"
        : "uploaded-new-bill-error-badge",
      badgeText: isValid ? "VALID" : "FAILED",
      itemClass: isValid ? "valid" : "error",
    };
  };

  // ========================
  // WORKFLOW STEP STATE HELPER (read-only display)
  // ========================
  const getStepState = (stageKey) => {
    if (!currentStage) {
      return "upcoming";
    }
    if (stageKey === currentStage) return "active";
    if (stageKey === nextStage) return "next";
    const order = WORKFLOW_STAGES.map((s) => s.key);
    const currentIdx = order.indexOf(currentStage);
    const stepIdx = order.indexOf(stageKey);
    return stepIdx < currentIdx ? "done" : "upcoming";
  };

  return (
    <div className="uploaded-new-bill-overlay">
      <ToastContainer />
      <div className="uploaded-new-bill-modal">
        <div className="uploaded-new-bill-header">
          <div>
            <h1 className="uploaded-new-bill-title">Upload New Bill</h1>
            <p className="uploaded-new-bill-subtitle">
              Review the patient and bill details before submitting.
            </p>
          </div>
          <button className="uploaded-new-bill-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className="uploaded-new-bill-container">
          <div className="uploaded-new-bill-main">
            {/* Patient Identification Section -> GET /api/v1/patients/{motherId} */}
            <div className="uploaded-new-bill-card">
              <div className="uploaded-new-bill-section-header">
                <span className="uploaded-new-bill-icon">
                  <MdPersonOutline />
                </span>

                <h2>Patient Identification</h2>
              </div>
              {patientLoading ? (
                <p className="uploaded-new-bill-patient-loading">
                  Loading patient details...
                </p>
              ) : (
                <>
                  <div className="uploaded-new-bill-form-grid-2">
                    <div className="uploaded-new-bill-form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        readOnly
                        className="uploaded-new-bill-readonly-input"
                      />
                    </div>
                    <div className="uploaded-new-bill-form-group">
                      <label>Maternal ID</label>
                      <input
                        type="text"
                        name="maternalId"
                        value={formData.maternalId}
                        readOnly
                        className="uploaded-new-bill-readonly-input"
                      />
                    </div>
                  </div>
                  <div className="uploaded-new-bill-form-grid-2">
                    <div className="uploaded-new-bill-form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        readOnly
                        className="uploaded-new-bill-readonly-input"
                      />
                    </div>
                    <div className="uploaded-new-bill-form-group">
                      <label>Expected Delivery Date (EDD)</label>
                      <input
                        type="text"
                        name="expectedDeliveryDate"
                        value={formData.expectedDeliveryDate}
                        readOnly
                        className="uploaded-new-bill-readonly-input"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bill Details Section */}
            <div className="uploaded-new-bill-card">
              <div className="uploaded-new-bill-section-header">
                <span className="uploaded-new-bill-icon">
                  <GrNotes />
                </span>
                <h2>Bill Details</h2>
              </div>
              <div className="uploaded-new-bill-form-grid-3">
                <div className="uploaded-new-bill-form-group">
                  <label>Bill Number</label>
                  <input
                    type="text"
                    name="billNumber"
                    placeholder="BL-2024-001"
                    value={formData.billNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="uploaded-new-bill-form-group">
                  <label>Reference Number</label>
                  <input
                    type="text"
                    name="referenceNumber"
                    placeholder="INV-2024-001"
                    value={formData.referenceNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="uploaded-new-bill-form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Category</option>
                    <option value="Antenatal Care">Antenatal Care</option>
                    <option value="Delivery Services">Delivery Services</option>
                  </select>
                </div>
              </div>
              <div className="uploaded-new-bill-form-grid-3">
                <div className="uploaded-new-bill-form-group">
                  <label>Amount (₦)</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="uploaded-new-bill-form-group">
                  <label>Billing Date</label>
                  <input
                    type="date"
                    name="billingDate"
                    value={formData.billingDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="uploaded-new-bill-form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="uploaded-new-bill-card">
              <div className="uploaded-new-bill-section-header">
                <span className="uploaded-new-bill-icon">
                  <HiOutlineDocumentArrowUp />
                </span>
                <h2>Document Upload</h2>
              </div>
              <div className="uploaded-new-bill-upload-area">
                <div className="uploaded-new-bill-cloud-icon">
                  <RiUploadCloudLine />
                </div>
                <label className="uploaded-new-bill-upload-text">
                  Drag and drop billing files here or{" "}
                  <span className="uploaded-new-bill-browse-link">browse</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
                <p className="uploaded-new-bill-upload-format">
                  Supported formats: PDF, JPG, PNG (Max 5MB)
                </p>
              </div>
              {file && (
                <div className="uploaded-new-bill-file-item">
                  <div className="uploaded-new-bill-file-icon">📄</div>
                  <div className="uploaded-new-bill-file-info">
                    <p className="uploaded-new-bill-file-name">{file.name}</p>
                    <p className="uploaded-new-bill-file-progress">
                      {uploading
                        ? `Uploading - ${uploadProgress}%`
                        : "Ready to upload"}
                    </p>
                  </div>
                  <div className="uploaded-new-bill-file-size">
                    {formatFileSize(file.size)}
                  </div>
                  <button
                    className="uploaded-new-bill-cancel-btn"
                    onClick={() => setFile(null)}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Additional Notes Section */}
            <div className="uploaded-new-bill-card">
              <div className="uploaded-new-bill-section-header">
                <span className="uploaded-new-bill-icon">
                  <BiMenuAltLeft />
                </span>
                <h2>Additional Notes</h2>
              </div>
              <textarea
                className="uploaded-new-bill-textareas"
                placeholder="Add any clinical context or special billing instructions here..."
                rows="5"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="uploaded-new-bill-action-buttons">
              <button
                className="uploaded-new-bill-btn-cancel"
                onClick={handleClose}
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                className="uploaded-new-bill-btn-upload"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="uploaded-new-bill-sidebar">
            {/* Verification Workflow - read-only progress display only */}
            <div className="uploaded-new-bill-card uploaded-new-bill-sidebar-card">
              <h3 className="uploaded-new-bill-sidebar-title">
                Verification Workflow
              </h3>
              <div className="uploaded-new-bill-workflow-steps">
                {WORKFLOW_STAGES.map((stage, idx) => {
                  const state = getStepState(stage.key);
                  return (
                    <div
                      key={stage.key}
                      className={`uploaded-new-bill-workflow-step ${
                        state === "active" || state === "done" ? "active" : ""
                      }`}
                    >
                      <div className="uploaded-new-bill-step-circle">
                        {state === "done" || state === "active" ? "✓" : idx + 1}
                      </div>
                      <div className="uploaded-new-bill-step-content">
                        <p className="uploaded-new-bill-step-title">
                          {stage.title}
                        </p>
                        <p className="uploaded-new-bill-step-subtitle">
                          {stage.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {billId && currentStage && (
                <p className="uploaded-new-bill-workflow-note">
                  {currentStage === "uploadedBill"
                    ? "Awaiting the mother's approval on her end."
                    : currentStage === "customerReview"
                      ? "Approved by mother — awaiting admin fund validation."
                      : currentStage === "fundValidation"
                        ? "Funds validated — awaiting final admin approval."
                        : "Bill fully processed."}
                </p>
              )}
            </div>

            {/* System Validation (Stage 1 checks only) */}
            <div className="uploaded-new-bill-card uploaded-new-bill-sidebar-card">
              <h3 className="uploaded-new-bill-sidebar-title">
                System Validation
              </h3>
              <div className="uploaded-new-bill-validation-items">
                {VALIDATION_TYPES.map(({ key, label }) => {
                  const display = getValidationDisplay(key);
                  return (
                    <div
                      key={key}
                      className={`uploaded-new-bill-validation-item ${display.itemClass}`}
                    >
                      <div className="uploaded-new-bill-validation-icon">
                        {display.icon}
                      </div>
                      <div className="uploaded-new-bill-validation-content">
                        <p className="uploaded-new-bill-validation-label">
                          {label}
                        </p>
                      </div>
                      <span
                        className={`uploaded-new-bill-validation-badge ${display.badgeClass}`}
                      >
                        {display.badgeText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="uploaded-new-bill-card uploaded-new-bill-sidebar-card">
              <h3 className="uploaded-new-bill-sidebar-title">Bill Summary</h3>
              {!billId ? (
                <p className="uploaded-new-bill-summary-placeholder">
                  Summary will appear here after the bill is uploaded.
                </p>
              ) : summaryLoading ? (
                <p className="uploaded-new-bill-summary-placeholder">
                  Loading summary...
                </p>
              ) : (
                <div className="uploaded-new-bill-summary-items">
                  <div className="uploaded-new-bill-summary-item">
                    <span className="uploaded-new-bill-summary-label">
                      Patient Name
                    </span>
                    <span className="uploaded-new-bill-summary-value">
                      {billSummary?.patienceName || formData.fullName}
                    </span>
                  </div>
                  <div className="uploaded-new-bill-summary-item">
                    <span className="uploaded-new-bill-summary-label">
                      Category
                    </span>
                    <span className="uploaded-new-bill-summary-value">
                      {billSummary?.category || formData.category}
                    </span>
                  </div>
                  <div className="uploaded-new-bill-summary-item">
                    <span className="uploaded-new-bill-summary-label">
                      Date
                    </span>
                    <span className="uploaded-new-bill-summary-value">
                      {billSummary?.date || formData.billingDate}
                    </span>
                  </div>
                  <div className="uploaded-new-bill-summary-item total">
                    <span className="uploaded-new-bill-summary-label">
                      Total Amount
                    </span>
                    <span className="uploaded-new-bill-summary-value total-value">
                      {formatAmount(
                        billSummary?.totalAmount || formData.amount,
                      )}
                    </span>
                  </div>
                  <div className="uploaded-new-bill-summary-item status">
                    <span className="uploaded-new-bill-summary-label">
                      Status
                    </span>
                    <span className="uploaded-new-bill-summary-value status-value">
                      {currentStage === "fundValidation"
                        ? "Funds Validated"
                        : currentStage === "customerReview"
                          ? "In Customer Review"
                          : currentStage === "uploadedBill"
                            ? "Pending Mother's Approval"
                            : "Pending Submission"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedNewBill;