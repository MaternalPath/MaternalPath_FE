import { useState } from "react";
import "./header.css";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "/src/assets/header.png";
import { useRole } from "../../context/RoleContext";

const Header = () => {
  const nav = useNavigate();
  const { token, logout } = useRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    nav("/login");
    closeMobileMenu();
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/how", label: "How It Works" },
    { path: "/about", label: "About" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <header className="header-container">
      <div className="header-wrapper">
        <div className="header">
          <div className="header-left">
            <img
              className="header-left-image"
              src={logo}
              alt="MaternalPath"
              onClick={() => nav("/")}
            />
          </div>

          <div className="header-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="header-right">
            {token ? (
              <>
                <button className="header-right-1" onClick={handleLogout}>
                  Log Out
                </button>
                <button
                  className="header-right-2"
                  onClick={() => nav("/dashboard")}
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  className="header-right-1"
                  onClick={() => nav("/login")}
                >
                  Log In
                </button>
                <button
                  className="header-right-2"
                  onClick={() => nav("/getStarted")}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            className="header-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="header-mobile-menu open">
          <div className="header-mobile-header">
            <img src={logo} alt="MaternalPath" className="header-mobile-logo" />
            <button className="header-mobile-close" onClick={closeMobileMenu}>
              <FiX size={24} />
            </button>
          </div>

          <nav className="header-mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `header-mobile-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-mobile-actions">
            {token ? (
              <>
                <button className="header-right-1" onClick={handleLogout}>
                  Log Out
                </button>
                <button
                  className="header-right-2"
                  onClick={() => {
                    nav("/dashboard");
                    closeMobileMenu();
                  }}
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  className="header-right-1"
                  onClick={() => {
                    nav("/login");
                    closeMobileMenu();
                  }}
                >
                  Log In
                </button>
                <button
                  className="header-right-2"
                  onClick={() => {
                    nav("/getStarted");
                    closeMobileMenu();
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
