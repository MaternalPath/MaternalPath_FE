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
import AuthHeader from "/src/Components/AuthHr&FrComponent/Header/AuthHeader";
import AuthFooter from "/src/Components/AuthHr&FrComponent/Fotter/AuthFooter";
import Progress from "/src/Components/AuthHr&FrComponent/ProgressBar/Progress";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import ButtonOtp from "./ButtonOtp/ButtonOtp";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_BASE_URL?.trim();
// import { Flex, Input, Typography } from "antd";
// const { Title } = Typography;

const VerifyOTP = () => {
  // const onChange = (text) => {
  //   console.log("onChange:", text);
  // };
  // const onInput = (value) => {
  //   console.log("onInput:", value);
  // };
  // const sharedProps = {
  //   onChange,
  //   onInput,
  // };
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "thecurve22@gmail.com";
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  const featureCards = [
    {
      id: 1,
      icon: <LuShield size={20} />,
      title: "Secure Verification",
      desc: "256-bit encryption",
    },
    {
      id: 2,
      icon: <LuLock size={20} />,
      title: "Protected Data",
      desc: "Your info stays private",
    },
    {
      id: 3,
      icon: <LuHeart size={20} />,
      title: "Mother-Centered",
      desc: "Built with care",
    },
  ];

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
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const verifyApi = async (otp) => {
    if (!baseURL) {
      toast.error("Services not Configured");
      return null;
    }

    setIsLoading(true);
    try {
      const url = `${baseURL}/mother/verify`;
      const response = await axios.post(url, {
        email,
        otp,
      });
      if (response?.status === 200) {
        toast.success(
          response?.data?.message || "OTP verification successful!",
        );
        return response;
      }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      const response = await verifyApi(code);
      if (response?.status === 200) {
        nav("/login");
      }
    }
  };
  const resendOtpApi = async () => {
    if (!baseURL) {
      toast.error("Services not Configured");
      return null;
    }

    setIsLoading(true);
    try {
      const url = `${baseURL}/mother/resend-otp`;
      const response = await axios.post(url, {
        email,
      });
      if (response?.status === 200) {
        toast.success(
          response?.data?.message || "OTP verification successful!",
        );
        return response;
      }
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
          <button className="back-btn" onClick={() => nav(-1)}>
            <FaArrowLeft size={16} />
            <span>Back to Sign In</span>
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

            <div className="email-badge">{email}</div>

            <div className="info-box">
              <LuLock size={16} />
              <p>
                This code is used for <strong>account verification</strong>. It
                expires in 1 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="otp-form">
              <label className="otp-label">ENTER 6-DIGIT CODE</label>
              <div className="otp-inputs">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="otp-input"
                  />
                  // <Input.OTP disabled {...sharedProps} />
                  // <Input.OTP length={6} {...sharedProps} />
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
                      onClick={() => {
                        setTimer(60);
                        resendOtpApi();
                      }}
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
            src={"/src/assets/IllustrationPanel.png"}
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

export default VerifyOTP;
