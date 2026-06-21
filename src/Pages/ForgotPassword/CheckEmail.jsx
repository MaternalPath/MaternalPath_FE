import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import "./Css/ForgotPassword.css";
import backgroundImage from "../../assets/pana.png";
import logo from "../../assets/header.png";
import { toast } from "react-toastify";
import axios from "axios";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;
const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "thecurve22@gmail.com";
  const role = location.state?.role || "mother";

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    const newCode = [...code];
    newCode[index] = value[value.length - 1];
    setCode(newCode);

    if (index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;
    const newCode = Array(CODE_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      newCode[i] = char;
    });
    setCode(newCode);
    const nextIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputsRef.current[nextIndex]?.focus();
    e.preventDefault();
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length !== CODE_LENGTH) {
      toast.error("Please enter a valid verification code.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${baseURL}/${role}/verify-reset`, {
        email,
        otp: verificationCode,
      });
      toast.success("Code verified successfully!");
      navigate("/createNewPassword", {
        state: { email, role, otp: verificationCode },
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid or expired code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    try {
      await axios.post(`${baseURL}/${role}/forgot-password`, { email });
      toast.success("Code resent to your email");
      setSecondsLeft(RESEND_SECONDS);
      setCode(Array(CODE_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
    } catch (error) {
      toast.error("Failed to resend code");
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <div className="auth-left">
          <img src={logo} alt="MaternalPath" className="auth-logo" />
          <img
            src={backgroundImage}
            alt="Secure Account Recovery"
            className="auth-illustration"
          />
          <h3>Secure Account Recovery</h3>
          <p>
            Your maternal health journey is protected with industry-leading
            security protocols
          </p>
        </div>

        <div className="auth-right">
          <div className="icon-circle">
            <FiMail size={22} />
          </div>
          <h2>Check Your Email</h2>
          <p className="auth-subtitle">
            We've sent a verification code to your email address.
          </p>
          <p className="email-text">{email}</p>
          <p className="auth-subtitle">
            Please check your inbox and input the code below to reset your
            password.
          </p>

          <div className="otp-container" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="otp-input"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={isLoading}
              />
            ))}
          </div>

          <p className="resend-text">
            Didn't get Verification Code?{" "}
            {secondsLeft > 0 ? (
              <span className="resend-timer">
                resend Code in {formatTime(secondsLeft)}
              </span>
            ) : (
              <span className="resend-link" onClick={handleResend}>
                Resend Code
              </span>
            )}
          </p>

          <button
            onClick={handleVerify}
            className={`btn-check-primary ${isLoading ? "loading" : ""}`}
            disabled={isLoading || code.join("").length !== CODE_LENGTH}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          <Link to="/login" className="back-link">
            <FiArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckEmail;
