import React from "react";
import "./Css/SettingsSidebar.css";

const sections = [
  { id: "data-sharing", label: "Data Sharing" },
  { id: "communication", label: "Communication & Notifications" },
  { id: "account-security", label: "Account Security" },
  { id: "account-controls", label: "Account Controls" },
];

const SettingsSidebar = ({ activeSection, onSectionClick }) => {
  return (
    <aside className="settings-sidebar">
      <p className="sidebar-title">SETTINGS</p>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <button
                className={activeSection === section.id ? "active" : ""}
                onClick={() => onSectionClick(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
