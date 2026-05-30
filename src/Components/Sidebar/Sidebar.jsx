import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineWallet } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import {
  MdSpaceDashboard,
  
 
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiLogOut, FiUserPlus } from "react-icons/fi";

const mainNav = [
  {
    label: "Dashboard Overview",
    icon: <MdSpaceDashboard />,
    path: "/dashboard",
  },
  {
    label: "Pregnancy Tracker",
    icon: <FaRegHeart />,
    path: "/dashboard/pregnancyTracker",
  },
  {
    label: "Emergency Wallet",
    icon: <AiOutlineWallet />,
    path: "/dashboard/emergencyWallet",
  },
  {
    label: "Health Guidance",
    icon: <IoBookOutline />,
    path: "/dashboard/healthGuidance",
  },
  {
    label: "Notifications",
    icon: <GoBell />,
    path: "/dashboard/notifications",
  },
  { label: "Profile", icon:<CgProfile />, path: "/dashboard/profile" },
];



const Sidebar = () => {
  const nav = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar-container">
      <div className="sidebars-wrapper">
  

        <nav className="sidebar-nav">
          {mainNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.label}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                onClick={() => nav(item.path)}
              >
                <span className="sidebar-nav-icon">{item.icon}</span>
                <span className="sidebar-nav-label">{item.label}</span>
              </div>
            );
          })}
        </nav>

         </div>
    
    </aside>
  );
  
};

export default Sidebar;
