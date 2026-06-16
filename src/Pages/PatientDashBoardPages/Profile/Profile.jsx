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

const Profile = () => {
  // 1. Unified state holding empty values for all required API schema fields
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
  });

  const [isLoading, setIsLoading] = useState(true);

  // Modal Step States
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);       // Step 1
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);     // Step 2
  const [isPregnancyModalOpen, setIsPregnancyModalOpen] = useState(false); // Step 3
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);   // Step 4
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);       // Step 5

  // 2. Fetch data from backend API on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual endpoints, e.g., await axios.get('/api/profile')
        // const response = await api.getProfile();
        // setProfileData(response.data);

        // Simulated Delay for Hydration testing:
        setTimeout(() => {
          setProfileData({
            firstName: "Sarah",
            lastName: "Johnson",
            email: "sarah.johnson@email.com",
            phoneNumber: "801 234 5678",
            address: "12 Allen Avenue, Ikeja, Lagos",
            dateOfBirth: "1995-03-15",
            estimatedDueDate: "2026-11-20",
            trimester: 2,
            bloodType: "O+",
            existingHealthConditions: "None",
            currentPregnancyWeek: 22,
            emergencyContact: "+234 802 345 6789",
            allergies: "Penicillin",
            savingsGoalAmount: 400000,
            weeklyContribution: 7500,
            linkedPaymentMethod: "Opay",
            preferredHospital: "Lagos University Teaching Hospital",
            hospitalAddress: "Idi-Araba, Lagos",
            hospitalContact: "+234 1 280 6944",
            estimatedDeliveryCost: 250000,
            profilePicture: "",
          });
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error("Error loading user profile context:", error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handler to update deep state fields directly from sub-modal component inputs
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
      console.log("Initiating API call sequence with payload execution:", profileData);
      
      // Example endpoint call configuration:
      // const response = await axios.put('/api/profile/update', profileData);
      
      setIsWalletModalOpen(false);
      alert("Profile settings synchronized successfully via API!");
    } catch (error) {
      console.error("API update failure exception handling:", error);
      alert("Failed to synchronize changes. Please try again.");
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

  // Fallback string configurations for UI display consistency
  const displayData = {
    ...profileData,
    name: `${profileData.firstName} ${profileData.lastName}`,
    dueDate: profileData.estimatedDueDate,
    week: `Week ${profileData.currentPregnancyWeek}`,
    hospital: profileData.preferredHospital
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
        onClose={() => setIsWalletModalOpen(false)}
        onPrevious={handleStep5BackToStep4}
        onSubmit={handleFinalFormSubmit}
      />
    </div>
  );
};

export default Profile;