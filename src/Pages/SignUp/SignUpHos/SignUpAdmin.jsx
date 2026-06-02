import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignUpAdmin.css";
import AuthFooter from "../../../Components/AuthHr&FrComponent/Fotter/AuthFooter";
import AuthHeader from "../../../Components/AuthHr&FrComponent/Header/AuthHeader";
import Progress from "../../../Components/AuthHr&FrComponent/ProgressBar/Progress";

const SignUpAdmin = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const role = state?.role || "doctor";

  const [formData, setFormData] = useState({
    hospitalName: "",
    email: "",
    phoneNumber: "",
    password: "",
    hospitalAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hospital form submitted:", formData);
    nav("/otpVerification", { state: { role } });
  };
  const roleText =
    role === "doctor" ? "Healthcare Professional" : "Pregnant Mother";

  return (
    <main className="signup-page">
      <AuthHeader />
      <Progress currentStep={2} />

      <main className="signup-container">
        <section className="signup-card">
          <h1 className="signup-title">Create Professional Account</h1>
          <p className="signup-subtitle">Join as a {roleText}</p>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="hospitalName">Hospital Name</label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                placeholder="Hospital Name"
                value={formData.hospitalName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="professional@hospital.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+234 800 000 0000"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hospitalAddress">Hospital Address</label>
              <input
                type="text"
                id="hospitalAddress"
                name="hospitalAddress"
                placeholder="Address"
                value={formData.hospitalAddress}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="create-account-btn"
              onClick={() => nav("/otpVerification")}
            >
              Create Professional Account
            </button>
          </form>

          <p className="review-text">
            Your account will be reviewed for verification within 24-48 hours.
          </p>

          <p className="terms-text">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="terms-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="terms-link">
              Privacy Policy
            </a>
          </p>
        </section>
      </main>
      <AuthFooter />
    </main>
  );
};

export default SignUpAdmin;
