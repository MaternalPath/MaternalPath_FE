import React from "react";
import "./Css/TermsSidebar.css";

const sections = [
  { id: "welcome", label: "Welcome to MaternalPath" },
  { id: "eligibility", label: "1. Eligibility" },
  { id: "disclaimer", label: "2. Medical Disclaimer" },
  { id: "tracking", label: "3. Pregnancy Tracking" },
  { id: "wallet", label: "4. Emergency Wallet" },
  { id: "hospital", label: "5. Hospital Services" },
  { id: "responsibilities", label: "6. User Responsibilities" },
  { id: "privacy", label: "7. Privacy & Data" },
  { id: "liability", label: "8. Limitation of Liability" },
  { id: "changes", label: "9. Changes to Terms" },
  { id: "contact", label: "10. Contact Us" },
];

const TermsSidebar = ({ activeSection, onSectionClick }) => {
  return (
    <aside className="terms-sidebar">
      <p className="sidebar-title">ON THIS PAGE</p>
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

export default TermsSidebar;
