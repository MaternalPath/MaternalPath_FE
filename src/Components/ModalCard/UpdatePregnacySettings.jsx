import { useEffect, useState } from "react";
import "./ModalCard.css";
import { IoPersonCircleOutline } from "react-icons/io5";

const PHONE_REGEX = /^[1-9]\d{9}$/;
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const hasValue = (val) =>
  val !== undefined && val !== null && String(val).trim() !== "";
const stripPhone = (val) => String(val || "").replace(/\D/g, "");

const toLocalPhone = (raw) => {
  const digits = stripPhone(raw);
  if (digits.startsWith("234")) return digits.slice(3);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const fromState = (data) => ({
  dueDate: data?.estimatedDueDate || "",
  currentWeek: data?.currentPregnancyWeek ?? "",
  trimester:
    typeof data?.trimester === "number"
      ? data.trimester
      : data?.trimester
        ? Number(data.trimester) || ""
        : "",
  emergencyName: data?.emergencyContactName || "",
  emergencyContact: data?.emergencyContact || "",
  bloodType: data?.bloodType || "",
  allergies: data?.allergies || "",
  conditions: data?.existingHealthConditions || "",
});

const validateField = (field, value) => {
  switch (field) {
    case "dueDate": {
      if (!value) return "Due date is required";
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const max = new Date();
      max.setMonth(max.getMonth() + 10);
      if (selected < today) return "Due date cannot be in the past";
      if (selected > max) return "Due date cannot be more than 10 months out";
      return "";
    }
    case "currentWeek": {
      if (value === "" || value === null) return "Current week is required";
      const num = Number(value);
      if (!Number.isFinite(num)) return "Enter a valid number";
      if (num < 1 || num > 42) return "Week must be between 1 and 42";
      return "";
    }
    case "trimester":
      if (![1, 2, 3].includes(Number(value))) return "Select a trimester";
      return "";
    case "emergencyName":
      if (!hasValue(value)) return "Emergency contact name is required";
      if (value.trim().length < 2) return "Must be at least 2 characters";
      return "";
    case "emergencyContact": {
      const local = toLocalPhone(value);
      if (!local) return "Emergency contact is required";
      if (!PHONE_REGEX.test(local))
        return "Phone must be 10 digits (e.g. 8012345678)";
      return "";
    }
    case "bloodType":
      if (!value) return "Blood type is required";
      return "";
    default:
      return "";
  }
};

const REQUIRED_FIELDS = [
  "dueDate",
  "currentWeek",
  "trimester",
  "emergencyName",
  "emergencyContact",
  "bloodType",
];

const UpdatePregnancyModal = ({
  isOpen,
  onClose,
  onNext,
  onPrevious,
  data,
  updateFields,
}) => {
  const [formData, setFormData] = useState(() => fromState(data));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData(fromState(data));
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhoneChange = (value) =>
    handleChange("emergencyContact", stripPhone(value));

  const handleBlur = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const isValid = REQUIRED_FIELDS.every(
    (f) => !validateField(f, formData[f]),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    REQUIRED_FIELDS.forEach((f) => {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      estimatedDueDate: formData.dueDate,
      currentPregnancyWeek: formData.currentWeek
        ? Number(formData.currentWeek)
        : "",
      trimester: formData.trimester ? Number(formData.trimester) : "",
      emergencyContactName: formData.emergencyName.trim(),
      emergencyContact: toLocalPhone(formData.emergencyContact),
      bloodType: formData.bloodType,
      allergies: formData.allergies.trim(),
      existingHealthConditions: formData.conditions.trim(),
    };

    updateFields(payload);
    onNext();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container scrollable-modal">
        <div className="modal-header">
          <h2>Update Pregnancy Information</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="dueDate">Estimated Due Date</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  onBlur={(e) => handleBlur("dueDate", e.target.value)}
                  className={errors.dueDate ? "input-error" : ""}
                />
              </div>
              {errors.dueDate && (
                <span className="error-message">{errors.dueDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="currentWeek">Current Week</label>
              <input
                type="number"
                id="currentWeek"
                min="1"
                max="42"
                value={formData.currentWeek}
                onChange={(e) => handleChange("currentWeek", e.target.value)}
                onBlur={(e) => handleBlur("currentWeek", e.target.value)}
                placeholder="e.g. 24"
                className={errors.currentWeek ? "input-error" : ""}
              />
              {errors.currentWeek && (
                <span className="error-message">{errors.currentWeek}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="trimester">Current Trimester</label>
              <select
                id="trimester"
                value={formData.trimester}
                onChange={(e) => handleChange("trimester", e.target.value)}
                onBlur={(e) => handleBlur("trimester", e.target.value)}
                className={errors.trimester ? "input-error" : ""}
              >
                <option value="">Select trimester</option>
                <option value={1}>First Trimester</option>
                <option value={2}>Second Trimester</option>
                <option value={3}>Third Trimester</option>
              </select>
              {errors.trimester && (
                <span className="error-message">{errors.trimester}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="emergencyName">Emergency Contact Name</label>
              <div className="input-with-icon">
                <IoPersonCircleOutline className="field-icon" size={18} color="#a0abaa" />
                <input
                  type="text"
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => handleChange("emergencyName", e.target.value)}
                  onBlur={(e) => handleBlur("emergencyName", e.target.value)}
                  placeholder="Full name"
                  className={errors.emergencyName ? "input-error" : ""}
                />
              </div>
              {errors.emergencyName && (
                <span className="error-message">{errors.emergencyName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact Number</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <input
                  type="tel"
                  id="emergencyContact"
                  inputMode="numeric"
                  maxLength={13}
                  value={formData.emergencyContact}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={(e) => handleBlur("emergencyContact", e.target.value)}
                  placeholder="8012345678"
                  className={errors.emergencyContact ? "input-error" : ""}
                />
              </div>
              {errors.emergencyContact && (
                <span className="error-message">{errors.emergencyContact}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="bloodType">Blood Type</label>
              <select
                id="bloodType"
                value={formData.bloodType}
                onChange={(e) => handleChange("bloodType", e.target.value)}
                onBlur={(e) => handleBlur("bloodType", e.target.value)}
                className={errors.bloodType ? "input-error" : ""}
              >
                <option value="">Select blood type</option>
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
              {errors.bloodType && (
                <span className="error-message">{errors.bloodType}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="allergies">Known Allergies</label>
              <input
                type="text"
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleChange("allergies", e.target.value)}
                placeholder="e.g. Penicillin (leave blank if none)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="conditions">Existing Health Conditions</label>
              <textarea
                id="conditions"
                value={formData.conditions}
                onChange={(e) => handleChange("conditions", e.target.value)}
                rows="3"
                placeholder="List any existing conditions"
              />
            </div>
          </div>

          <div className="dual-btn-container">
            <button type="button" className="previous-btn" onClick={onPrevious}>
              Previous
            </button>
            <button type="submit" className="submit-btn" disabled={!isValid}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePregnancyModal;
