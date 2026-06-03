import React, { useState } from "react";
import Footer1 from "../../Components/Footer1/Footer1";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiInfo,
  FiChevronLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { PiHeart, PiStethoscope } from "react-icons/pi";
import "./login.css";
import logo from "../../assets/Login.png"; 
import Header2 from "../../Components/Header2/Header2";

const LoginPM = () => {
  const [userType, setUserType] = useState("mother");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, userType });
  };

  return (
    <>
      <Header2 />
      <div className="mp-wrap">
        <div className="mp-container">
          <div className="mp-content">
            <div className="mp-card">
              <h1>Welcome Back</h1>
              <p className="mp-subtitle">
                Continue your pregnancy journey with guidance, preparedness, and
                care.
              </p>

              <div className="mp-role-section">
                <span className="mp-label">SIGN IN AS</span>
                <div className="mp-role-toggle">
                  <button
                    type="button"
                    className={userType === "mother" ? "active" : ""}
                    onClick={() => setUserType("mother")}
                  >
                    <PiHeart /> Pregnant Mother
                  </button>
                  <button
                    type="button"
                    className={userType === "professional" ? "active" : ""}
                    onClick={() => setUserType("professional")}
                  >
                    <PiStethoscope /> Healthcare Professional
                  </button>
                </div>
              </div>

              <div className="mp-info-card">
                <PiHeart />
                Sign in to access your pregnancy tracker, health guidance, and
                emergency wallet.
              </div>

              <form onSubmit={handleSubmit} className="mp-form">
                <div className="mp-field">
                  <label>EMAIL ADDRESS OR PHONE NUMBER</label>
                  <div className="mp-input">
                    <FiMail />
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email or phone"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mp-field">
                  <label>PASSWORD</label>
                  <div className="mp-input">
                    <FiLock />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="mp-eye"
                      onClick={() => setShowPassword(!showPassword)}
                    ></button>
                  </div>
                </div>

                <div className="mp-form-options">
                  <label className="mp-remember">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="mp-btn-login">
                  Log In <FiArrowRight />
                </button>
              </form>

              <p className="mp-create">
                Don't have an account? <a href="/signup">Create Account</a>
              </p>

              <div className="mp-divider">or continue with</div>

              <button className="mp-btn-google">
                <FcGoogle size={18} /> Google
              </button>

              <div className="mp-encryption">
                <FiInfo />
                Your information is securely protected with end-to-end
                encryption.
              </div>

              <div className="mp-card-links">
                <a href="/for-mothers">For Pregnant Mothers &gt;</a>
                <a href="/for-professionals">
                  For Healthcare Professionals &gt;
                </a>
              </div>
            </div>

            <div className="mp-right">
              <div className="mp-right-inner">
                <h2>
                  Your Pregnancy Journey,
                  <br />
                  Fully Supported
                </h2>
                <p>
                  Pregnancy tracking, health guidance, and emergency wallet —
                  all in one place.
                </p>

                <img
                  src={logo}
                  alt="MaternalPath app preview"
                  className="mp-illustration"
                />

                <div className="mp-chips">
                  <span>Pregnancy Tracker</span>
                  <span>Emergency Wallet</span>
                  <span>Health Guidance</span>
                  <span>Hospital Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
         
      </div>
       <Footer1 />
    
    </>
  );
};

export default LoginPM;
