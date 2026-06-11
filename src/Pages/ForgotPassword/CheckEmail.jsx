import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import "./Css/CheckEmail.css";
import logo from "../../assets/header.png";
import backgroundImage from "../../assets/pana.png";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
<<<<<<< HEAD
  const email = location.state?.email || 'your email';
  const role = location.state?.role || 'mother';
  const roleLabel = role === 'hospital' ? 'Healthcare Professional' : 'Pregnant Mother';

  const handleOpenEmail = () => {
    navigate('/createNewPassword', { state: { email, role } });
  };

  const handleResend = () => {
    navigate('/createNewPassword', { state: { email, role } });
=======
  const email = location.state?.email || "thecurve22@gmail.com";

  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
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

  const handleVerify = () => {
    navigate("/createNewPassword");
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    setCode(Array(CODE_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
>>>>>>> e09dc2ee229c90cef159971862a353b0f98bc47b
  };

  return (
    <main className="auth-main-check">
      <div className="auth-check-container">
        <div className="auth-check-left">
          <img src={logo} alt="MaternalPath" className="auth-check-logo" />
          <img
            src={backgroundImage}
            alt="Secure Account Recovery"
            className="auth-check-illustration"
          />
          <h3>Secure Account Recovery</h3>
          <p>
            Your maternal health journey is protected with industry-leading
            security protocols
          </p>
        </div>
<<<<<<< HEAD
        <h2>Check Your Email</h2>
        <p className="auth-subtitle">
          We've sent a password reset link to your {roleLabel} account.
        </p>
        <p className="email-text">{email}</p>
        <p className="auth-subtitle">Please check your inbox and follow the instructions to reset your password.</p>
        
        <button onClick={handleOpenEmail} className="btn-primary">Open Email App</button>
        <button onClick={handleResend} className="btn-secondary">Resend Link</button>
        
        <Link to="/login" className="back-link">
          <FiArrowLeft size={14} /> Back to Login
        </Link>
      </div>
    </div>
  )
}
=======
>>>>>>> e09dc2ee229c90cef159971862a353b0f98bc47b

        <div className="auth-check-right">
          <div className="icon-check-circle">
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

          <button onClick={handleVerify} className="btn-primary">
            Verify Code
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
