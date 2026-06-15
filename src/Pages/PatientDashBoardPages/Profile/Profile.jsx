import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRole } from "../../../context/RoleContext";
import "./Profile.css";
import ProfileHeaderCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/ProfileHeaderCard";
import PersonalInfoCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/PersonalInfoCard";
import PregnancyInfoCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/PregnancyInfoCard";
import PreferredHospitalCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/PreferredHospitalCard";
import EmergencyWalletCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/EmergencyWalletCard";
import NotificationPreferencesCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/NotificationPreferencesCard";
import SecurityAccountCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/SecurityAccountCard";
import Modal from "../../../Components/UI/Modal";

const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const normalizeDateInput = (value) => {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
};

const formatNaira = (amount) => {
  if (typeof amount !== "number") return "";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
};

const pickHospitalId = (hospital) =>
  hospital?.hospitalId ||
  hospital?._id ||
  hospital?.id ||
  hospital?.hospitalName ||
  "";

const resolveMediaUrl = (value) => {
  if (!value) return "";
  if (/^(https?:|blob:|data:)/i.test(value)) return value;
  if (!baseURL) return value;
  const cleanedBase = baseURL.replace(/\/+$/, "");
  const cleanedValue = String(value).replace(/^\/+/, "");
  return `${cleanedBase}/${cleanedValue}`;
};

const mapMotherProfileResponse = (raw = {}) => {
  const user = raw?.data?.data || raw?.data || {};
  const mom = raw?.mom || raw?.data?.mom || {};

  return {
    ...user,
    ...mom,
    hospitalId:
      mom?.hospitalId || user?.hospitalId || user?.preferredHospitalId || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || mom?.hospitalContact || "",
    address: mom?.address || user?.address || "",
    dateOfBirth: mom?.dateOfBirth || user?.dateOfBirth || "",
    estimatedDueDate:
      mom?.estimatedDueDate || user?.estimatedDueDate || user?.dueDate || "",
    trimester: Number(mom?.trimester || user?.trimester || 0) || "",
    bloodType: mom?.bloodType || "",
    existingHealthConditions: mom?.existingHealthConditions || "",
    currentPregnancyWeek:
      Number(mom?.currentPregnancyWeek || user?.currentPregnancyWeek || 0) || 0,
    emergencyContact: mom?.emergencyContact || "",
    allergies: mom?.allergies || "",
    savingsGoalAmount:
      Number(mom?.savingsGoalAmount || user?.savingsGoalAmount || 0) || 0,
    weeklyContribution:
      Number(mom?.weeklyContribution || user?.weeklyContribution || 0) || 0,
    linkedPaymentMethod:
      mom?.linkedPaymentMethod || user?.linkedPaymentMethod || "",
    preferredHospital:
      mom?.selectedHospital ||
      mom?.preferredHospital ||
      user?.preferredHospital ||
      "",
    hospitalAddress: mom?.hospitalAddress || user?.hospitalAddress || "",
    hospitalContact: mom?.hospitalContact || user?.hospitalContact || "",
    estimatedDeliveryCost:
      Number(mom?.estimatedDeliveryCost || user?.estimatedDeliveryCost || 0) ||
      0,
    profilePicture: resolveMediaUrl(mom?.image || user?.profilePicture || ""),
    name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
    dueDate: mom?.estimatedDueDate || user?.dueDate || "",
    week: mom?.currentPregnancyWeek ? `Week ${mom.currentPregnancyWeek}` : "",
    hospital:
      mom?.selectedHospital ||
      mom?.preferredHospital ||
      user?.preferredHospital ||
      "",
  };
};

const getModalTitle = (card) => {
  if (card === "personal") return "Update Personal Information";
  if (card === "pregnancy") return "Update Pregnancy Information";
  if (card === "hospital") return "Choose Preferred Hospital";
  if (card === "wallet") return "Edit Emergency Wallet";
  if (card === "header") return "Edit Profile";
  return "Edit";
};

const trimValue = (value) => (typeof value === "string" ? value.trim() : value);

const isFilled = (value) => {
  if (typeof value === "number") return Number.isFinite(value);
  if (typeof value === "string") return value.trim().length > 0;
  return Boolean(value);
};

const toUpdateFormData = (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;
    if (key === "image" && value instanceof File) {
      formData.append(key, value);
      return;
    }
    formData.append(key, String(value));
  });
  return formData;
};

const isProfileComplete = (data) => {
  const requiredFields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
    "dateOfBirth",
    "estimatedDueDate",
    "bloodType",
    "existingHealthConditions",
    "emergencyContact",
    "allergies",
    "linkedPaymentMethod",
  ];

  const allRequiredPresent = requiredFields.every((field) =>
    isFilled(data?.[field]),
  );
  const trimesterValid = [1, 2, 3].includes(Number(data?.trimester));
  const weekValid = Number.isFinite(Number(data?.currentPregnancyWeek));
  const savingsValid = Number.isFinite(Number(data?.savingsGoalAmount));
  const weeklyValid = Number.isFinite(Number(data?.weeklyContribution));
  const hospitalIdPresent = isFilled(data?.hospitalId);

  return (
    allRequiredPresent &&
    trimesterValid &&
    weekValid &&
    savingsValid &&
    weeklyValid &&
    hospitalIdPresent
  );
};

const buildInitialDraft = (data = {}) => ({
  image: null,
  firstName: data?.firstName || "",
  lastName: data?.lastName || "",
  phoneNumber: data?.phoneNumber || "",
  address: data?.address || "",
  dateOfBirth: normalizeDateInput(data?.dateOfBirth),
  estimatedDueDate: normalizeDateInput(data?.estimatedDueDate || data?.dueDate),
  trimester: Number(data?.trimester) || 2,
  bloodType: data?.bloodType || "",
  existingHealthConditions: data?.existingHealthConditions || "",
  currentPregnancyWeek: Number(data?.currentPregnancyWeek || data?.week) || 0,
  emergencyContact: data?.emergencyContact || "",
  allergies: data?.allergies || "",
  savingsGoalAmount: Number(data?.savingsGoalAmount) || 0,
  weeklyContribution: Number(data?.weeklyContribution) || 0,
  linkedPaymentMethod: data?.linkedPaymentMethod || "",
  hospitalId: data?.hospitalId || data?.preferredHospitalId || "",
  preferredHospital: data?.preferredHospital || "",
  hospitalContact: data?.hospitalContact || "",
  hospitalAddress: data?.hospitalAddress || "",
  estimatedDeliveryCost:
    Number(data?.estimatedDeliveryCost || data?.deliveryFee) || 0,
  email: data?.email || "",
  profilePreview: data?.profilePicture || resolveMediaUrl(data?.image) || "",
});

const Profile = () => {
  const { role: defaultRole } = useRole();
  const [userType] = useState(defaultRole || "mother");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(null);
  const [modalValues, setModalValues] = useState({});
  const [draftProfile, setDraftProfile] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [isHospitalsLoading, setIsHospitalsLoading] = useState(false);
  const [hospitalSearch, setHospitalSearch] = useState("");

  const loadProfile = useCallback(async () => {
    if (!baseURL) return;
    const endpoint =
      userType === "mother" ? "mother/get-mother" : "hospital/get-hospital";
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURL}/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data =
        userType === "mother"
          ? mapMotherProfileResponse(response.data)
          : response.data?.data?.data || response.data?.data || {};
      setProfileData(data);
      setDraftProfile((prev) => ({
        ...buildInitialDraft(data),
        image: prev?.image || null,
      }));
    } catch (err) {
      console.error(err);
      toast.error("Unable to load profile");
    } finally {
      setIsLoading(false);
    }
  }, [userType]);

  useEffect(() => {
    Promise.resolve().then(() => {
      loadProfile();
    });
  }, [loadProfile]);

  const loadHospitals = useCallback(async () => {
    if (!baseURL || userType !== "mother") return;
    const token = localStorage.getItem("token");
    try {
      setIsHospitalsLoading(true);
      const response = await axios.get(`${baseURL}/mother/getHospitals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const hospitalData =
        response.data?.hospitals ||
        response.data?.data?.hospitals ||
        response.data?.data ||
        [];
      setHospitals(Array.isArray(hospitalData) ? hospitalData : []);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load hospitals");
      setHospitals([]);
    } finally {
      setIsHospitalsLoading(false);
    }
  }, [userType]);

  useEffect(() => {
    if (!modalOpen || modalCard !== "hospital") return;
    Promise.resolve().then(() => {
      loadHospitals();
    });
  }, [modalCard, modalOpen, loadHospitals]);

  const openModalFor = (card) => {
    setModalCard(card);
    const source = {
      ...buildInitialDraft(profileData || {}),
      ...(draftProfile || {}),
    };

    if (card === "personal") {
      setModalValues({
        firstName: source?.firstName || "",
        lastName: source?.lastName || "",
        email: source?.email || "",
        phoneNumber: source?.phoneNumber || "",
        address: source?.address || "",
        dateOfBirth: source?.dateOfBirth || "",
      });
    } else if (card === "pregnancy") {
      setModalValues({
        estimatedDueDate: source?.estimatedDueDate || "",
        currentPregnancyWeek: source?.currentPregnancyWeek || 0,
        trimester: source?.trimester || 2,
        emergencyContact: source?.emergencyContact || "",
        bloodType: source?.bloodType || "",
        allergies: source?.allergies || "",
        existingHealthConditions: source?.existingHealthConditions || "",
      });
    } else if (card === "hospital") {
      setModalValues({
        hospitalId: source?.hospitalId || "",
        preferredHospital: source?.preferredHospital || "",
        hospitalContact: source?.hospitalContact || "",
        hospitalAddress: source?.hospitalAddress || "",
        estimatedDeliveryCost: source?.estimatedDeliveryCost || 0,
      });
      setHospitalSearch("");
    } else if (card === "wallet") {
      setModalValues({
        savingsGoalAmount: source?.savingsGoalAmount || 0,
        weeklyContribution: source?.weeklyContribution || 0,
        linkedPaymentMethod: source?.linkedPaymentMethod || "",
      });
    } else if (card === "header") {
      setModalValues({
        fullName: `${source?.firstName || ""} ${source?.lastName || ""}`.trim(),
        estimatedDueDate: source?.estimatedDueDate || "",
        preferredHospital: source?.preferredHospital || "",
        image: source?.image || null,
        profilePreview: source?.profilePreview || "",
      });
    }
    setModalOpen(true);
  };

  const handleModalChange = (field, value) => {
    setModalValues((p) => ({ ...p, [field]: value }));
  };

  const handleModalSave = async () => {
    if (!baseURL) {
      toast.error("Profile service not configured");
      return;
    }

    if (modalCard === "header") {
      if (!modalValues.fullName?.trim()) {
        toast.error("Full name is required");
        return;
      }

      if (!modalValues.estimatedDueDate) {
        toast.error("Due date is required");
        return;
      }

      if (!modalValues.preferredHospital?.trim()) {
        toast.error("Preferred hospital is required");
        return;
      }
    }
    const fullName = trimValue(modalValues?.fullName || "");
    const [firstFromHeader, ...restFromHeader] = fullName.split(" ");
    const headerPatch =
      modalCard === "header"
        ? {
            firstName: firstFromHeader || "",
            lastName: restFromHeader.join(" ") || "",
            estimatedDueDate: modalValues?.estimatedDueDate || "",
            preferredHospital: modalValues?.preferredHospital || "",
            ...(modalValues?.image ? { image: modalValues.image } : {}),
            ...(modalValues?.profilePreview
              ? { profilePreview: modalValues.profilePreview }
              : {}),
          }
        : {};

    const mergedDraft = {
      ...draftProfile,
      ...modalValues,
      ...headerPatch,
      trimester: Number(modalValues?.trimester ?? draftProfile?.trimester ?? 0),
      currentPregnancyWeek: Number(
        modalValues?.currentPregnancyWeek ??
          draftProfile?.currentPregnancyWeek ??
          0,
      ),
      savingsGoalAmount: Number(
        modalValues?.savingsGoalAmount ?? draftProfile?.savingsGoalAmount ?? 0,
      ),
      weeklyContribution: Number(
        modalValues?.weeklyContribution ??
          draftProfile?.weeklyContribution ??
          0,
      ),
    };

    setDraftProfile(mergedDraft);
    setProfileData((prev) => ({ ...(prev || {}), ...mergedDraft }));
    setModalOpen(false);

    if (!isProfileComplete(mergedDraft)) {
      toast.info(
        "Saved locally. Complete all profile cards before final update.",
      );
      return;
    }

    const id = mergedDraft?.hospitalId;
    if (!id) {
      toast.error("Hospital ID is required to submit profile update");
      return;
    }

    const endpoint =
      userType === "mother"
        ? `mother/update-profile/${id}`
        : `hospital/update-hospital/${id}`;

    const token = localStorage.getItem("token");

    const payload = {
      firstName: trimValue(mergedDraft?.firstName),
      lastName: trimValue(mergedDraft?.lastName),
      phoneNumber: trimValue(mergedDraft?.phoneNumber),
      address: trimValue(mergedDraft?.address),
      dateOfBirth: mergedDraft?.dateOfBirth,
      estimatedDueDate: mergedDraft?.estimatedDueDate,
      trimester: Number(mergedDraft?.trimester),
      bloodType: trimValue(mergedDraft?.bloodType),
      existingHealthConditions: trimValue(
        mergedDraft?.existingHealthConditions,
      ),
      currentPregnancyWeek: Number(mergedDraft?.currentPregnancyWeek),
      emergencyContact: trimValue(mergedDraft?.emergencyContact),
      allergies: trimValue(mergedDraft?.allergies),
      savingsGoalAmount: Number(mergedDraft?.savingsGoalAmount),
      weeklyContribution: Number(mergedDraft?.weeklyContribution),
      linkedPaymentMethod: trimValue(mergedDraft?.linkedPaymentMethod),
      hospitalId: id,
      ...(mergedDraft?.image instanceof File
        ? { image: mergedDraft.image }
        : {}),
    };

    try {
      setIsLoading(true);
      const hasFile = mergedDraft?.image instanceof File;
      await axios.put(
        `${baseURL}/${endpoint}`,
        hasFile ? toUpdateFormData(payload) : payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            ...(hasFile ? { "Content-Type": "multipart/form-data" } : {}),
          },
        },
      );
      toast.success("Profile updated successfully");
      await loadProfile();
    } catch (err) {
      console.error(err);
      toast.error("Unable to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-settings">
      <div className="profile-content">
        <div className="page-header">
          <h1 className="page-title">Profile & Settings</h1>
          <p className="page-subtitle">
            Manage your pregnancy information, account settings, and preferences
          </p>
        </div>

        <div className="settings-grid">
          <ProfileHeaderCard
            data={profileData}
            onEditClick={() => openModalFor("header")}
          />
          <PersonalInfoCard
            data={profileData}
            onEditClick={() => openModalFor("personal")}
          />
          <PregnancyInfoCard
            data={profileData}
            onEditClick={() => openModalFor("pregnancy")}
          />
          <PreferredHospitalCard
            data={profileData}
            onEditClick={() => openModalFor("hospital")}
          />
          <EmergencyWalletCard
            data={profileData}
            onEditClick={() => openModalFor("wallet")}
          />
          <NotificationPreferencesCard data={profileData} />
          <SecurityAccountCard data={profileData} />
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={getModalTitle(modalCard)}
      >
        {modalCard === "hospital" && (
          <div className="hospital-modal-container">
            <div className="hospital-modal-search-wrap">
              <input
                className="field-input"
                placeholder="Search hospitals by name or location"
                value={hospitalSearch}
                onChange={(e) => setHospitalSearch(e.target.value)}
              />
            </div>

            {isHospitalsLoading ? (
              <p className="hospital-modal-state">Loading hospitals...</p>
            ) : (
              <div className="hospital-list-grid">
                {hospitals
                  .filter((hospital) => {
                    const query = hospitalSearch.trim().toLowerCase();
                    if (!query) return true;
                    return (
                      hospital?.hospitalName?.toLowerCase().includes(query) ||
                      hospital?.address?.toLowerCase().includes(query)
                    );
                  })
                  .map((hospital, index) => {
                    const hospitalId = pickHospitalId(hospital);
                    const isSelected = modalValues?.hospitalId === hospitalId;
                    return (
                      <button
                        type="button"
                        key={
                          hospitalId ||
                          `${hospital?.hospitalName || "hospital"}-${index}`
                        }
                        className={`hospital-option-card ${isSelected ? "active" : ""}`}
                        onClick={() =>
                          setModalValues((prev) => ({
                            ...prev,
                            hospitalId,
                            preferredHospital: hospital?.hospitalName || "",
                            hospitalContact: hospital?.phoneNumber || "",
                            hospitalAddress: hospital?.address || "",
                            estimatedDeliveryCost: hospital?.deliveryFee || 0,
                          }))
                        }
                      >
                        <div className="hospital-option-top">
                          <h4>{hospital?.hospitalName || "Hospital"}</h4>
                          {hospital?.deliveryFee ? (
                            <span>{formatNaira(hospital.deliveryFee)}</span>
                          ) : null}
                        </div>
                        <p>{hospital?.address || "No address provided"}</p>
                        <div className="hospital-option-meta">
                          <span>{hospital?.phoneNumber || "No contact"}</span>
                          <span>{hospital?.email || "No email"}</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            )}

            {!isHospitalsLoading && hospitals.length === 0 && (
              <p className="hospital-modal-state">No hospitals available.</p>
            )}

            {!isHospitalsLoading &&
              hospitals.length > 0 &&
              !hospitals.some((hospital) => {
                const query = hospitalSearch.trim().toLowerCase();
                if (!query) return true;
                return (
                  hospital?.hospitalName?.toLowerCase().includes(query) ||
                  hospital?.address?.toLowerCase().includes(query)
                );
              }) && (
                <p className="hospital-modal-state">
                  No hospitals matched your search.
                </p>
              )}

            {modalValues?.hospitalId ? (
              <div className="hospital-selected-summary">
                <div>
                  <strong>Selected:</strong>{" "}
                  {modalValues?.preferredHospital || "-"}
                </div>
                <div>
                  <strong>Hospital ID:</strong> {modalValues?.hospitalId}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {modalCard === "personal" && (
          <div className="personal-modal-container">
            <div className="personal-search-section">
              <div className="personal-info-card">
                <label>First Name</label>
                <input
                  className="personal-card-input"
                  value={modalValues?.firstName || ""}
                  onChange={(e) =>
                    handleModalChange("firstName", e.target.value)
                  }
                />
              </div>

              <div className="personal-info-card">
                <label>Last Name</label>
                <input
                  className="personal-card-input"
                  value={modalValues?.lastName || ""}
                  onChange={(e) =>
                    handleModalChange("lastName", e.target.value)
                  }
                />
              </div>

              <div className="personal-info-card">
                <label>Email Address</label>
                <input
                  className="personal-card-input"
                  type="email"
                  value={modalValues?.email || ""}
                  onChange={(e) => handleModalChange("email", e.target.value)}
                />
              </div>

              <div className="personal-info-card">
                <label>Phone Number</label>
                <input
                  className="personal-card-input"
                  value={modalValues?.phoneNumber || ""}
                  onChange={(e) =>
                    handleModalChange("phoneNumber", e.target.value)
                  }
                />
              </div>

              <div className="personal-info-card">
                <label>Residential Location</label>
                <input
                  className="personal-card-input"
                  value={modalValues?.address || ""}
                  onChange={(e) => handleModalChange("address", e.target.value)}
                />
              </div>

              <input
                className="personal-modal-input"
                type="email"
                placeholder="Email Address"
                value={modalValues?.email || ""}
                onChange={(e) => handleModalChange("email", e.target.value)}
              />

              <input
                className="personal-modal-input"
                placeholder="Phone Number"
                value={modalValues?.phoneNumber || ""}
                onChange={(e) =>
                  handleModalChange("phoneNumber", e.target.value)
                }
              />

              <input
                className="personal-modal-input"
                placeholder="Residential Location"
                value={modalValues?.address || ""}
                onChange={(e) => handleModalChange("address", e.target.value)}
              />

              <input
                className="personal-modal-input"
                type="date"
                value={modalValues?.dateOfBirth || ""}
                onChange={(e) =>
                  handleModalChange("dateOfBirth", e.target.value)
                }
              />
            </div>
          </div>
        )}

        {modalCard === "pregnancy" && (
          <div className="modal-form">
            <label>Estimated Due Date</label>
            <input
              className="field-input "
              style={{ width: "100%" }}
              type="date"
              value={modalValues?.estimatedDueDate || ""}
              onChange={(e) =>
                handleModalChange("estimatedDueDate", e.target.value)
              }
            />
            <label>Current Pregnancy Week</label>
            <input
              className="field-input"
              type="number"
              value={modalValues?.currentPregnancyWeek || 0}
              onChange={(e) =>
                handleModalChange(
                  "currentPregnancyWeek",
                  Number(e.target.value),
                )
              }
            />
            <label>Trimester</label>
            <select
              className="field-input"
              value={modalValues?.trimester || 2}
              onChange={(e) =>
                handleModalChange("trimester", Number(e.target.value))
              }
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <label>Emergency Contact</label>
            <input
              className="field-input"
              value={modalValues?.emergencyContact || ""}
              onChange={(e) =>
                handleModalChange("emergencyContact", e.target.value)
              }
            />
            <label>Blood Type</label>
            <input
              className="field-input"
              value={modalValues?.bloodType || ""}
              onChange={(e) => handleModalChange("bloodType", e.target.value)}
            />
            <label>Allergies</label>
            <input
              className="field-input"
              value={modalValues?.allergies || ""}
              onChange={(e) => handleModalChange("allergies", e.target.value)}
            />
            <label>Existing Health Conditions</label>
            <textarea
              className="field-input"
              rows={3}
              value={modalValues?.existingHealthConditions || ""}
              onChange={(e) =>
                handleModalChange("existingHealthConditions", e.target.value)
              }
            />
          </div>
        )}

        {modalCard === "wallet" && (
          <div className="modal-form">
            <label>Savings Goal Amount</label>
            <input
              className="field-input"
              type="number"
              value={modalValues?.savingsGoalAmount || 0}
              onChange={(e) =>
                handleModalChange("savingsGoalAmount", Number(e.target.value))
              }
            />
            <label>Weekly Contribution</label>
            <input
              className="field-input"
              type="number"
              value={modalValues?.weeklyContribution || 0}
              onChange={(e) =>
                handleModalChange("weeklyContribution", Number(e.target.value))
              }
            />
            <label>Linked Payment Method</label>
            <input
              className="field-input"
              value={modalValues?.linkedPaymentMethod || ""}
              onChange={(e) =>
                handleModalChange("linkedPaymentMethod", e.target.value)
              }
            />
          </div>
        )}

        {modalCard === "header" && (
          <div className="header-modal">
            <div className="header-image-section">
              <div className="profile-image-wrapper">
                <img
                  src={modalValues?.profilePreview || "/default-avatar.png"}
                  alt="profile"
                  className="profile-preview-image"
                />

                <label htmlFor="profileImage" className="image-upload-btn">
                  ✎
                </label>

                <input
                  id="profileImage"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (!file) return;

                    const allowedTypes = [
                      "image/jpeg",
                      "image/jpg",
                      "image/png",
                      "application/pdf",
                    ];

                    if (!allowedTypes.includes(file.type)) {
                      toast.error(
                        "Only JPG, JPEG, PNG, or PDF files are allowed",
                      );
                      return;
                    }

                    if (file.size > 5 * 1024 * 1024) {
                      toast.error("File must be less than 5MB");
                      return;
                    }

                    setModalValues((prev) => ({
                      ...prev,
                      image: file,
                      profilePreview: URL.createObjectURL(file),
                    }));
                  }}
                />
              </div>
            </div>

            <div className="header-form">
              <div className="modal-field-wrap">
                <label>Full Name</label>
                <input
                  className="field-input"
                  value={modalValues?.fullName || ""}
                  onChange={(e) =>
                    handleModalChange("fullName", e.target.value)
                  }
                  placeholder="Enter full name"
                />
              </div>

              <div className="modal-field-wrap">
                <label>Estimated Due Date</label>
                <input
                  className="field-input"
                  type="date"
                  value={modalValues?.estimatedDueDate || ""}
                  onChange={(e) =>
                    handleModalChange("estimatedDueDate", e.target.value)
                  }
                />
              </div>

              <div className="modal-field-wrap">
                <label>Preferred Hospital</label>
                <input
                  className="field-input"
                  value={modalValues?.preferredHospital || ""}
                  onChange={(e) =>
                    handleModalChange("preferredHospital", e.target.value)
                  }
                  placeholder="Enter hospital"
                />
              </div>
            </div>
          </div>
        )}
        <div className="modal-footer-actions">
          <button className="btn-secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleModalSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;