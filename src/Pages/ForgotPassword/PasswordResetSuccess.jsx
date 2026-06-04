import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import "./Css/ForgotPassword.css";
import logo from "../../assets/header.png";
import backgroundImage from "../../assets/pana.png";

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={logo} alt="MaternalPath" className="auth-logo" />
        <img
          src={backgroundImage}
          alt="Secure Account Recovery"
          className="auth-illustration"
        />
        <h3>Secure Account Recovery</h3>
        <p>
          Your maternal health journey is protected with industry-leading
          security protocols
        </p>
      </div>

      <div className="auth-right">
        <div className="icon-circle success">
          <FiCheckCircle size={32} />
        </div>
        <h2>Password Reset Successful</h2>
        <p className="auth-subtitle">
          Your password has been updated successfully. You can now sign in using
          your new credentials.
        </p>

        <button onClick={() => navigate("/login")} className="btn-primary">
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
