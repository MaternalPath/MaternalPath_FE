import { useEffect, useState } from "react";
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

const Profile = () => {
  const { role: defaultRole } = useRole();
  const [userType] = useState(defaultRole || "mother");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalCard, setModalCard] = useState(null);
  const [modalValues, setModalValues] = useState({});

  const loadProfile = async () => {
    if (!baseURL) return;
    const endpoint = userType === "mother" ? "mother/get-mother" : "hospital/get-hospital";
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseURL}/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data?.data?.data || response.data?.data || {};
      setProfileData(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userType]);

  const openModalFor = (card) => {
    setModalCard(card);
    if (!profileData) return;
    if (card === "personal") {
      setModalValues({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        phoneNumber: profileData?.phoneNumber || "",
        address: profileData?.address || "",
        dateOfBirth: profileData?.dateOfBirth || "",
      });
    } else if (card === "pregnancy") {
      setModalValues({
        estimatedDueDate: profileData?.estimatedDueDate || profileData?.dueDate || "",
        currentPregnancyWeek: profileData?.currentPregnancyWeek || profileData?.week || 24,
        trimester: profileData?.trimester || 2,
        emergencyContact: profileData?.emergencyContact || "",
        bloodType: profileData?.bloodType || "",
        allergies: profileData?.allergies || "",
        existingHealthConditions: profileData?.existingHealthConditions || "",
      });
    } else if (card === "hospital") {
      setModalValues({
        preferredHospital: profileData?.preferredHospital || "",
        hospitalContact: profileData?.hospitalContact || "",
        hospitalAddress: profileData?.hospitalAddress || "",
      });
    } else if (card === "wallet") {
      setModalValues({
        savingsGoalAmount: profileData?.savingsGoalAmount || 0,
        weeklyContribution: profileData?.weeklyContribution || 0,
        linkedPaymentMethod: profileData?.linkedPaymentMethod || "",
      });
    } else if (card === "header") {
      setModalValues({
        firstName: profileData?.firstName || "",
        lastName: profileData?.lastName || "",
        estimatedDueDate: profileData?.estimatedDueDate || profileData?.dueDate || "",
        preferredHospital: profileData?.preferredHospital || "",
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
    const endpoint = userType === "mother" ? "mother/update-mother" : "hospital/update-hospital";
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      await axios.put(`${baseURL}/${endpoint}`, modalValues, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated");
      setModalOpen(false);
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
          <p className="page-subtitle">Manage your pregnancy information, account settings, and preferences</p>
        </div>

        <div className="settings-grid">
          <ProfileHeaderCard data={profileData} onEditClick={() => openModalFor("header")} />
          <PersonalInfoCard data={profileData} onEditClick={() => openModalFor("personal")} />
          <PregnancyInfoCard data={profileData} onEditClick={() => openModalFor("pregnancy")} />
          <PreferredHospitalCard data={profileData} onEditClick={() => openModalFor("hospital")} />
          <EmergencyWalletCard data={profileData} onEditClick={() => openModalFor("wallet")} />
          <NotificationPreferencesCard data={profileData} />
          <SecurityAccountCard data={profileData} />
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={modalCard ? `Edit ${modalCard}` : "Edit"}>
        {modalCard === "personal" && (
          <div className="modal-form">
            <label>First name</label>
            <input className="field-input" value={modalValues?.firstName || ""} onChange={(e) => handleModalChange("firstName", e.target.value)} />
            <label>Last name</label>
            <input className="field-input" value={modalValues?.lastName || ""} onChange={(e) => handleModalChange("lastName", e.target.value)} />
            <label>Phone number</label>
            <input className="field-input" value={modalValues?.phoneNumber || ""} onChange={(e) => handleModalChange("phoneNumber", e.target.value)} />
            <label>Address</label>
            <input className="field-input" value={modalValues?.address || ""} onChange={(e) => handleModalChange("address", e.target.value)} />
            <label>Date of birth</label>
            <input className="field-input" type="date" value={modalValues?.dateOfBirth || ""} onChange={(e) => handleModalChange("dateOfBirth", e.target.value)} />
          </div>
        )}

        {modalCard === "pregnancy" && (
          <div className="modal-form">
            <label>Estimated Due Date</label>
            <input className="field-input" type="date" value={modalValues?.estimatedDueDate || ""} onChange={(e) => handleModalChange("estimatedDueDate", e.target.value)} />
            <label>Current Pregnancy Week</label>
            <input className="field-input" type="number" value={modalValues?.currentPregnancyWeek || 0} onChange={(e) => handleModalChange("currentPregnancyWeek", Number(e.target.value))} />
            <label>Trimester</label>
            <select className="field-input" value={modalValues?.trimester || 2} onChange={(e) => handleModalChange("trimester", Number(e.target.value))}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <label>Emergency Contact</label>
            <input className="field-input" value={modalValues?.emergencyContact || ""} onChange={(e) => handleModalChange("emergencyContact", e.target.value)} />
            <label>Blood Type</label>
            <input className="field-input" value={modalValues?.bloodType || ""} onChange={(e) => handleModalChange("bloodType", e.target.value)} />
            <label>Allergies</label>
            <input className="field-input" value={modalValues?.allergies || ""} onChange={(e) => handleModalChange("allergies", e.target.value)} />
            <label>Existing Health Conditions</label>
            <textarea className="field-input" rows={3} value={modalValues?.existingHealthConditions || ""} onChange={(e) => handleModalChange("existingHealthConditions", e.target.value)} />
          </div>
        )}

        {modalCard === "hospital" && (
          <div className="modal-form">
            <label>Preferred Hospital</label>
            <input className="field-input" value={modalValues?.preferredHospital || ""} onChange={(e) => handleModalChange("preferredHospital", e.target.value)} />
            <label>Hospital Contact</label>
            <input className="field-input" value={modalValues?.hospitalContact || ""} onChange={(e) => handleModalChange("hospitalContact", e.target.value)} />
            <label>Hospital Address</label>
            <input className="field-input" value={modalValues?.hospitalAddress || ""} onChange={(e) => handleModalChange("hospitalAddress", e.target.value)} />
          </div>
        )}

        {modalCard === "wallet" && (
          <div className="modal-form">
            <label>Savings Goal Amount</label>
            <input className="field-input" type="number" value={modalValues?.savingsGoalAmount || 0} onChange={(e) => handleModalChange("savingsGoalAmount", Number(e.target.value))} />
            <label>Weekly Contribution</label>
            <input className="field-input" type="number" value={modalValues?.weeklyContribution || 0} onChange={(e) => handleModalChange("weeklyContribution", Number(e.target.value))} />
            <label>Linked Payment Method</label>
            <input className="field-input" value={modalValues?.linkedPaymentMethod || ""} onChange={(e) => handleModalChange("linkedPaymentMethod", e.target.value)} />
          </div>
        )}

        <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
          <button className="btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn-primary" onClick={handleModalSave} disabled={isLoading}>{isLoading ? "Saving..." : "Save Changes"}</button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;


