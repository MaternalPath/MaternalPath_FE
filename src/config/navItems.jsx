import {
  FiGrid,
  FiHeart,
  FiCreditCard,
  FiBookOpen,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { LuDownload } from "react-icons/lu";
import { TbFileDescription } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa"; // ✅ Import for View All Patient

export const motherNavItems = [
  {
    path: "/dashboard",
    label: "Dashboard Overview",
    icon: <FiGrid size={20} />,
    end: true,
  },
  {
    path: "/dashboard/pregnancyTracker",
    label: "Pregnancy Tracker",
    icon: <FiHeart size={20} />,
  },
  {
    path: "/dashboard/emergencyWallet",
    label: "Emergency Wallet",
    icon: <FiCreditCard size={20} />,
  },
  {
    path: "/dashboard/healthGuidance",
    label: "Health Guidance",
    icon: <FiBookOpen size={20} />,
  },
  {
    path: "/dashboard/notifications",
    label: "Notifications",
    icon: <FiBell size={20} />,
  },
  {
    path: "/dashboard/profile",
    label: "Profile",
    icon: <FiUser size={20} />,
  },
];

export const hospitalNavItems = [
  {
    path: "/dashboard/hospitalOverview",
    label: "Dashboard Overview",
    icon: <FiGrid size={20} />,
    end: true,
  },
  {
    path: "/dashboard/verifyPatient",
    label: "Verify Patient Funds",
    icon: <BiSearch size={25} />,
  },
  {
    path: "/dashboard/uploadedBills",
    label: "Uploaded Bills",
    icon: <LuDownload size={20} />,
  },
  {
    path: "/dashboard/verificationHistory",
    label: "Verification History",
    icon: <TbFileDescription size={20} />,
  },
  {
    path: "/dashboard/viewAllPatient",
    label: "View All Patient",
    icon: <FaUsers size={20} />,
  },
  {
    path: "/dashboard/notificationsHospital",
    label: "Notifications Hospital",
    icon: <IoNotificationsOutline size={20} />,
  },
  {
    path: "/dashboard/settingsHospital",
    label: "Settings",
    icon: <IoSettingsOutline size={20} />,
  },
];

export const getNavItems = (role) =>
  role === "hospital" ? hospitalNavItems : motherNavItems;
