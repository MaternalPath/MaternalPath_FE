import { useRef, useState } from "react";
import "./ModalCard.css";

const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "image/webp",
];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const hasValue = (val) =>
  val !== undefined && val !== null && String(val).trim() !== "";

const getAge = (value) => {
  const dob = new Date(value);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }
  return age;
};

const validateField = (field, value) => {
  switch (field) {
    case "firstName":
    case "lastName":
      if (!hasValue(value)) return "This field is required";
      if (value.trim().length < 2) return "Must be at least 2 characters";
      return "";
    case "dateOfBirth":
      if (!value) return "Date of birth is required";
      if (new Date(value) > new Date())
        return "Date of birth cannot be in the future";
      if (getAge(value) < 18)
        return "You must be at least 18 years old to use this app";
      return "";
    case "address":
      if (!hasValue(value)) return "Address is required";
      return "";
    default:
      return "";
  }
};

const FIELDS = ["firstName", "lastName", "dateOfBirth", "address"];

const EditProfileModal = ({
  isOpen,
  onClose,
  onNext,
  data,
  updateFields,
}) => {
  const fileInputRef = useRef(null);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    updateFields({ [id]: value });
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleBlur = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, data?.[field]),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setImageError("Please upload a JPEG, PNG, GIF, or WEBP image");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image must be smaller than 5MB");
      return;
    }

    setImageError("");
    updateFields({
      imageFile: file,
      profilePicture: URL.createObjectURL(file),
    });
  };

  const hasImage = data?.imageFile instanceof File || hasValue(data?.profilePicture);
  const isValid = hasImage && FIELDS.every((f) => !validateField(f, data?.[f]));
  const maxDateForDob = new Date();
  maxDateForDob.setFullYear(maxDateForDob.getFullYear() - 18);

  const handleNext = () => {
    const newErrors = {};
    FIELDS.forEach((f) => {
      const err = validateField(f, data?.[f]);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);

    if (!hasImage) {
      setImageError("Please upload a profile picture to continue");
      if (Object.keys(newErrors).length > 0) return;
      return;
    }

    if (Object.keys(newErrors).length > 0) return;
    onNext();
  };

  return (
    <div className="modals-overlay">
      <div className="modals-container scrollable-modal">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="avatar-container">
          <div className="avatar-circle">
            {data?.profilePicture ? (
              <img src={data.profilePicture} alt="Profile" className="avatar-image" />
            ) : (
              <svg className="avatar-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#7a8b8b" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
            <button
              type="button"
              className="edit-avatar-btn"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile photo"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          {imageError && <span className="error-message">{imageError}</span>}
          <p className="upload-hint">Tap the camera to upload a profile picture</p>
        </div>

        <form className="modal-form" onSubmit={(e) => e.preventDefault()}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={data?.firstName || ""}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName")}
                placeholder="Enter first name"
                className={errors.firstName ? "input-error" : ""}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={data?.lastName || ""}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
                placeholder="Enter last name"
                className={errors.lastName ? "input-error" : ""}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={data?.dateOfBirth || ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur("dateOfBirth")}
                  max={maxDateForDob.toISOString().split("T")[0]}
                  className={errors.dateOfBirth ? "input-error" : ""}
                />
              </div>
              {errors.dateOfBirth && (
                <span className="error-message">{errors.dateOfBirth}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Residential Address</label>
              <div className="input-with-icon">
                <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0abaa" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <input
                  type="text"
                  id="address"
                  value={data?.address || ""}
                  onChange={handleChange}
                  onBlur={() => handleBlur("address")}
                  placeholder="Enter your residential address"
                  className={errors.address ? "input-error" : ""}
                />
              </div>
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>
          </div>

          <button
            type="button"
            className="submit-btn"
            onClick={handleNext}
            disabled={!isValid}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
