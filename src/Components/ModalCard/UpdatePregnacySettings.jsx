import { useEffect, useState } from "react";
import "./ModalCard.css";
import { IoPersonCircleOutline } from "react-icons/io5";

const PHONE_REGEX = /^[1-9]\d{9}$/;
const BLOOD_TYPES = ["A+", "A-", "B+", "AB+", "AB-", "O+", "O-"];

const hasValue = (val) =>
  val !== undefined && val !== null && String(val).trim() !== "";
const stripPhone = (val) => String(val || "").replace(/\D/g, "");

const toLocalPhone = (raw) => {
  const digits = stripPhone(raw);
  if (digits.startsWith("234")) return digits.slice(3);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
};

// Parse date string as local time to avoid UTC offset bug
const toLocalDate = (dateStr) => {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d); // local timezone, not UTC
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

// 🆕 FIXED: Calculate from LMP = Due date - 280 days. Uses Math.floor
const getExpectedPregnancyWeek = (dueDate) => {
  const due = toLocalDate(dueDate);
  if (!due || Number.isNaN(due.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  // LMP = Due date - 40 weeks = 280 days
  const lmp = new Date(due);
  lmp.setDate(lmp.getDate() - 280);

  const diffDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 1; // not pregnant yet
  if (diffDays > 294) return 42; // past 42 weeks

  const currentWeek = Math.floor(diffDays / 7) + 1; // day 0-6 = week 1
  return Math.max(1, Math.min(42, currentWeek));
};

const getPregnancyWeekMismatchError = (dueDate, currentWeek) => {
  if (!dueDate || currentWeek === "" || currentWeek === null) return "";
  const expectedWeek = getExpectedPregnancyWeek(dueDate);
  const numWeek = Number(currentWeek);
  if (!Number.isFinite(numWeek) || expectedWeek === null) return "";
  if (Math.abs(numWeek - expectedWeek) > 1) {
    return `Current week does not match the selected due date. Expected around week ${expectedWeek}.`;
  }
  return "";
};

const weekToTrimester = (week) => {
  const n = Number(week);
  if (!Number.isFinite(n)) return null;
  if (n >= 1 && n <= 13) return 1;
  if (n >= 14 && n <= 27) return 2;
  if (n >= 28) return 3;
  return null;
};

const validateField = (field, value, formData = {}) => {
  switch (field) {
    case "dueDate": {
      if (!value) return "Due date is required";
      const selected = toLocalDate(value);
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
    case "allergies":
      if (!value || value.trim() === "")
        return "Allergies are required (enter 'None' if none)";
      return "";
    case "conditions":
      if (!value || value.trim() === "")
        return "Existing health conditions are required (enter 'None' if none)";
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
  "allergies",
  "conditions",
];

// 🆕 FIXED: LMP-based calculation + returns days too
const calculateWeekAndTrimesterFromDueDate = (dueDate) => {
  if (!dueDate) return { week: "", trimester: "" };

  const due = toLocalDate(dueDate);
  if (!due || Number.isNaN(due.getTime())) return { week: "", trimester: "" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const lmp = new Date(due);
  lmp.setDate(lmp.getDate() - 280);

  const diffDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { week: 1, trimester: 1 };
  if (diffDays > 294) return { week: 42, trimester: 3 };

  const currentWeek = Math.floor(diffDays / 7) + 1;
  const days = diffDays % 7;

  let trimester = "";
  if (currentWeek <= 13) trimester = 1;
  else if (currentWeek <= 27) trimester = 2;
  else trimester = 3;

  return { week: currentWeek, trimester, days };
};

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
  }, [isOpen]);

  if (!isOpen) return null;

  const getPregnancyFieldErrors = (form) => {
    const nextErrors = {};
    const dueDateError = validateField("dueDate", form.dueDate);
    const currentWeekError = validateField("currentWeek", form.currentWeek);

    if (dueDateError) nextErrors.dueDate = dueDateError;
    if (currentWeekError) nextErrors.currentWeek = currentWeekError;

    if (!dueDateError && !currentWeekError) {
      const mismatch = getPregnancyWeekMismatchError(
        form.dueDate,
        form.currentWeek,
      );
      if (mismatch) {
        nextErrors.dueDate = mismatch;
        nextErrors.currentWeek = mismatch;
      }
    }

    return nextErrors;
  };

  const handleChange = (field, value) => {
    const nextFormData = { ...formData, [field]: value };

    if (field === "dueDate") {
      const { week, trimester } = calculateWeekAndTrimesterFromDueDate(value);
      nextFormData.currentWeek = week;
      nextFormData.trimester = trimester;

      setErrors((prev) => ({
        ...prev,
        currentWeek: "",
        trimester: "",
        dueDate: "",
      }));
    }

    if (field === "dueDate" || field === "currentWeek") {
      const pregnancyErrors = getPregnancyFieldErrors(nextFormData);
      setErrors((prev) => ({
        ...prev,
        dueDate: pregnancyErrors.dueDate || "",
        currentWeek: pregnancyErrors.currentWeek || "",
      }));
    } else {
      const error = validateField(field, value, nextFormData);
      setErrors((prev) => ({ ...prev, [field]: error || "" }));
    }

    setFormData(nextFormData);
  };

  const handlePhoneChange = (value) =>
    handleChange("emergencyContact", stripPhone(value));

  const handleBlur = (field, value) => {
    if (field === "dueDate" || field === "currentWeek") {
      const nextFormData = { ...formData, [field]: value };
      const pregnancyErrors = getPregnancyFieldErrors(nextFormData);
      setErrors((prev) => ({
        ...prev,
        dueDate: pregnancyErrors.dueDate || "",
        currentWeek: pregnancyErrors.currentWeek || "",
      }));
    } else {
      const error = validateField(field, value, formData);
      setErrors((prev) => ({ ...prev, [field]: error || "" }));
    }
  };

  const isValid =
    REQUIRED_FIELDS.every((field) => {
      const error = validateField(field, formData[field], formData);
      return !error;
    }) &&
    !getPregnancyWeekMismatchError(formData.dueDate, formData.currentWeek) &&
    (() => {
      const expected = weekToTrimester(formData.currentWeek);
      if (expected === null) return true;
      if (!formData.trimester) return true;
      return Number(formData.trimester) === expected;
    })();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    REQUIRED_FIELDS.forEach((f) => {
      const err = validateField(f, formData[f], formData);
      if (err) newErrors[f] = err;
    });

    const mismatch = getPregnancyWeekMismatchError(
      formData.dueDate,
      formData.currentWeek,
    );
    if (mismatch) {
      newErrors.dueDate = mismatch;
      newErrors.currentWeek = mismatch;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

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
    <div className="modals-overlay">
      <div className="modals-container scrollable-modal">
        <div className="modal-header">
          <h2>Update Pregnancy Information</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
                <svg
                  className="field-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a0abaa"
                  strokeWidth="2"
                >
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
                disabled
                placeholder="Auto-calculated from due date"
                className={errors.currentWeek ? "input-error" : ""}
                style={{
                  backgroundColor: "#f5f5f5",
                  cursor: "not-allowed",
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              />
              {errors.currentWeek && (
                <span className="error-message">{errors.currentWeek}</span>
              )}
              <small style={{ color: "#888", fontSize: "12px" }}>
                Auto-calculated based on due date
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="trimester">Current Trimester</label>
              <select
                id="trimester"
                value={formData.trimester}
                disabled
                className={errors.trimester ? "input-error" : ""}
                style={{
                  backgroundColor: "#f5f5f5",
                  cursor: "not-allowed",
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              >
                <option value="">Auto-calculated</option>
                <option value={1}>First Trimester</option>
                <option value={2}>Second Trimester</option>
                <option value={3}>Third Trimester</option>
              </select>
              {errors.trimester && (
                <span className="error-message">{errors.trimester}</span>
              )}
              <small style={{ color: "#888", fontSize: "12px" }}>
                Auto-calculated based on current week
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="emergencyName">Emergency Contact Name</label>
              <div className="input-with-icon">
                <IoPersonCircleOutline
                  className="field-icon"
                  size={18}
                  color="#a0abaa"
                />
                <input
                  type="text"
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) =>
                    handleChange("emergencyName", e.target.value)
                  }
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
              <div className="input-with-prefix">
                <span className="input-prefix">+234</span>
                <input
                  type="tel"
                  id="emergencyContact"
                  inputMode="numeric"
                  maxLength={10}
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
                onBlur={(e) => handleBlur("allergies", e.target.value)}
                placeholder="e.g. Penicillin or None"
                className={errors.allergies ? "input-error" : ""}
              />
              {errors.allergies && (
                <span className="error-message">{errors.allergies}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="conditions">Existing Health Conditions</label>
              <textarea
                id="conditions"
                value={formData.conditions}
                onChange={(e) => handleChange("conditions", e.target.value)}
                onBlur={(e) => handleBlur("conditions", e.target.value)}
                rows="3"
                placeholder="List any existing conditions or enter None"
                className={errors.conditions ? "input-error" : ""}
              />
              {errors.conditions && (
                <span className="error-message">{errors.conditions}</span>
              )}
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
