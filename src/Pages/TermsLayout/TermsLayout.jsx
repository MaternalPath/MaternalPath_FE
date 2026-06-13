import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import TermsSidebar from "./TermsSidebar";
import TermsContent from "./TermsContent";
import "./Css/TermsLayout.css";
import { useNavigate } from "react-router-dom";

const TermsLayout = () => {
  const nav = useNavigate();
  const [activeSection, setActiveSection] = useState("welcome");

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="terms-page">
      <header className="terms-header">
        <div className="breadcrumb" onClick={() => nav(-1)}>
          <FiChevronLeft className="breadcrumb-icon" />
          <span>Home</span>
          <span>/</span>
          <span>Terms & Conditions</span>
        </div>
        <h1>Terms & Conditions</h1>
        <p className="subtitle">
          Terms & Condition governing MaternalPath Platform
        </p>
      </header>

      <div className="terms-body">
        <TermsSidebar
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
        <TermsContent onVisibleSectionChange={setActiveSection} />
      </div>
    </div>
  );
};

export default TermsLayout;
