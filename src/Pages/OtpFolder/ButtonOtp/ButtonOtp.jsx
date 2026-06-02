import React from "react";
import "./ButtonOtp.css";

const ButtonOtp = () => {
  const verificationTypes = [
    { id: 1, name: "Account Creation" },
    { id: 2, name: "Login Verification" },
    { id: 3, name: "Wallet Authorization" },
    { id: 4, name: "Hospital Approval" },
  ];

  return (
    <div className="type-buttons">
      {verificationTypes.map((type) => (
        <button key={type.id} className="type-btn">
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonOtp;
