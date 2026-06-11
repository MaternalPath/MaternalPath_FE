import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Css/ForgotPassword.css";
import logo from "../../assets/header.png";
import backgroundImage from "../../assets/pana.png";

const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const role = location.state?.role || 'mother';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === 'hospital' ? 'hospital/forgot-password' : 'mother/forgot-password';

    try {
      if (baseURL) {
        await axios.post(`${baseURL}/${endpoint}`, { email });
      }
      navigate('/checkEmail', { state: { email, role } });
    } catch (error) {
      toast.error('Unable to send reset email. Please try again.');
    }
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
        <h2>Forgot Password?</h2>
        <p className="auth-subtitle">
          Enter the email address for your {role === 'hospital' ? 'Healthcare Professional' : 'Pregnant Mother'} account and we'll send you a secure password reset link.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FiMail className="svg" size={16} />
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className= "inputSpace"
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary">
            Send Reset Link</button>
        </form>
        
        <Link to="/login" className="back-link">
          <FiArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword