import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignUpAdmin.css";
import AuthFooter from "../../../Components/AuthHr&FrComponent/Fotter/AuthFooter";
import AuthHeader from "../../../Components/AuthHr&FrComponent/Header/AuthHeader";
import Progress from "../../../Components/AuthHr&FrComponent/ProgressBar/Progress";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUpAdmin = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const role = state?.role || "doctor";

  const [showPassword, setShowPassword] = useState(false);
  const [showText, setShowText] = useState(false);

  const [Passmeet, setPassmeet] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [formData, setFormData] = useState({
    hospitalName: "",
    email: "",
    phoneNumber: "",
    password: "",
    hospitalAddress: "",
  });

  const [errMsg, setErrMsg] = useState({
    err: false,
    name: "",
    msg: "",
  });

  const catchHospitalName = (e) => {
    setShowText(false);
    const newHospitalName = e.target.value;
    setFormData({ ...formData, hospitalName: newHospitalName });
    if (newHospitalName.trim() === "") {
      setErrMsg({
        err: true,
        name: "hospitalName",
        msg: "Hospital name is required",
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
        msg: "Phone number is required",
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
        msg: "Password is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const handlePasswordBlur = () => {
    setShowText(false);
  };

  const catchHospitalAddress = (e) => {
    setShowText(false);
    const newAddress = e.target.value;
    setFormData({ ...formData, hospitalAddress: newAddress });
    if (newAddress.trim() === "") {
      setErrMsg({
        err: true,
        name: "hospitalAddress",
        msg: "Hospital address is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const validateAllFields = () => {
    if (formData.hospitalName.trim() === "") {
      setErrMsg({ err: true, name: "hospitalName", msg: "Hospital name is required" });
      return false;
    }
    if (formData.email.trim() === "") {
      setErrMsg({ err: true, name: "email", msg: "Email is required" });
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setErrMsg({ err: true, name: "email", msg: "Enter a valid email" });
      return false;
    }
    if (formData.phoneNumber.trim() === "") {
      setErrMsg({ err: true, name: "phoneNumber", msg: "Phone number is required" });
      return false;
    }
    if (formData.password.trim() === "") {
      setErrMsg({ err: true, name: "password", msg: "Password is required" });
      return false;
    }
    const allPassValid = Object.values(Passmeet).every(Boolean);
    if (!allPassValid) {
      setErrMsg({ err: true, name: "password", msg: "Password doesn't meet all requirements" });
      return false;
    }
    if (formData.hospitalAddress.trim() === "") {
      setErrMsg({ err: true, name: "hospitalAddress", msg: "Hospital address is required" });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAllFields()) return;
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
                onChange={catchHospitalName}
                onBlur={catchHospitalName}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--error-color" }}>
                {errMsg.msg && errMsg.name === "hospitalName" ? errMsg.msg : ""}
              </span>
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
                  onChange={catchEmail}
                  onBlur={catchEmail}
                  onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
                />
                <span style={{ color: "var(--error-color)" }}>
                  {errMsg.msg && errMsg.name === "email" ? errMsg.msg : ""}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+234 800 000 0000"
                  value={formData.phoneNumber}
                  onChange={catchPhoneNum}
                  onBlur={catchPhoneNum}
                  onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
                />
                <span style={{ color: "var(--error-color)" }}>
                  {errMsg.msg && errMsg.name === "phoneNumber" ? errMsg.msg : ""}
                </span>
              </div>
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

              <span style={{ color: "var(--error-color)" }}>
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
              <label htmlFor="hospitalAddress">Hospital Address</label>
              <input
                type="text"
                id="hospitalAddress"
                name="hospitalAddress"
                placeholder="Address"
                value={formData.hospitalAddress}
                onChange={catchHospitalAddress}
                onBlur={catchHospitalAddress}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "hospitalAddress" ? errMsg.msg : ""}
              </span>
            </div>

            <button type="submit" className="create-account-btn">
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