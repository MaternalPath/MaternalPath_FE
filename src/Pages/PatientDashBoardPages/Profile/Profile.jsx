import { useState, useEffect } from "react";
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
import { getMotherProfile, updateMotherProfile } from "../../../api/mothers";

const normalizeImageUrl = (imageValue) => {
  if (!imageValue) return "";
  if (typeof imageValue === "string") return imageValue;
  if (typeof imageValue === "object") {
    if (imageValue.url) return imageValue.url;
    if (imageValue.path) return imageValue.path;
    if (imageValue.imageUrl) return imageValue.imageUrl;
    if (imageValue.profilePicture) return normalizeImageUrl(imageValue.profilePicture);
    return "";
  }
  return "";
};

const normalizeTrimesterValue = (trimester) => {
  if (trimester === undefined || trimester === null || trimester === "") return "";
  if (typeof trimester === "number") return trimester;
  if (typeof trimester === "string") {
    const normalized = trimester.trim().toLowerCase();
    if (/^\d+$/.test(normalized)) return parseInt(normalized, 10);
    if (normalized.includes("first")) return 1;
    if (normalized.includes("second")) return 2;
    if (normalized.includes("third")) return 3;
    return parseInt(normalized, 10) || "";
  }
  return "";
};

const normalizeEmergencyContact = (rawData) => {
  return rawData?.emergencyContactNumber || rawData?.emergencyContact || "";
};

const normalizeProfileData = (rawData) => {
  if (!rawData) return rawData;

  const normalizedImage = normalizeImageUrl(rawData.profilePicture || rawData.image || rawData.photo);

  return {
    ...rawData,
    profilePicture: normalizedImage,
    emergencyContact: normalizeEmergencyContact(rawData),
    trimester: normalizeTrimesterValue(rawData.trimester),
    imageFile: null,
  };
};

const Profile = () => {
  // 1. Initial full schema containing empty values for fields not yet collected during onboarding
  const [profileData, setProfileData] = useState({
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
    linkedPaymentMethod: "",
    preferredHospital: "",
    hospitalAddress: "",
    hospitalContact: "",
    estimatedDeliveryCost: 0,
    profilePicture: "",
    imageFile: null, // Store the actual File object
  });

  const [isLoading, setIsLoading] = useState(true);

  // Modal Step States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isPregnancyModalOpen, setIsPregnancyModalOpen] = useState(false);
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // 2. Consume real API data on mount and merge it with our fallback schema
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await getMotherProfile();
      
      if (response && response.data) {
        setProfileData((prevSchema) => ({
          ...prevSchema,
          ...normalizeProfileData(response.data),
        }));
      }
    } catch (error) {
      console.error("Error loading user profile context from API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handler to update fields directly as the user types across the onboarding steps
  const updateProfileFields = (updatedFields) => {
    setProfileData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const handleEdit = (cardName) => {
    if (cardName === "header" || cardName === "personal") {
      setIsEditProfileOpen(true);
    } else if (cardName === "pregnancy") {
      setIsPregnancyModalOpen(true);
    } else if (cardName === "hospital") {
      setIsHospitalModalOpen(true);
    } else if (cardName === "wallet") {
      setIsWalletModalOpen(true);
    }
  };

  // Nav Chain handles
  const handleStep1ToStep2 = () => { setIsEditProfileOpen(false); setIsPersonalInfoOpen(true); };
  const handleStep2ToStep3 = () => { setIsPersonalInfoOpen(false); setIsPregnancyModalOpen(true); };
  const handleStep2BackToStep1 = () => { setIsPersonalInfoOpen(false); setIsEditProfileOpen(true); };
  const handleStep3BackToStep2 = () => { setIsPregnancyModalOpen(false); setIsPersonalInfoOpen(true); };
  const handleStep4BackToStep3 = () => { setIsHospitalModalOpen(false); setIsPregnancyModalOpen(true); };
  const handleStep3ToStep4 = () => { setIsPregnancyModalOpen(false); setIsHospitalModalOpen(true); };
  const handleStep4ToStep5 = () => { setIsHospitalModalOpen(false); setIsWalletModalOpen(true); };
  const handleStep5BackToStep4 = () => { setIsWalletModalOpen(false); setIsHospitalModalOpen(true); };

  // 3. Centralized Asynchronous API Submission Engine
  const handleFinalFormSubmit = async () => {
    try {
      console.log("Initiating API update sequence");
      
      // Get user ID from localStorage
      const id = localStorage.getItem('userId');
      
      if (!id) {
        alert("User ID not found. Please log in again.");
        return;
      }
      
      // Create FormData and append ALL fields
      const formData = new FormData();
      
      // Append all text fields
      const fields = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        dateOfBirth: profileData.dateOfBirth,
        estimatedDueDate: profileData.estimatedDueDate,
        bloodType: profileData.bloodType,
        existingHealthConditions: profileData.existingHealthConditions,
        currentPregnancyWeek: profileData.currentPregnancyWeek,
        emergencyContactName: profileData.emergencyContactName,
        allergies: profileData.allergies,
        linkedPaymentMethod: profileData.linkedPaymentMethod,
        preferredHospital: profileData.preferredHospital,
        hospitalAddress: profileData.hospitalAddress,
        hospitalContact: profileData.hospitalContact,
      };
      
      // Append all text fields
      Object.keys(fields).forEach(key => {
        if (fields[key]) {
          formData.append(key, fields[key]);
        }
      });
      
      // Append numeric fields
      formData.append('savingsGoalAmount', String(profileData.savingsGoalAmount || 0));
      formData.append('weeklyContribution', String(profileData.weeklyContribution || 0));
      formData.append('estimatedDeliveryCost', String(profileData.estimatedDeliveryCost || 0));
      formData.append('trimester', String(normalizeTrimesterValue(profileData.trimester) || ""));
      formData.append('emergencyContactNumber', profileData.emergencyContact || profileData.emergencyContactNumber || "");
      
      if (profileData.imageFile && profileData.imageFile instanceof File) {
        console.log("Appending image file:", profileData.imageFile.name);
        console.log("File type:", profileData.imageFile.type);
        console.log("File size:", profileData.imageFile.size);
        formData.append('image', profileData.imageFile, profileData.imageFile.name);
      } else {
        console.log("No image file to append");
      }
      
      // Log all form data entries for debugging
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, value.name, value.type, value.size);
        } else {
          console.log(key, value);
        }
      }
      
      // Call the API with FormData
      const response = await updateMotherProfile(id, formData);
      
      console.log("Profile updated successfully:", response);
      setIsWalletModalOpen(false);
      alert("Profile settings synchronized successfully via API!");
      
      setProfileData(prev => ({
        ...prev,
        ...normalizeProfileData(response?.data || response),
      }));
      
      // Refresh the profile data to reflect the changes if needed
      await fetchUserProfile();
      
    } catch (error) {
      console.error("API update failure exception handling:", error);
      alert(error || "Failed to synchronize changes. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading-screen">
        <div className="spinner"></div>
        <p>Loading your dashboard details...</p>
      </div>
    );
  }

  // 4. Fallback layout mappings to gracefully handle non-onboarded blank fields on the cards
  const displayData = {
    ...profileData,
    name: profileData.firstName && profileData.lastName 
      ? `${profileData.firstName} ${profileData.lastName}` 
      : "Update your name",
    dueDate: profileData.estimatedDueDate || "Not set yet",
    week: profileData.currentPregnancyWeek 
      ? `Week ${profileData.currentPregnancyWeek}` 
      : "Click to add week tracking",
    hospital: profileData.preferredHospital || "No hospital selected"
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
          <ProfileHeaderCard data={displayData} onEditClick={() => handleEdit("header")} />
          <PersonalInfoCard data={displayData} onEditClick={() => handleEdit("personal")} />
          <PregnancyInfoCard data={displayData} onEditClick={() => handleEdit("pregnancy")} />
          <PreferredHospitalCard data={displayData} onEditClick={() => handleEdit("hospital")} />
          <EmergencyWalletCard data={displayData} onEditClick={() => handleEdit("wallet")} />
          <NotificationPreferencesCard data={displayData} />
          <SecurityAccountCard data={displayData} />
        </div>
      </div>

      {/* STEP 1 */}
      <EditProfileModal 
        isOpen={isEditProfileOpen} 
        data={profileData}
        updateFields={updateProfileFields}
        onClose={() => setIsEditProfileOpen(false)} 
        onNext={handleStep1ToStep2}
      />

      {/* STEP 2 */}
      <EditPersonalInformationModal
        isOpen={isPersonalInfoOpen}
        data={profileData}
        updateFields={updateProfileFields}
        onClose={() => setIsPersonalInfoOpen(false)}
        onNext={handleStep2ToStep3}
        onPrevious={handleStep2BackToStep1}
      />

      {/* STEP 3 */}
      <UpdatePregnancyModal 
        isOpen={isPregnancyModalOpen} 
        data={profileData}
        updateFields={updateProfileFields}
        onClose={() => setIsPregnancyModalOpen(false)}
        onNext={handleStep3ToStep4}
        onPrevious={handleStep3BackToStep2}
      />

      {/* STEP 4 */}
      <SelectHospitalModal
        isOpen={isHospitalModalOpen}
        data={profileData}
        updateFields={updateProfileFields}
        onClose={() => setIsHospitalModalOpen(false)}
        onNext={handleStep4ToStep5}
        onPrevious={handleStep4BackToStep3}
      />

      {/* STEP 5 */}
      <EmergencyWalletModal
        isOpen={isWalletModalOpen}
        data={profileData}
        updateFields={updateProfileFields}
        onClose={() => setIsWalletModalOpen(false)}
        onPrevious={handleStep5BackToStep4}
        onSubmit={handleFinalFormSubmit}
      />
    </div>
  );
};

export default Profile;