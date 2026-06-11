import "./Profile.css";
import ProfileHeaderCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/ProfileHeaderCard";
import PersonalInfoCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/PersonalInfoCard";
import PregnancyInfoCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/PregnancyInfoCard";
import PreferredHospitalCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/PreferredHospitalCard";
import EmergencyWalletCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/EmergencyWalletCard";
import NotificationPreferencesCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/NotificationPreferencesCard";
import SecurityAccountCard from "../../../Components/PatientDashBoardFolder/ProfileComponent/SecurityAccountCard";

const Profile = ({ data }) => {
  return (
    <div className="profile-settings">
      <div className="page-header">
        <h1 className="page-title">Profile & Settings</h1>
        <p className="page-subtitle">
          Manage your pregnancy information, account settings, and preferences
        </p>
      </div>

      <div className="settings-grid">
        <ProfileHeaderCard data={data} />
        <PersonalInfoCard data={data} />
        <PregnancyInfoCard data={data} />
        <PreferredHospitalCard data={data} />
        <EmergencyWalletCard data={data} />
        <NotificationPreferencesCard data={data} />
        <SecurityAccountCard data={data} />
      </div>
    </div>
  );
};

export default Profile;
