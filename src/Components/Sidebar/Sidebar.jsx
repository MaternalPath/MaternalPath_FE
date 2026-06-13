import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useRole } from "../../context/RoleContext";
import { getNavItems } from "../../config/navItems";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const navItems = getNavItems(role);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole("mother");
    navigate("/login");
  };

  return (
    <aside className="sidebar-navi">
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <span className="sidebar-icon">
          <FiLogOut size={18} />
        </span>
        <span className="sidebar-label">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
