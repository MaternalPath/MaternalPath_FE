import { NavLink } from "react-router-dom";
import { useRole } from "../../context/RoleContext";
import { getNavItems } from "../../config/navItems";
import "./Sidebar.css";

const Sidebar = () => {
  const { role } = useRole();
  const navItems = getNavItems(role);

  return (
    <aside className="sidebar">
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
    </aside>
  );
};

export default Sidebar;
