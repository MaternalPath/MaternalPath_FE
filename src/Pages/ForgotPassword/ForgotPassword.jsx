import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import "./Css/ForgotPassword.css";
import logo from "../../assets/header.png";
import backgroundImage from "../../assets/pana.png";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!baseURL) {
      console.error("VITE_BASE_URL is not defined in .env");
      toast.error("Server config error. Contact support.");
      return;
    }

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);
    console.log("Calling:", `${baseURL}/mother/forgot-password`);

    try {
      const res = await axios.post(`${baseURL}/mother/forgot-password`, {
        email,
      });

      console.log("Success:", res.data);
      toast.success("Password reset link sent! Please check your email.");
      navigate("/checkEmail", { state: { email, role: "mother" } });
    } catch (error) {
      console.error("Forgot password error:", error);
      console.error("Response:", error?.response?.data);
      toast.error(
        error?.response?.data?.message || "Failed to send reset link",
      );
    } finally {
      setIsLoading(false);
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
          <h2>Forgot Password?</h2>
          <p className="auth-subtitle">
            Enter your registered email address and we'll send you a secure
            password reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FiMail className="svg" size={16} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="inputSpace"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <Link to="/login" className="back-link">
            <FiArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
