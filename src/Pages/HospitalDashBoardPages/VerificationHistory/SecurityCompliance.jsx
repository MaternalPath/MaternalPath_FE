import React from "react";
import "./Styles/SecurityCompliance.css";
import { LuShield } from "react-icons/lu";
import { CiLock } from "react-icons/ci";
import { BsFileEarmarkCheck } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function SecurityCompliance() {
  const features = [
    {
      id: 1,
      icon: <LuShield />,
      label: "Secure maternal verification records",
    },
    {
      id: 2,
      icon: <CiLock />,
      label: "Encrypted healthcare data",
    },
    {
      id: 3,
      icon: <BsFileEarmarkCheck />,
      label: "Authorized hospital activity logs",
    },
    {
      id: 4,
      icon: <IoMdCheckmarkCircleOutline />,
      label: "Privacy compliance indicators",
    },
  ];

  return (
    <div className="security-compliance-container">
      <div className="security-compliance-content">
        <h2 className="security-compliance-title">Security & Compliance</h2>

        <div className="security-features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <p className="feature-label">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}