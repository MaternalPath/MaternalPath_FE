import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";
import { FiChevronLeft } from "react-icons/fi";

import "./Css/PrivacySettings.css";
import { useNavigate } from "react-router-dom";

const PrivacySettings = () => {
  const nav = useNavigate()
  const [activeSection, setActiveSection] = useState("data-sharing");
  const [hasChanges, setHasChanges] = useState(false);
  const [settings, setSettings] = useState({
    sharePregnancyInfo: true,
    shareWalletInfo: true,
    shareMedicalUpdates: true,
    healthRecommendations: true,
    progressUpdates: true,
    appointmentReminders: true,
    savingsNotifications: true,
    productUpdates: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setHasChanges(true);
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    setHasChanges(false);
  };

  return (
    <div className="privacy-settings-page">
      <header className="privacy-settings-header">
        <div className="header-content">
          <div>
            <div className="breadcrumb" onClick={() => nav(-1)}>
              <FiChevronLeft className="breadcrumb-icon" />
              <span>Home</span>
              <span>/</span>
              <span>Privacy Settings</span>
            </div>
            <h1>Privacy Settings</h1>
            <p className="subtitle">Manage your personal and pregnancy data</p>
          </div>
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Settings
          </button>
        </div>
      </header>

      <div className="privacy-settings-body">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
        />
        <SettingsContent
          settings={settings}
          onToggle={handleToggle}
          onVisibleSectionChange={setActiveSection}
        />
      </div>
    </div>
  );
};

export default PrivacySettings;
