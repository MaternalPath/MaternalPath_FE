import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRole } from "./context/RoleContext";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/SignUp/SignUpPatient/SignUpUser";
import FaqHome from "./Pages/FAQ/FaqHome";
import How from "./Pages/How/How";
import LandingPage from "./Pages/LandingPage/landingPage";
import About from "./Pages/About/About";
import VerifyHosOTP from './Pages/OtpFolder/OtpHospital/VerifyHosOTP'
import Dashboard from "./Pages/Dashboard/Dashboard";
import PregnancyTracker from "./Pages/PregnancyTracker/PregnancyTracker";
import EmergencyWallet from "./Pages/EmergencyWallet/EmergencyWallet";
import AddFunds from "./Components/EmergencyComponent/AddFundCom/AddFunds";
import HealthGuidance from "./Pages/HealthGuidance/HealthGuidance";
import Notifications from "./Pages/Notifications/Notifications";
import DashboardHome from "./Pages/DashboardHome/DashboardHome";
import HospitalOverview from "./Pages/HospitalOverview/HospitalOverview";
import Profile from "./Pages/Profile/Profile";
import GetStarted from "./Pages/GetStartedPage/GetStarted";
import SignUpAdmin from "./Pages/SignUp/SignUpHos/SignUpAdmin";
import VerifyOTP from "./Pages/OtpFolder/VerifyOTP";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import CheckEmail from "./Pages/ForgotPassword/CheckEmail";
import CreateNewPassword from "./Pages/ForgotPassword/CreateNewPassword";
import PasswordResetSuccess from "./Pages/ForgotPassword/PasswordResetSuccess";

const DashboardIndex = () => {
  const { role } = useRole();
  return role === "hospital" ? (
    <Navigate to="/dashboard/hospitalOverview" replace />
  ) : (
    <DashboardHome />
  );
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/how" element={<How />} />
      <Route path="/about" element={<About />} />
      <Route path="/signupUser" element={<Signup />} />
      <Route path="/signupHospital" element={<SignUpAdmin />} />
      <Route path="/getStarted" element={<GetStarted />} />
      <Route path="/otpVerification" element={<VerifyOTP />} />
      <Route path="/otpVerificationHos" element={<VerifyHosOTP  />} />

      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/checkEmail" element={<CheckEmail />} />
      <Route path="/createNewPassword" element={<CreateNewPassword />} />
      <Route path="/passwordResetSuccess" element={<PasswordResetSuccess />} />

      <Route path="/faq" element={<FaqHome />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardIndex />} />
        <Route path="hospitalOverview" element={<HospitalOverview />} />
        <Route path="hospitalDashboard" element={<HospitalOverview />} />
        <Route path="pregnancyTracker" element={<PregnancyTracker />} />
        <Route path="emergencyWallet" element={<EmergencyWallet />} />
        <Route path="add-funds" element={<AddFunds />} />
        <Route path="healthGuidance" element={<HealthGuidance />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
