import React, { useEffect, useRef } from "react";
import {
  FiFileText,
  FiCreditCard,
  FiActivity,
  FiChevronRight,
  FiSmartphone,
  FiClock,
  FiAlertTriangle,
  FiZap,
} from "react-icons/fi";
import "./Css/SettingsContent.css";

const SettingsContent = ({ settings, onToggle, onVisibleSectionChange }) => {
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisibleSectionChange(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [onVisibleSectionChange]);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button
      className={`toggle-switch ${checked ? "on" : "off"}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <span className="toggle-knob"></span>
    </button>
  );

  return (
    <main className="settings-content">
      <section
        id="data-sharing"
        ref={setRef("data-sharing")}
        className="content-cards"
      >
        <p className="section-desc">
          Manage how your personal and pregnancy information is stored and
          shared.
        </p>
        <h3 className="header-text">Data Sharing</h3>

        <div className="setting-item">
          <div className="setting-icon-box">
            <FiFileText />
          </div>
          <div className="setting-info">
            <p className="setting-title">
              Share Pregnancy Information With Selected Hospital
            </p>
            <p className="setting-desc">
              Allow your chosen hospital to access pregnancy-related
              information.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.sharePregnancyInfo}
            onChange={() => onToggle("sharePregnancyInfo")}
          />
        </div>

        <div className="setting-item">
          <div className="setting-icon-box">
            <FiCreditCard />
          </div>
          <div className="setting-info">
            <p className="setting-title">Share Emergency Wallet Information</p>
            <p className="setting-desc">
              Allow participating healthcare providers to verify wallet
              readiness status.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.shareWalletInfo}
            onChange={() => onToggle("shareWalletInfo")}
          />
        </div>

        <div className="setting-item">
          <div className="setting-icon-box">
            <FiActivity />
          </div>
          <div className="setting-info">
            <p className="setting-title">
              Share Medical Updates With Healthcare Providers
            </p>
            <p className="setting-desc">
              Allow healthcare professionals to view updates relevant to your
              care.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.shareMedicalUpdates}
            onChange={() => onToggle("shareMedicalUpdates")}
          />
        </div>
      </section>

      <div className="mobile-wrapper-bg">
        <h3 className="header-text">Communication & Notifications</h3>
      <section
        id="communication"
        ref={setRef("communication")}
        className="content-cards"
      >
        <div className="setting-row">
          <div className="setting-info">
            <p className="setting-title">Health & Wellness Recommendations</p>
            <p className="setting-desc">
              Daily tips tailored to your pregnancy stage.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.healthRecommendations}
            onChange={() => onToggle("healthRecommendations")}
          />
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <p className="setting-title">Pregnancy Progress Updates</p>
            <p className="setting-desc">
              Weekly milestones and baby development info.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.progressUpdates}
            onChange={() => onToggle("progressUpdates")}
          />
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <p className="setting-title">Appointment Reminders</p>
            <p className="setting-desc">
              Notifications for prenatal checkups and tests.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.appointmentReminders}
            onChange={() => onToggle("appointmentReminders")}
          />
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <p className="setting-title">Savings Goal Notifications</p>
            <p className="setting-desc">
              Alerts for contribution reminders and milestones.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.savingsNotifications}
            onChange={() => onToggle("savingsNotifications")}
          />
        </div>

        <div className="setting-row">
          <div className="setting-info">
            <p className="setting-title">Product & Feature Updates</p>
            <p className="setting-desc">
              News about new platform tools and improvements.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.productUpdates}
            onChange={() => onToggle("productUpdates")}
          />
        </div>
      </section>
      </div>

      <section
        id="account-security"
        ref={setRef("account-security")}
        className="content-card"
      >
        <h3>Account Security</h3>

        <button className="action-item">
          <div className="action-icon-box">
            <FiSmartphone />
          </div>
          <div className="action-info">
            <p className="action-title">Two-Factor Authentication</p>
            <p className="action-desc">Add an extra layer of security</p>
          </div>
          <FiChevronRight className="action-chevron" />
        </button>

        <button className="action-item">
          <div className="action-icon-box">
            <FiClock />
          </div>
          <div className="action-info">
            <p className="action-title">Manage Active Sessions</p>
            <p className="action-desc">View and sign out of other devices</p>
          </div>
          <FiChevronRight className="action-chevron" />
        </button>

        <button className="action-item">
          <div className="action-icon-box">
            <FiActivity />
          </div>
          <div className="action-info">
            <p className="action-title">Login Activity</p>
            <p className="action-desc">Review your recent sign-ins</p>
          </div>
          <FiChevronRight className="action-chevron" />
        </button>
      </section>

      <section
        id="account-controls"
        ref={setRef("account-controls")}
        className="content-card"
      >
        <h3>Account Controls</h3>

        <button className="action-item danger">
          <div className="action-icon-box danger">
            <FiZap />
          </div>
          <div className="action-info">
            <p className="action-title">Deactivate Account</p>
            <p className="action-desc">Temporary suspension of your profile</p>
          </div>
          <FiChevronRight className="action-chevron" />
        </button>

        <button className="action-item danger">
          <div className="action-icon-box danger">
            <FiAlertTriangle />
          </div>
          <div className="action-info">
            <p className="action-title">Delete Account</p>
            <p className="action-desc">Permanently remove all your data</p>
          </div>
          <FiChevronRight className="action-chevron" />
        </button>
      </section>
    </main>
  );
};

export default SettingsContent;
