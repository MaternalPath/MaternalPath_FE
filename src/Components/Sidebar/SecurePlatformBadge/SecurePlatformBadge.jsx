import React from "react";
import "./Styles/SecurePlatformBadge.css";
import { FaShieldAlt } from "react-icons/fa";

const SecurePlatformBadge = ({ variant = "light" }) => {
  return (
    <div className={`secure-platform-badge secure-platform-${variant}`}>
      <div className="secure-header">
        <div className="secure-icons-wrapper">
          <FaShieldAlt className="secure-icons" />
        </div>
        <h4 className="secure-title">Secure Platform</h4>
      </div>
      <p className="secure-description">
        Protected maternal records &amp; authorized hospital access
      </p>
    </div>
  );
};

export default SecurePlatformBadge;
