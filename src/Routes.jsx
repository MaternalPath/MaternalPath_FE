import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRole } from "./context/RoleContext";
import Login from "./Auth/Login/Login";
import Signup from "./Auth/SignUp/SignUpPatient/SignUpUser";
import FaqHome from "./Pages/FAQ/FaqHome";
import How from "./Pages/How/How";
import LandingPage from "./Pages/LandingPage/landingPage";
import About from "./Pages/About/About";
import VerifyHosOTP from "./Pages/OtpFolder/OtpHospital/VerifyHosOTP";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardIndex from "./Pages/Dashboard/DashboardIndex ";
import PregnancyTracker from "./Pages/PatientDashBoardPages/PregnancyTracker/PregnancyTracker";
import EmergencyWallet from "./Pages/PatientDashBoardPages/EmergencyWallet/EmergencyWallet";
import AddFunds from "./Components/PatientDashBoardFolder/EmergencyComponent/AddFundCom/AddFunds";
import HealthGuidance from "./Pages/PatientDashBoardPages/HealthGuidance/HealthGuidance";
import Notifications from "./Pages/PatientDashBoardPages/Notifications/Notifications";
import DashboardHome from "./Pages/PatientDashBoardPages/DashboardHome/DashboardHome";
import HospitalOverview from "./Pages/HospitalDashBoardPages/HospitalOverview/HospitalOverview";
import Profile from "./Pages/PatientDashBoardPages/Profile/Profile";
import GetStarted from "./Auth/GetStartedPage/GetStarted";
import SignUpAdmin from "./Auth/SignUp/SignUpHos/SignUpAdmin";
import VerifyOTP from "./Pages/OtpFolder/VerifyOTP";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import CheckEmail from "./Pages/ForgotPassword/CheckEmail";
import CreateNewPassword from "./Pages/ForgotPassword/CreateNewPassword";
import PasswordResetSuccess from "./Pages/ForgotPassword/PasswordResetSuccess";
import VerifyPatient from "./Pages/HospitalDashBoardPages/VerifyPatient/VerifyPatient";
import UploadedBills from "./Pages/HospitalDashBoardPages/UploadedBills/UploadedBills";
import VerificationHistory from "./Pages/HospitalDashBoardPages/VerificationHistory/VerificationHistory";
import NotificationsHospital from "./Pages/HospitalDashBoardPages/NotificationsHospiatal/NotificationsHospital";
import SettingsHospital from "./Pages/HospitalDashBoardPages/SettingsHospital/SettingsHospital";
import Settings from "./Pages/Settings/Settings";
import HospitalForgotPassword from "./Pages/ForgotPassword/HospitalForgotPassword";
import TeamSection from "./Components/AboutComponent/TeamSection";
import TermsLayout from "./Pages/TermsLayout/TermsLayout";
import UploadNewBill from "./Pages/HospitalDashBoardPages/VerifyPatient/UploadNewBill/UploadNewBill";
import PrivacySettings from "./Pages/PrivacySettingsLayout/PrivacySettings";
import FundsSuccess from "./Pages/ConfirmationPage/FundsSuccess";
import PrivateRouting from "./Lib/PrivateRouting";
import PublicRoute from "./Lib/PublicRoute";
import ScrollToTop from "./Components/StopScroll/ScrollToTop";
import PatientDetails from "./Pages/HospitalDashBoardPages/VerifyPatient/PatientDetails";

const AppRoutes = () => (
  <Router>
    <ScrollToTop />
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how" element={<How />} />
        <Route path="/about" element={<About />} />
        <Route path="/teamSection" element={<TeamSection />} />
        <Route path="/terms" element={<TermsLayout />} />
        <Route path="/privacySettings" element={<PrivacySettings />} />
        <Route path="/fundsSuccess" element={<FundsSuccess />} />
        <Route path="/faq" element={<FaqHome />} />
        <Route path="/uploadNewBill" element={<UploadNewBill />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signupUser" element={<Signup />} />
      <Route path="/signupHospital" element={<SignUpAdmin />} />
      <Route path="/getStarted" element={<GetStarted />} />
      <Route path="/otpVerification" element={<VerifyOTP />} />
      <Route path="/otpVerificationHos" element={<VerifyHosOTP />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route
        path="/hospitalForgotPassword"
        element={<HospitalForgotPassword />}
      />
      <Route path="/checkEmail" element={<CheckEmail />} />
      <Route path="/createNewPassword" element={<CreateNewPassword />} />
      <Route path="/passwordResetSuccess" element={<PasswordResetSuccess />} />

      <Route element={<PrivateRouting />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardIndex />} />
          <Route path="hospitalOverview" element={<HospitalOverview />} />
          <Route path="hospitalDashboard" element={<HospitalOverview />} />
          <Route path="verifyPatient" element={<VerifyPatient />} />
          <Route
            path="patientDetails/:patientId"
            element={<PatientDetails />}
          />
          <Route path="uploadedBills" element={<UploadedBills />} />
          <Route path="verificationHistory" element={<VerificationHistory />} />
          <Route
            path="notificationsHospital"
            element={<NotificationsHospital />}
          />
          <Route path="settingsHospital" element={<SettingsHospital />} />
          <Route path="settings" element={<Settings />} />
          <Route path="pregnancyTracker" element={<PregnancyTracker />} />
          <Route path="emergencyWallet" element={<EmergencyWallet />} />
          <Route path="addFunds" element={<AddFunds />} />
          <Route path="healthGuidance" element={<HealthGuidance />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;
