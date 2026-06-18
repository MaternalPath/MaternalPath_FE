import { useEffect, useMemo, useState } from "react";
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
import EditProfileModal from "../../../Components/ModalCard/ModalCard";
import UpdatePregnancyModal from "../../../Components/ModalCard/UpdatePregnacySettings";
import EditPersonalInformationModal from "../../../Components/ModalCard/EditProfileModal";
import SelectHospitalModal from "../../../Components/ModalCard/SelectHospitalModal";
import EmergencyWalletModal from "../../../Components/ModalCard/WalletModal";
import ProfileSkeleton from "../../../Components/PatientDashBoardFolder/ProfileComponent/ProfileSkeleton";
import {
  getMotherHospital,
  getMotherProfile,
  updateMotherProfile,
} from "../../../api/mothers";

const INITIAL_PROFILE = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  dateOfBirth: "",
  estimatedDueDate: "",
  trimester: "",
  bloodType: "",
  existingHealthConditions: "",
  currentPregnancyWeek: "",
  emergencyContactName: "",
  emergencyContact: "",
  allergies: "",
  savingsGoalAmount: 0,
  weeklyContribution: 0,
  linkedPaymentMethod: "card",
  hospitalId: "",
  preferredHospital: "",
  hospitalAddress: "",
  hospitalContact: "",
  estimatedDeliveryCost: 0,
  profilePicture: "",
  imageFile: null,
};

const STEPS = {
  NONE: null,
  PROFILE: "profile",
  PERSONAL: "personal",
  PREGNANCY: "pregnancy",
  HOSPITAL: "hospital",
  WALLET: "wallet",
};

const normalizeImageUrl = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object")
    return value.url || value.path || value.imageUrl || "";
  return "";
};

const normalizeTrimester = (value) => {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value === "number") return value;
  const lower = String(value).trim().toLowerCase();
  if (/^\d+$/.test(lower)) return parseInt(lower, 10);
  if (lower.includes("first")) return 1;
  if (lower.includes("second")) return 2;
  if (lower.includes("third")) return 3;
  return "";
};

// API responses come in several shapes:
//   { data: [ {user}, {details}, "image-url", ... ] }  ← current get-mother
//   { data: {...}, details: {...} }                    ← update endpoint
//   { mother: {...} } / { user: {...} } / flat object
// Walk into objects and arrays — merge object payloads, capture URL strings
// as image. Skip meta keys ("message" etc.) so they don't pollute state.
const META_KEYS = new Set(["message", "status", "code", "success", "error"]);

const flattenResponse = (resp) => {
  if (!resp || typeof resp !== "object") return {};

  const collected = {};
  const merge = (value) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach(merge);
    } else if (typeof value === "object") {
      Object.assign(collected, value);
    } else if (typeof value === "string" && /^https?:\/\//i.test(value)) {
      if (!collected.image) collected.image = value;
    }
  };

  Object.entries(resp).forEach(([key, value]) => {
    if (META_KEYS.has(key)) return;
    if (value && typeof value === "object") {
      merge(value);
    } else if (value !== undefined && value !== null) {
      collected[key] = value;
    }
  });

  return collected;
};

const normalizeProfileData = (raw) => {
  if (!raw || typeof raw !== "object") return {};
  return {
    ...raw,
    profilePicture: normalizeImageUrl(
      raw.profilePicture || raw.image || raw.photo,
    ),
    emergencyContact:
      raw.emergencyContactNumber || raw.emergencyContact || "",
    trimester: normalizeTrimester(raw.trimester),
    hospitalId: raw.hospitalId || raw.preferredHospitalId || "",
    preferredHospital:
      raw.preferredHospital || raw.selectedHospital || "",
    imageFile: null,
  };
};

const normalizeHospitals = (resp) => {
  if (!resp) return [];
  if (Array.isArray(resp)) return resp;
  if (Array.isArray(resp.hospitals)) return resp.hospitals;
  if (Array.isArray(resp.data)) return resp.data;
  return [];
};

// Backend wants exactly 10 digits, no country code, no leading 0.
const toLocalPhone = (raw) => {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("234")) return digits.slice(3);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const Profile = () => {
  const { setIsUpdated } = useRole();
  // Backend truth — drives the cards and the hide-if-filled check
  const [profileData, setProfileData] = useState(INITIAL_PROFILE);
  // In-modal edits this session — not shown on cards until save succeeds
  const [draft, setDraft] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [openStep, setOpenStep] = useState(STEPS.NONE);

  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      try {
        const [profileResp, hospitalsResp] = await Promise.all([
          getMotherProfile(),
          getMotherHospital().catch((err) => {
            console.warn("Hospital list failed to load:", err);
            return null;
          }),
        ]);

        if (!isMounted) return;

        const flat = flattenResponse(profileResp);
        if (Object.keys(flat).length > 0) {
          setProfileData((prev) => ({
            ...prev,
            ...normalizeProfileData(flat),
          }));
        }
        setHospitals(normalizeHospitals(hospitalsResp));
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Could not load your profile. Please refresh.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Merged view shown inside modals: backend values + any typed draft on top
  const formData = useMemo(
    () => ({ ...profileData, ...draft }),
    [profileData, draft],
  );

  const updateDraft = (fields) =>
    setDraft((prev) => ({ ...prev, ...fields }));

  const handleEdit = (card) => {
    const map = {
      header: STEPS.PROFILE,
      personal: STEPS.PERSONAL,
      pregnancy: STEPS.PREGNANCY,
      hospital: STEPS.HOSPITAL,
      wallet: STEPS.WALLET,
    };
    setOpenStep(map[card] || STEPS.NONE);
  };

  const closeModal = () => setOpenStep(STEPS.NONE);

  const handleFinalSubmit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    setIsSaving(true);
    try {
      const merged = { ...profileData, ...draft };
      const payload = new FormData();

      const fields = {
        firstName: merged.firstName,
        lastName: merged.lastName,
        phoneNumber: toLocalPhone(merged.phoneNumber),
        address: merged.address,
        dateOfBirth: merged.dateOfBirth,
        estimatedDueDate: merged.estimatedDueDate,
        bloodType: merged.bloodType,
        existingHealthConditions: merged.existingHealthConditions,
        currentPregnancyWeek: merged.currentPregnancyWeek,
        emergencyContactName: merged.emergencyContactName,
        emergencyContactNumber: toLocalPhone(merged.emergencyContact),
        allergies: merged.allergies,
        linkedPaymentMethod: merged.linkedPaymentMethod || "card",
        trimester: merged.trimester ? Number(merged.trimester) : "",
        hospitalId: merged.hospitalId,
        savingsGoalAmount: merged.savingsGoalAmount || 0,
        weeklyContribution: merged.weeklyContribution || 0,
      };

      Object.entries(fields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          payload.append(key, String(value));
        }
      });

      if (merged.imageFile instanceof File) {
        payload.append("image", merged.imageFile, merged.imageFile.name);
      }

      const response = await updateMotherProfile(userId, payload);
      const flat = flattenResponse(response);
      if (Object.keys(flat).length > 0) {
        setProfileData((prev) => ({
          ...prev,
          ...normalizeProfileData({ ...merged, ...flat }),
        }));
      } else {
        // Fall back: trust the merged values we just sent
        setProfileData((prev) => ({ ...prev, ...merged, imageFile: null }));
      }

      setDraft({});
      setIsUpdated(true);
      localStorage.setItem("isUpdated", "true");
      closeModal();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(
        typeof error === "string" ? error : "Failed to update profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-settings">
        <div className="profile-content">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  // Cards read from profileData ONLY — never reflects draft typing
  const displayData = {
    ...profileData,
    name:
      profileData.firstName && profileData.lastName
        ? `${profileData.firstName} ${profileData.lastName}`
        : "Update your name",
    dueDate: profileData.estimatedDueDate || "Not set yet",
    week: profileData.currentPregnancyWeek
      ? `Week ${profileData.currentPregnancyWeek}`
      : "Click to add week tracking",
    hospital: profileData.preferredHospital || "No hospital selected",
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

        {/* Dashboard Grid View cards reading values cleanly */}
        <div className="settings-grid">
          <ProfileHeaderCard
            data={displayData}
            onEditClick={() => handleEdit("header")}
          />
          <PersonalInfoCard
            data={displayData}
            onEditClick={() => handleEdit("personal")}
          />
          <PregnancyInfoCard
            data={displayData}
            onEditClick={() => handleEdit("pregnancy")}
          />
          <PreferredHospitalCard
            data={displayData}
            onEditClick={() => handleEdit("hospital")}
          />
          <EmergencyWalletCard
            data={displayData}
            onEditClick={() => handleEdit("wallet")}
          />
          <NotificationPreferencesCard data={displayData} />
          <SecurityAccountCard data={displayData} />
        </div>
      </div>

      <EditProfileModal
        isOpen={openStep === STEPS.PROFILE}
        data={formData}
        saved={profileData}
        updateFields={updateDraft}
        onClose={closeModal}
        onNext={() => setOpenStep(STEPS.PERSONAL)}
      />

      <EditPersonalInformationModal
        isOpen={openStep === STEPS.PERSONAL}
        data={formData}
        saved={profileData}
        updateFields={updateDraft}
        onClose={closeModal}
        onNext={() => setOpenStep(STEPS.PREGNANCY)}
        onPrevious={() => setOpenStep(STEPS.PROFILE)}
      />

      <UpdatePregnancyModal
        isOpen={openStep === STEPS.PREGNANCY}
        data={formData}
        saved={profileData}
        updateFields={updateDraft}
        onClose={closeModal}
        onNext={() => setOpenStep(STEPS.HOSPITAL)}
        onPrevious={() => setOpenStep(STEPS.PERSONAL)}
      />

      <SelectHospitalModal
        isOpen={openStep === STEPS.HOSPITAL}
        data={formData}
        saved={profileData}
        hospitals={hospitals}
        updateFields={updateDraft}
        onClose={closeModal}
        onNext={() => setOpenStep(STEPS.WALLET)}
        onPrevious={() => setOpenStep(STEPS.PREGNANCY)}
      />

      <EmergencyWalletModal
        isOpen={openStep === STEPS.WALLET}
        data={formData}
        saved={profileData}
        updateFields={updateDraft}
        isSaving={isSaving}
        onClose={closeModal}
        onPrevious={() => setOpenStep(STEPS.HOSPITAL)}
        onSubmit={handleFinalSubmit}
      />
    </div>
  );
};

export default Profile;
