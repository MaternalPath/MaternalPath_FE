import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "./Css/ForgotPassword.css";
import logo from "../../assets/header.png";
import backgroundImage from "../../assets/pana.png";

const baseURL = import.meta.env.VITE_BASE_URL?.trim();

const CreateNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const email = location.state?.email || "";
  const role = location.state?.role || "mother";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${baseURL}/${role}/reset-password`, {
        email,
        newPassword,
        confirmNewPassword: confirmPassword,
      });
      navigate("/passwordResetSuccess", { state: { role } });
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error?.response?.data?.message || "Failed to reset password");
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
          <h2>Create New Password</h2>
          <p className="auth-subtitle">
            Enter a strong new password for your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={isLoading}
                >
                  {showNewPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`btn-primary ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateNewPassword;
