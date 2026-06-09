import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignUpAdmin.css";
import AuthFooter from "../../../Components/AuthHr&FrComponent/Fotter/AuthFooter";
import AuthHeader from "../../../Components/AuthHr&FrComponent/Header/AuthHeader";
import Progress from "../../../Components/AuthHr&FrComponent/ProgressBar/Progress";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const SignUpAdmin = () => {
  const nav = useNavigate();
  const { state } = useLocation();
  const role = state?.role || "doctor";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logoFileName, setLogoFileName] = useState("");
  const [docFileName, setDocFileName] = useState("");

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
    confirmPassword: "",
    hospitalAddress: "",
    deliveryFee: "",
    medicalLicenseNumber: "",
    hospitalLogo: null,
    verificationDocument: null,
  });

  const [errMsg, setErrMsg] = useState({
    err: false,
    name: "",
    msg: "",
  });

  const catchHospitalName = (e) => {
    setShowText(false);
    const newHospitalName = e.target.value;
    setFormData({...formData, hospitalName: newHospitalName });
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
    setFormData({...formData, email: newEmail });
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
    setFormData({...formData, phoneNumber: newPhoneNum });
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
    setFormData({...formData, password: newPassword });
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

  const catchConfirmPassword = (e) => {
    setShowText(false);
    const newConfirmPass = e.target.value;
    setFormData({...formData, confirmPassword: newConfirmPass });
    if (newConfirmPass.trim() === "") {
      setErrMsg({
        err: true,
        name: "confirmPassword",
        msg: "Confirm your password",
      });
    } else if (newConfirmPass!== formData.password) {
      setErrMsg({
        err: true,
        name: "confirmPassword",
        msg: "Passwords do not match",
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
    setFormData({...formData, hospitalAddress: newAddress });
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

  const catchDeliveryFee = (e) => {
    setShowText(false);
    const newFee = e.target.value;
    setFormData({...formData, deliveryFee: newFee });
    if (newFee.trim() === "") {
      setErrMsg({
        err: true,
        name: "deliveryFee",
        msg: "Delivery fee is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const catchMedicalLicense = (e) => {
    setShowText(false);
    const newLicense = e.target.value;
    setFormData({...formData, medicalLicenseNumber: newLicense });
    if (newLicense.trim() === "") {
      setErrMsg({
        err: true,
        name: "medicalLicenseNumber",
        msg: "Medical license number is required",
      });
    } else {
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const catchLogoUpload = (e) => {
    setShowText(false);
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrMsg({
          err: true,
          name: "hospitalLogo",
          msg: "File size must be less than 5MB",
        });
        return;
      }
      setFormData({...formData, hospitalLogo: file });
      setLogoFileName(file.name);
      setErrMsg({ err: false, name: "", msg: "" });
    }
  };

  const catchDocUpload = (e) => {
    setShowText(false);
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrMsg({
          err: true,
          name: "verificationDocument",
          msg: "File size must be less than 5MB",
        });
        return;
      }
      setFormData({...formData, verificationDocument: file });
      setDocFileName(file.name);
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
    if (formData.confirmPassword.trim() === "") {
      setErrMsg({ err: true, name: "confirmPassword", msg: "Confirm your password" });
      return false;
    }
    if (formData.confirmPassword !== formData.password) {
      setErrMsg({ err: true, name: "confirmPassword", msg: "Passwords do not match" });
      return false;
    }
    if (formData.hospitalAddress.trim() === "") {
      setErrMsg({ err: true, name: "hospitalAddress", msg: "Hospital address is required" });
      return false;
    }
    if (formData.deliveryFee.trim() === "") {
      setErrMsg({ err: true, name: "deliveryFee", msg: "Delivery fee is required" });
      return false;
    }
    if (formData.medicalLicenseNumber.trim() === "") {
      setErrMsg({ err: true, name: "medicalLicenseNumber", msg: "Medical license number is required" });
      return false;
    }
    if (!formData.hospitalLogo) {
      setErrMsg({ err: true, name: "hospitalLogo", msg: "Hospital logo is required" });
      return false;
    }
    if (!formData.verificationDocument) {
      setErrMsg({ err: true, name: "verificationDocument", msg: "Verification document is required" });
      return false;
    }
    return true;
  };

  const signUpApi = async () => {
    if (!baseURL) {
      console.error("VITE_BASE_URL is not defined");
      toast.error("Signup service is not configured. Please check VITE_BASE_URL.");
      return null;
    }

    setIsLoading(true);
    try {
      console.log('baseurl: ',baseURL)
      const url = `${baseURL}/hospital/register`;
      
      const data = new FormData();
      data.append("hospitalName", formData.hospitalName);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("password", formData.password);
      data.append('confirmPassword', formData.confirmPassword)
      data.append("address", formData.hospitalAddress);
      data.append("deliveryFee", formData.deliveryFee);
      data.append("medicalLicenseNumber", formData.medicalLicenseNumber);
      data.append("hospitalLogo", formData.hospitalLogo);
      data.append("verificationDocuments", formData.verificationDocument);

      const response = await axios.post(url, data);
      
      console.log("Signup response:", response);
      if (response?.status === 201) {
        toast.success(response?.data?.message || "Account created successfully");
      }
      return response;
    } catch (error) {
      console.error("Signup API error:", error);
      toast.error(error?.response?.data?.message || error.message || "Signup failed");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllFields()) return;
    console.log("Hospital form submitted:", formData);
    const response = await signUpApi();
    if (!response) return;
    nav("/otpVerificationHos", { state: { email: formData.email } });
  };

  const roleText =
    role === "doctor"? "Healthcare Professional" : "Pregnant Mother";

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
              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "hospitalName"? errMsg.msg : ""}
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
                  {errMsg.msg && errMsg.name === "email"? errMsg.msg : ""}
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
                  {errMsg.msg && errMsg.name === "phoneNumber"? errMsg.msg : ""}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword? "text" : "password"}
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
                  aria-label={showPassword? "Hide password" : "Show password"}
                >
                  {showPassword? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>

              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "password"? errMsg.msg : ""}
              </span>

              {showText && (
                <div className="password-requirements">
                  <p className={`requirement-item ${Passmeet.length? "valid" : ""}`}>
                    {Passmeet.length? "✔" : "●"} Must have 8+ characters
                  </p>
                  <p className={`requirement-item ${Passmeet.upper? "valid" : ""}`}>
                    {Passmeet.upper? "✔" : "●"} Must contain uppercase
                  </p>
                  <p className={`requirement-item ${Passmeet.lower? "valid" : ""}`}>
                    {Passmeet.lower? "✔" : "●"} Must contain lowercase
                  </p>
                  <p className={`requirement-item ${Passmeet.number? "valid" : ""}`}>
                    {Passmeet.number? "✔" : "●"} Must contain numbers
                  </p>
                  <p className={`requirement-item ${Passmeet.special? "valid" : ""}`}>
                    {Passmeet.special? "✔" : "●"} Add special characters
                  </p>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={catchConfirmPassword}
                  onBlur={catchConfirmPassword}
                  onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
                  style={{ paddingRight: "45px" }}
                />
                <button
                  type="button"
                  className="toggle_password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword? "Hide password" : "Show password"}
                >
                  {showConfirmPassword? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "confirmPassword"? errMsg.msg : ""}
              </span>
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
                {errMsg.msg && errMsg.name === "hospitalAddress"? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="deliveryFee">Delivery Fee</label>
              <input
                type="text"
                id="deliveryFee"
                name="deliveryFee"
                placeholder="₦ 500,000"
                value={formData.deliveryFee}
                onChange={catchDeliveryFee}
                onBlur={catchDeliveryFee}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "deliveryFee"? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="medicalLicenseNumber">Medical License Number</label>
              <input
                type="text"
                id="medicalLicenseNumber"
                name="medicalLicenseNumber"
                placeholder="Enter your license number"
                value={formData.medicalLicenseNumber}
                onChange={catchMedicalLicense}
                onBlur={catchMedicalLicense}
                onFocus={() => setErrMsg({ err: false, name: "", msg: "" })}
              />
              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "medicalLicenseNumber"? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="hospitalLogo">Hospital Logo</label>
              <div className={`file-upload-wrapper ${logoFileName? "has-file" : ""}`}>
                <input
                  type="file"
                  id="hospitalLogo"
                  name="hospitalLogo"
                  accept=".jpg,.jpeg,.png"
                  onChange={catchLogoUpload}
                  className="file-input"
                />
                <div className="file-upload-box">
                  <FiUpload className="upload-icon" />
                  <p className="upload-text">
                    Upload hospital Logo
                    <br />
                    JPG, or PNG (max 5MB)
                  </p>
                  {logoFileName && <p className="file-name">Selected: {logoFileName}</p>}
                </div>
              </div>
              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "hospitalLogo"? errMsg.msg : ""}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="verificationDocument">Verification Document</label>
              <div className={`file-upload-wrapper ${docFileName? "has-file" : ""}`}>
                <input
                  type="file"
                  id="verificationDocument"
                  name="verificationDocument"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={catchDocUpload}
                  className="file-input"
                />
                <div className="file-upload-box">
                  <FiUpload className="upload-icon" />
                  <p className="upload-text">
                    Upload medical license or professional certification
                    <br />
                    PDF, JPG, or PNG (max 5MB)
                  </p>
                  {docFileName && <p className="file-name">Selected: {docFileName}</p>}
                </div>
              </div>
              <span style={{ color: "var(--error-color)" }}>
                {errMsg.msg && errMsg.name === "verificationDocument"? errMsg.msg : ""}
              </span>
            </div>

            <button type="submit" className="create-account-btn" disabled={isLoading}>
              {isLoading? "Creating Account..." : "Create Professional Account"}
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
