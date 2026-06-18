import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
  MdShield,
} from "react-icons/md";
import { PiBaby } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { GiHospital } from "react-icons/gi";
import login from "/src/assets/Login.png";
import { CiHeart } from "react-icons/ci";
import "./login.css";
import Header2 from "../../Components/Header2/Header2";
import axios from "axios";
import { toast } from "react-toastify";
import { useRole } from "../../context/RoleContext";
const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const LoginPage = () => {
  const nav = useNavigate();
  const { role: defaultRole } = useRole();
  const [userType, setUserType] = useState(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const loginApi = async () => {
    console.log("loginApi started", { email: formData.email, userType });
    if (!baseURL) {
      toast.error("Login service is not configured");
      return null;
    }

    setIsLoading(true);
    try {
      const endpoint =
        userType === "mother" ? "mother/loginmother" : "hospital/login";
      const url = `${baseURL}/${endpoint}`;
      const response = await axios.post(url, {
        emailOrPhoneNumber: formData.email,
        password: formData.password,
      });
      console.log("Login response:", response);
      if (response?.status === 200) {
        toast.success(response?.data?.message || "Login successful!");
        return response;
      }
    } catch (error) {
      console.error("Login API error:", error);
      toast.error(
        error?.response?.data?.message || error.message || "Login failed",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!validateForm()) {
      return;
    }

    const response = await loginApi();
    if (response?.status === 200) {
      localStorage.setItem("token", response?.data?.token);

      const userId =
        response?.data?.id ||
        response?.data?.userId ||
        response?.data?.user_id ||
        response?.data?.data?.id ||
        response?.data?.data?.userId ||
        response?.data?.data?.user_id ||
        "";

      if (userId) {
        localStorage.setItem("userid", String(userId));
      } else {
        console.warn("Login response did not include a user id:", response?.data);
      }

      if (userType === "mother") {
        const isUpdated = Boolean(response?.data?.isUpdated);
        localStorage.setItem("isUpdated", String(isUpdated));
        nav(isUpdated ? "/dashboard" : "/dashboard/profile");
      } else {
        localStorage.removeItem("isUpdated");
        nav("/dashboard");
      }
    }
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
                <label>EMAIL ADDRESS </label>
                <div
                  className={`mp-input-wrapper ${errors.email && touched.email ? "error" : ""}`}
                >
                  <MdEmail />
                  <input
                    type="text"
                    placeholder="Enter your email "
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
                className="mp-login-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="login-spinner" aria-hidden="true">
                      ⏳
                    </span>
                    Signing in...
                  </>
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
