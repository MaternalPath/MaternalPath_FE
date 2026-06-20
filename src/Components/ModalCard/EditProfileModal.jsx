import { useState } from "react";
import "./ModalCard.css";

const PHONE_REGEX = /^[1-9]\d{9}$/;

const stripPhone = (val) => String(val || "").replace(/\D/g, "");

const toLocalPhone = (raw) => {
  const digits = stripPhone(raw);
  if (digits.startsWith("234")) return digits.slice(3);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const validateField = (field, value) => {
  if (field === "phoneNumber") {
    const local = toLocalPhone(value);
    if (!local) return "Phone number is required";
    if (!PHONE_REGEX.test(local))
      return "Phone must be 10 digits (e.g. 8012345678)";
    return "";
  }
  return "";
};

const EditPersonalInformationModal = ({
  isOpen,
  onClose,
  onNext,
  onPrevious,
  data,
  updateFields,
}) => {
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    updateFields({ phoneNumber: stripPhone(e.target.value) });
    if (errors.phoneNumber)
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
  };

  const handleBlur = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, data?.[field]),
    }));
  };

  const isValid = !validateField("phoneNumber", data?.phoneNumber);

  const handleNext = () => {
    const err = validateField("phoneNumber", data?.phoneNumber);
    setErrors(err ? { phoneNumber: err } : {});
    if (err) return;

    const local = toLocalPhone(data?.phoneNumber);
    if (local !== data?.phoneNumber) updateFields({ phoneNumber: local });
    onNext();
  };

  return (
    <div className="modals-overlay">
      <div className="modals-container scrollable-modal">
        <div className="modal-header">
          <h2>Contact Information</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  id="email"
                  value={data?.email || ""}
                  readOnly
                  className="readonly-input"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="input-with-prefix">
                <span className="input-prefix">+234</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  inputMode="numeric"
                  maxLength={10}
                  value={data?.phoneNumber || ""}
                  onChange={handlePhoneChange}
                  onBlur={() => handleBlur("phoneNumber")}
                  placeholder="8012345678"
                  className={errors.phoneNumber ? "input-error" : ""}
                />
              </div>
              {errors.phoneNumber && (
                <span className="error-message">{errors.phoneNumber}</span>
              )}
            </div>
          </div>

          <div className="dual-btn-container">
            <button type="button" className="previous-btn" onClick={onPrevious}>
              Previous
            </button>
            <button
              type="button"
              className="submit-btn"
              onClick={handleNext}
              disabled={!isValid}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPersonalInformationModal;
