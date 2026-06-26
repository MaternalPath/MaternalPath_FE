import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
  MdShield,
} from "react-icons/md";
import { PiBaby } from "react-icons/pi";
import { GiHospital } from "react-icons/gi";
import loginImg from "/src/assets/Login.png";
import { CiHeart } from "react-icons/ci";
import "./login.css";
import Header2 from "../../Components/Header2/Header2";
import axios from "axios";
import { toast } from "react-toastify";
import { useRole } from "../../context/RoleContext";
import AuthFooter from "../../Components/AuthHr&FrComponent/Fotter/AuthFooter";

const baseURL = import.meta.env.VITE_BASE_URL?.trim();

// Single constant for the email localStorage key — matches EMAIL_KEY in RoleContext
const EMAIL_KEY = "email";

const LoginPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const { login, setIsUpdated } = useRole();
  const [userType, setUserType] = useState("mother");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.justVerified) {
      toast.success("Email verified successfully. Please log in to continue.");
      setFormData((prev) => ({ ...prev, email: location.state.email || "" }));
      setUserType(location.state.role || "mother");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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

  // Redirects to the correct OTP page, saving email under the single EMAIL_KEY
  const redirectToOtp = (email, role) => {
    localStorage.setItem(EMAIL_KEY, email);
    const otpRoute =
      role === "hospital" ? "/otpVerificationHos" : "/otpVerification";
    nav(otpRoute, {
      state: { email, role },
      replace: true,
    });
  };

  const loginApi = async () => {
    if (!baseURL) {
      toast.error("Login service is not configured");
      return null;
    }

    setIsLoading(true);
    try {
      const endpoint =
        userType === "mother" ? "mother/loginmother" : "hospital/login";
      const response = await axios.post(`${baseURL}/${endpoint}`, {
        emailOrPhoneNumber: formData.email,
        password: formData.password,
      });

      if (response?.status === 200) {
        return response;
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "";
      const status = error?.response?.status;

      const isUnverifiedError =
        status === 400 &&
        errorMessage.toLowerCase().includes("verify your email");

      if (isUnverifiedError) {
        return { requiresOtp: true, error: error.response.data };
      }

      const userDisplayName = userType === "mother" ? "Mother" : "Hospital";
      toast.error(
        errorMessage || `${userDisplayName} login failed. Please try again.`,
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!validateForm()) return;

    const result = await loginApi();

    // API flagged account as needing OTP verification
    if (result?.requiresOtp) {
      toast.info("Please verify your account to continue.");
      redirectToOtp(formData.email, userType);
      return;
    }

    if (result?.status === 200) {
      const responseBody = result?.data || {};

      // Different response shapes per role:
      // Mother:   { token, id, name, isUpdated, ... }         ← token at top level
      // Hospital: { token, message, data: { id, email, ... }} ← token at top level, details nested
      const token = responseBody?.token;
      const nestedData = responseBody?.data || {};

      // The backend returns 200 + a token only for verified, active accounts.
      // If somehow the token is missing on a 200, treat it as an error.
      if (!token) {
        toast.error("Login failed. Please try again.");
        return;
      }

      // Merge top-level and nested fields so userId/name work for both roles
      const userId = responseBody?.id || nestedData?.id || "";
      if (userId) {
        localStorage.setItem("userid", String(userId));
        localStorage.setItem("userId", String(userId));
      }

      const name =
        responseBody?.name ||
        nestedData?.hospitalName ||
        nestedData?.name ||
        "";
      if (name) localStorage.setItem("name", name);

      setIsUpdated(Boolean(responseBody?.isUpdated));

      // Mark as verified=true because a 200+token from the backend confirms it.
      // Unverified users never reach here — the catch block handles them via requiresOtp.
      login(token, userType, true, formData.email);

      const userDisplayName = userType === "mother" ? "Mother" : "Hospital";
      toast.success(
        responseBody?.message || `${userDisplayName} login successful!`,
      );

      nav("/dashboard", { replace: true });
    }
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
                  className={userType === "hospital" ? "active" : ""}
                  onClick={() => setUserType("hospital")}
                >
                  <GiHospital /> Healthcare Professional
                </button>
              </div>
            </div>

            <div className="mp-info-banner">
              {userType === "mother" ? <CiHeart /> : <GiHospital />}
              <span>
                {userType === "mother"
                  ? "Sign in to access your pregnancy tracker, health guidance, and emergency wallet."
                  : "Sign in to access the patient verification portal and hospital authorization tools."}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mp-login-form" noValidate>
              <div className="mp-form-group">
                <label>EMAIL ADDRESS</label>
                <div
                  className={`mp-input-wrapper ${errors.email && touched.email ? "error" : ""}`}
                >
                  <MdEmail />
                  <input
                    type="text"
                    placeholder="Enter your email"
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
                    placeholder="Password123"
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
                {userType === "mother" ? (
                  <Link to="/forgotPassword" state={{ role: userType }}>
                    Forgot Password?
                  </Link>
                ) : (
                  <Link to="/hospitalForgotPassword" state={{ role: userType }}>
                    Forgot Password?
                  </Link>
                )}
              </div>

              <button
                type="submit"
                className={`mp-login-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Log In <MdArrowForward />
                  </>
                )}
              </button>

              <p className="mp-signup-text">
                Don't have an account?{" "}
                <Link to="/getStarted">Create Account</Link>
              </p>
            </form>

            <div className="mp-security-note">
              <MdShield />
              Your information is securely protected with end-to-end encryption.
            </div>

            <div className="mp-bottom-links">
              <Link to="/signupUser">For Pregnant Mothers ›</Link>
              <Link to="/signupHospital">For Healthcare Professionals ›</Link>
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
              <img src={loginImg} alt="Pregnant woman with phone" />
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
      <AuthFooter />
    </>
  );
};

export default LoginPage;
