// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Footer1 from "../../Components/Footer1/Footer1";
// import { LuMoveLeft } from "react-icons/lu";
// import {
//   FiMail,
//   FiLock,
//   FiArrowRight,
//   FiInfo,
//   FiChevronLeft,
//   FiEye,
//   FiEyeOff,
// } from "react-icons/fi";
// import { FcGoogle } from "react-icons/fc";
// import { PiHeart, PiStethoscope } from "react-icons/pi";
// import "./login.css";
// import logo from "../../assets/Login.png";
// import Header2 from "../../Components/Header2/Header2";

// const LoginPM = () => {
// const [userType, setUserType] = useState("mother");
// const [showPassword, setShowPassword] = useState(false);
// const [formData, setFormData] = useState({
//   email: "",
//   password: "",
//   rememberMe: false,
// });

// const handleChange = (e) => {
//   const { name, value, type, checked } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: type === "checkbox" ? checked : value,
//   }));
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log({ ...formData, userType });
// };
// const nav = useNavigate();
// return (
//   <>
//     <Header2 />
//     <div className="mp-container">
//       <div className="mp">
//         <div className="mp-left">
//           <div className="mp-left-wrapper">
//             <div className="mp-left-up">
//               <div className="mp-left-up-wrapper">
//                 <div className="mp-left-2up">
//                   <div className="mp-left-2up-wrap">
//                     <h2>Welcome Back</h2>
//                     <p>
//                       Continue your pregnancy journey with guidance,
//                       preparedness,and care.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mp-left-center"></div>
//               <div className="mp-left-down"></div>
//             </div>
//           </div>
//         </div>
//         <div className="mp-right"></div>
{
  /* <div className="mp-content">
            <div className="mp-card">
              <h1>Welcome Back</h1>
              <p className="mp-subtitle">
                Continue your pregnancy journey with guidance, preparedness, and
                care.
              </p> */
}

{
  /* <div className="mp-role-section">
                <span className="mp-label">SIGN IN AS</span>
                <div className="mp-role-toggle"> */
}
{
  /* <button
                    type="button"
                    className={userType === "mother" ? "active" : ""}
                    onClick={() => setUserType("mother")}
                  >
                    <PiHeart /> Pregnant Mother
                  </button> */
}
{
  /* <button
                    type="button"
                    className={userType === "professional" ? "active" : ""}
                    onClick={() => setUserType("professional")}
                  >
                    <PiStethoscope /> Healthcare Professional
                  </button> */
}
{
  /* </div>
              </div> */
}
{
  /* 
              <div className="mp-info-card">
                Sign in to access your pregnancy tracker, health guidance, and
                emergency wallet.
              </div> */
}

{
  /* <form onSubmit={handleSubmit} className="mp-form">
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
                  <a href="/forgotPassword">Forgot Password?</a>
                </div>

                <button  type="submit" className="mp-btn-login"    onClick={() => {
                nav("/dashboard");
                closeMobileMenu();
              }}>
                  Log In <FiArrowRight />
                </button>  signupUser
              </form> */
}

{
  /* <p className="mp-create">
                Don't have an account? <a href="/signup"  onClick={() => {
                nav("/signupUser");
                closeMobileMenu();
              }}>Create Account</a>
              </p> */
}

{
  /* <div className="mp-divider">or continue with</div> */
}

{
  /* <button className="mp-btn-google">
                <FcGoogle size={18} /> Google
              </button> */
}

{
  /* <div className="mp-encryption">
                <FiInfo />
                Your information is securely protected with end-to-end
                encryption.
              </div> */
}

{
  /* <div className="mp-card-links">
                <a href="/for-mothers">For Pregnant Mothers &gt;</a>
                <a href="/for-professionals">
                  For Healthcare Professionals &gt;
                </a>
              </div> */
}
{
  /* </div> */
}

{
  /* <div className="mp-right">
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
            </div> */
}
{
  /* </div> */
}
{
  /* </div>
      </div>
      <Footer1 />
    </>
  );
};

export default LoginPM; */
}

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
  MdShield,
  MdError,
} from "react-icons/md";
import { FaBaby, FaBriefcaseMedical } from "react-icons/fa";
import { PiBaby } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { GiHospital } from "react-icons/gi";
import login from "../../assets/Login.png";
import { CiHeart } from "react-icons/ci";
import "./login.css";
import Header2 from "../../Components/Header2/Header2";

const LoginPage = () => {
  const [userType, setUserType] = useState("mother");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value.trim()) {
        error = "Email or phone is required";
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
        !/^\+?\d{10,15}$/.test(value)
      ) {
        error = "Enter a valid email or phone number";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.email = validateField("email", formData.email);
    newErrors.password = validateField("password", formData.password);

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!validateForm()) {
      return;
    }

    console.log("Form valid:", { userType, ...formData });
    setErrors({ submit: "Login successful! API not connected yet." });
  };

  const handleGoogleLogin = () => {
    setErrors({ submit: "Google login not connected yet" });
  };

  return (
    <>
      <Header2 />
      <div className="mp-login-container">
        <div className="mp-login-left">
          <div className="mp-login-card">
            <h1 className="mp-login-title">Welcome Back</h1>
            <p className="mp-login-subtitle">
              Continue your pregnancy journey with guidance, preparedness, and
              care.
            </p>

            <div className="mp-signin-as">
              <p>SIGN IN AS</p>
              <div className="mp-user-toggle">
                <button
                  type="button"
                  className={userType === "mother" ? "active" : ""}
                  onClick={() => setUserType("mother")}
                >
                  <PiBaby /> Pregnant Mother
                </button>
                <button
                  type="button"
                  className={userType === "professional" ? "active" : ""}
                  onClick={() => setUserType("professional")}
                >
                  <GiHospital /> Heaithcare Professional
                </button>
              </div>
            </div>

            <div className="mp-info-banner">
              <CiHeart />
              <span>
                Sign in to access your pregnancy tracker, health guidance, and
                emergency wallet.
              </span>
            </div>

            {errors.submit && (
              <div
                className={
                  errors.submit.includes("successful")
                    ? "mp-success-banner"
                    : "mp-error-banner"
                }
              >
                <MdError /> {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mp-login-form" noValidate>
              <div className="mp-form-group">
                <label>EMAIL ADDRESS OR PHONE NUMBER</label>
                <div
                  className={`mp-input-wrapper ${errors.email && touched.email ? "error" : ""}`}
                >
                  <MdEmail />
                  <input
                    type="text"
                    placeholder="Enter your email or phone"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="mp-error-text">{errors.email}</p>
                )}
              </div>

              <div className="mp-form-group">
                <label>PASSWORD</label>
                <div
                  className={`mp-input-wrapper ${errors.password && touched.password ? "error" : ""}`}
                >
                  <MdLock />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="123456"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                  />
                  <button
                    type="button"
                    className="mp-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="mp-error-text">{errors.password}</p>
                )}
              </div>

              <div className="mp-form-options">
                <label className="mp-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      handleChange("rememberMe", e.target.checked)
                    }
                  />
                  Remember me
                </label>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </div>

              <button type="submit" className="mp-login-btn">
                Log In <MdArrowForward />
              </button>

              <p className="mp-signup-text">
                Don't have an account? <Link to="/signup">Create Account</Link>
              </p>

              <div className="mp-divider">
                <span>or continue with</span>
              </div>

              <button
                type="button"
                className="mp-google-btn"
                onClick={handleGoogleLogin}
              >
                <FcGoogle /> Google
              </button>
            </form>

            <div className="mp-security-note">
              <MdShield />
              Your information is securely protected with end-to-end encryption.
            </div>

            <div className="mp-bottom-links">
              <Link to="/mothers">For Pregnant Mothers ›</Link>
              <Link to="/professionals">For Healthcare Professionals ›</Link>
            </div>
          </div>
        </div>

        <div className="mp-login-right">
          <div className="mp-right-content">
            <h2>
              Your Pregnancy Journey,
              <br />
              Fully Supported
            </h2>
            <p>
              Pregnancy tracking, health guidance, and emergency wallet — all in
              one place.
            </p>

            <div className="mp-illustration">
              <img src={login} alt="Pregnant woman with phone" />
            </div>

            <div className="mp-feature-tags">
              <span>Pregnancy Tracker</span>
              <span>Emergency Wallet</span>
              <span>Health Guidance</span>
              <span>Hospital Verification</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
