import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./VerifyOTP.css";
import verifyIllustration from "/src/assets/IllustrationPanel.png";
import {
  LuShield,
  LuLock,
  LuHeart,
  LuClock,
  LuArrowLeft,
  LuCircleHelp,
} from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";
import AuthHeader from "../../Components/AuthHr&FrComponent/Header/AuthHeader";
import AuthFooter from "../../Components/AuthHr&FrComponent/Fotter/AuthFooter"; // Fixed typo: Fotter -> Footer
import Progress from "../../Components/AuthHr&FrComponent/ProgressBar/Progress";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import ButtonOtp from "./ButtonOtp/ButtonOtp";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const VerifyHosOTP = () => {
  const nav = useNavigate();
  const { state } = useLocation();

  // ✅ Persist email across refresh using sessionStorage
  const [email] = useState(() => {
    if (state?.email) {
      sessionStorage.setItem("verify_email", state.email);
      return state.email;
    }
    return sessionStorage.getItem("verify_email") || "";
  });

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Only redirect if there's truly no email after checking storage
  useEffect(() => {
    if (!email) {
      toast.error("Session expired. Please sign up or log in again.");
      nav("/signup", { replace: true }); // Send to signup since this is post-signup flow
    }
  }, [email, nav]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Auto submit when all 6 digits entered
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleSubmit(null, newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ✅ Handle paste for OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length) {
      const newOtp = [...otp];
      pasted.split("").forEach((char, idx) => {
        if (idx < 6) newOtp[idx] = char;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();

      if (pasted.length === 6) {
        handleSubmit(null, pasted);
      }
    }
  };

  const verifyApi = async (otpCode) => {
    setIsLoading(true);
    try {
      const url = `${baseURL}/hospital/verify`;
      const response = await axios.post(url, {
        email,
        otp: otpCode,
      });
      return response;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "OTP verification failed",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e, otpCode = null) => {
    if (e) e.preventDefault();
    const code = otpCode || otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    const response = await verifyApi(code);
    if (response?.status === 200) {
      // ✅ Clean up stored email after successful verification
      sessionStorage.removeItem("verify_email");
      toast.success(
        response?.data?.message || "Account verified successfully!",
      );

      // ✅ Flow: Signup -> OTP -> Login -> Dashboard
      nav("/login", {
        replace: true,
        state: { verified: true, email }, // Let login page know they just verified
      });
    }
  };

  const resendOtpApi = async () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      nav("/signup", { replace: true });
      return;
    }

    setIsLoading(true);
    try {
      const url = `${baseURL}/hospital/resend-otp`;
      const response = await axios.post(url, { email });
      if (response?.status === 200) {
        toast.success(response?.data?.message || "OTP resent successfully!");
        setTimer(60); // Only start timer after successful resend
        setOtp(new Array(6).fill("")); // Clear old OTP
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "OTP resend failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="verify-page">
      <AuthHeader />
      <Progress currentStep={3} />

      <main className="verify-layout">
        <section className="verify-left">
          <button className="back-btn" onClick={() => nav("/signupUser")}>
            <FaArrowLeft size={16} />
            <span>Back to Sign Up</span>
          </button>

          <div className="verify-card">
            <div className="icon-wrapper">
              <GoShieldCheck size={32} />
            </div>

            <h1 className="verify-title">Verify Your Account</h1>
            <p className="verify-subtitle">
              We've sent a secure 6-digit verification code to your registered
              email address.
            </p>

            <div className="email-badge">{email || "No email found"}</div>

            <div className="info-box">
              <LuLock size={16} />
              <p>
                This code is used for <strong>account verification</strong>. It
                expires in 10 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="otp-form">
              <label className="otp-label">ENTER 6-DIGIT CODE</label>
              <div className="otp-inputs">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input"
                    disabled={isLoading}
                  />
                ))}
              </div>

              <div className="otp-dots">
                {otp.map((_, i) => (
                  <span key={i} className={otp[i] ? "filled" : ""} />
                ))}
              </div>

              <div className="resend-timer">
                <FaRegClock size={14} />
                <span>
                  {timer > 0 ? (
                    `Resend code in ${formatTime(timer)}`
                  ) : (
                    <button
                      type="button"
                      className="resend-btn"
                      disabled={isLoading}
                      onClick={resendOtpApi}
                    >
                      {isLoading ? "Resending..." : "Resend code"}
                    </button>
                  )}
                </span>
              </div>

              <button
                type="submit"
                className="verify-btn"
                disabled={isLoading || otp.join("").length !== 6}
              >
                {isLoading ? (
                  <>
                    <span className="otp-spinner" aria-hidden="true" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Code
                    <GoShieldCheck size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="security-badge">
            <LuShield size={16} />
            <span>Your information is protected and securely verified.</span>
          </div>

          <ButtonOtp />
        </section>

        <section className="verify-right">
          <img
            src={verifyIllustration}
            alt="Verification"
            className="illustration"
          />
          <img
            src={"/src/assets/mobileOtp.png"}
            alt="Verification"
            className="mobile-illustration"
          />
        </section>
      </main>

      <AuthFooter />
    </div>
  );
};

export default VerifyHosOTP;
