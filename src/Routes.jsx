import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./Pages/SignUp/SignUpPatient/SignUpUser";
import FAQ from "./Pages/FAQ/FAQ";
import How from "./Pages/How/How";
import LandingPage from "./pages/landingPage/landingPage";
import About from "./Pages/About/About";

import Dashboard from "./pages/Dashboard/Dashboard";
import PregnancyTracker from "./Pages/PregnancyTracker/PregnancyTracker";
import EmergencyWallet from "./Pages/EmergencyWallet/EmergencyWallet";
import HealthGuidance from "./Pages/HealthGuidance/HealthGuidance";
import Notifications from "./Pages/Notifications/Notifications";
import DashboardHome from "./Pages/DashboardHome/DashboardHome";
import Profile from "./Pages/Profile/Profile";
import GetStarted from "./Pages/GetStartedPage/GetStarted";
import SignUpAdmin from "./Pages/SignUp/SignUpHos/SignUpAdmin";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/how" element={<How />} />
      <Route path="/about" element={<About />} />
      <Route path="/signupUser" element={<Signup />} />
      <Route path="/signupHospital" element={<SignUpAdmin />} />
      <Route path="/getStarted" element={<GetStarted />} />

      <Route path="/faq" element={<FAQ />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="pregnancyTracker" element={<PregnancyTracker />} />
        <Route path="emergencyWallet" element={<EmergencyWallet />} />
        <Route path="healthGuidance" element={<HealthGuidance />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
