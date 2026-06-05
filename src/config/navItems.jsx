import {
  FiGrid,
  FiHeart,
  FiCreditCard,
  FiBookOpen,
  FiBell,
  FiUser,
} from "react-icons/fi";

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
    label: "Hospital Overview",
    icon: <FiGrid size={20} />,
    end: true,
  },
  {
    path: "/dashboard/hospitalDashboard",
    label: "Hospital Dashboard",
    icon: <FiGrid size={20} />,
  },
];

export const getNavItems = (role) =>
  role === "hospital" ? hospitalNavItems : motherNavItems;
