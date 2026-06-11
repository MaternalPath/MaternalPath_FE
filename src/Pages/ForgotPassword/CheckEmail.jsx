import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import "./Css/ForgotPassword.css";
import logo from "../../assets/header.png";
import backgroundImage from "../../assets/pana.png";

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  const role = location.state?.role || 'mother';
  const roleLabel = role === 'hospital' ? 'Healthcare Professional' : 'Pregnant Mother';

  const handleOpenEmail = () => {
    navigate('/createNewPassword', { state: { email, role } });
  };

  const handleResend = () => {
    navigate('/createNewPassword', { state: { email, role } });
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={logo} alt="MaternalPath" className="auth-logo" />
        <img src={backgroundImage} alt="Secure Account Recovery" className="auth-illustration" />
        <h3>Secure Account Recovery</h3>
        <p>Your maternal health journey is protected with industry-leading security protocols</p>
      </div>
      
      <div className="auth-right">
        <div className="icon-circle">
          <FiMail size={32} />
        </div>
        <h2>Check Your Email</h2>
        <p className="auth-subtitle">
          We've sent a password reset link to your {roleLabel} account.
        </p>
        <p className="email-text">{email}</p>
        <p className="auth-subtitle">Please check your inbox and follow the instructions to reset your password.</p>
        
        <button onClick={handleOpenEmail} className="btn-primary">Open Email App</button>
        <button onClick={handleResend} className="btn-secondary">Resend Link</button>
        
        <Link to="/login" className="back-link">
          <FiArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    </div>
  )
}

export default CheckEmail