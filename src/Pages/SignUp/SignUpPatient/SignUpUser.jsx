import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SignUpUser.css";
import AuthHeader from "../../../Components/AuthHr&FrComponent/Header/AuthHeader";
import AuthFooter from "../../../Components/AuthHr&FrComponent/Fotter/AuthFooter";
import Progress from "../../../Components/AuthHr&FrComponent/ProgressBar/Progress";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const role = state?.role || "mother";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showText, setShowText] = useState(false);

  const [Passmeet, setPassmeet] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errMsg, setErrMsg] = useState({
    err: false,
    name: "",
    msg: "",
  });

  const catchFirstName = (e) => {
    setShowText(false);
    const newFirstName = e.target.value;
    setFormData({ ...formData, firstName: newFirstName });
    if (newFirstName.trim() === "") {
      setErrMsg({
        err: true,
        name: "firstName",
        msg: "Your first name is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const catchLastName = (e) => {
    setShowText(false);
    const newLastName = e.target.value;
    setFormData({ ...formData, lastName: newLastName });
    if (newLastName.trim() === "") {
      setErrMsg({
        err: true,
        name: "lastName",
        msg: "Your last name is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const catchEmail = (e) => {
    setShowText(false);
    const newEmail = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setFormData({ ...formData, email: newEmail });
    if (newEmail.trim() === "") {
      setErrMsg({
        err: true,
        name: "email",
        msg: "Email is required",
      });
    } else if (!emailRegex.test(newEmail)) {
      setErrMsg({
        err: true,
        name: "email",
        msg: "Enter a valid email",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const catchPhoneNum = (e) => {
    setShowText(false);
    const newPhoneNum = e.target.value;
    setFormData({ ...formData, phoneNumber: newPhoneNum });
    if (newPhoneNum.trim() === "") {
      setErrMsg({
        err: true,
        name: "phoneNumber",
        msg: "Your phone number is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const catchPassword = (e) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    setShowText(true);

    setPassmeet({
      length: newPassword.length >= 8,
      upper: /[A-Z]/.test(newPassword),
      lower: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword),
    });

    if (newPassword.trim() === "") {
      setErrMsg({
        err: true,
        name: "password",
        msg: "Your password is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const handlePasswordBlur = () => {
    setShowText(false);
  };

  const catchConfrimPass = (e) => {
    setShowText(false);
    const newConfirmPass = e.target.value;
    setFormData({ ...formData, confirmPassword: newConfirmPass });
    if (newConfirmPass.trim() === "") {
      setErrMsg({
        err: true,
        name: "confirmPassword",
        msg: "Confirm your password",
      });
    } else if (newConfirmPass !== formData.password) {
      setErrMsg({
        err: true,
        name: "confirmPassword",
        msg: "Passwords do not match",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const validateAllFields = () => {
    if (formData.firstName.trim() === "") {
      setErrMsg({ err: true, name: "firstName", msg: "Your first name is required" });
      return false;
    }
    if (formData.lastName.trim() === "") {
      setErrMsg({ err: true, name: "lastName", msg: "Your last name is required" });
      return false;
    }
    if (formData.email.trim() === "") {
      setErrMsg({ err: true, name: "email", msg: "Email is required" });
      return false;
    }
    if (formData.phoneNumber.trim() === "") {
      setErrMsg({ err: true, name: "phoneNumber", msg: "Your phone number is required" });
      return false;
    }
    if (formData.password.trim() === "") {
      setErrMsg({ err: true, name: "password", msg: "Your password is required" });
      return false;
    }
    const allPassValid = Object.values(Passmeet).every(Boolean);
    if (!allPassValid) {
      setErrMsg({ err: true, name: "password", msg: "Password doesn't meet all requirements" });
      return false;
    }
    if (formData.confirmPassword !== formData.password) {
      setErrMsg({ err: true, name: "confirmPassword", msg: "Passwords do not match" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAllFields()) return;
    nav("/otpVerification", { state: { role } });
  };

  const roleText = role === "mother" ? "Pregnant Mother" : "Healthcare Professional";

  return (
    <main className="signup-page">
      <AuthHeader />
      <Progress currentStep={2} />

      <main className="signup-container">
        <section className="signup-card">
          <h1 className="signup-title">Create Your Account</h1>
          <p className="signup-subtitle">Join as a {roleText}</p>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={catchFirstName}
                onBlur={catchFirstName}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--primary-tone)" }}>
                {errMsg.msg && errMsg.name === "firstName" ? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={catchLastName}
                onBlur={catchLastName}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--primary-tone)" }}>
                {errMsg.msg && errMsg.name === "lastName" ? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={catchEmail}
                onBlur={catchEmail}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--primary-tone)" }}>
                {errMsg.msg && errMsg.name === "email" ? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+234 812 345 6789"
                value={formData.phoneNumber}
                onChange={catchPhoneNum}
                onBlur={catchPhoneNum}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--primary-tone)" }}>
                {errMsg.msg && errMsg.name === "phoneNumber" ? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={catchPassword}
                  onFocus={() => {
                    setShowText(true);
                    setErrMsg({ err: false, name: "", msg: "" });
                  }}
                  onBlur={handlePasswordBlur}
                  style={{ paddingRight: "45px" }}
                />
                <button
                  type="button"
                  className="toggle_password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>

              <span style={{ color: "var(--primary-tone)" }}>
                {errMsg.msg && errMsg.name === "password" ? errMsg.msg : ""}
              </span>

              {showText && (
                <div className="password-requirements">
                  <p className={`requirement-item ${Passmeet.length ? "valid" : ""}`}>
                    {Passmeet.length ? "✔" : "●"} Must have 8+ characters
                  </p>
                  <p className={`requirement-item ${Passmeet.upper ? "valid" : ""}`}>
                    {Passmeet.upper ? "✔" : "●"} Must contain uppercase
                  </p>
                  <p className={`requirement-item ${Passmeet.lower ? "valid" : ""}`}>
                    {Passmeet.lower ? "✔" : "●"} Must contain lowercase
                  </p>
                  <p className={`requirement-item ${Passmeet.number ? "valid" : ""}`}>
                    {Passmeet.number ? "✔" : "●"} Must contain numbers
                  </p>
                  <p className={`requirement-item ${Passmeet.special ? "valid" : ""}`}>
                    {Passmeet.special ? "✔" : "●"} Add special characters
                  </p>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={catchConfrimPass}
                  onBlur={catchConfrimPass}
                  onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
                  style={{ paddingRight: "45px" }}
                />
                <button
                  type="button"
                  className="toggle_password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
              <span style={{ color: "var(--primary-tone)" }}>
                {errMsg.msg && errMsg.name === "confirmPassword" ? errMsg.msg : ""}
              </span>
            </div>

            <button
              type="submit"
              className="create-account-btn"
            >
              Create Account
            </button>
          </form>

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

export default SignUp;