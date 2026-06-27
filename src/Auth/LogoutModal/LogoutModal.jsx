import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiLogOut, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Add this import
import "./LogoutModal.css";

export default function LogoutModal({
  isOpen,
  onClose,
  onLogout,
  title = "Log out of your account?",
  description = "You’ll be returned to the login screen. You can always log back in.",
  confirmText = "Log Out",
}) {
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    
    // Show success message
    toast.success("👋 Logged out successfully. See you soon!");
    
    // Call the onLogout prop if provided
    if (onLogout) {
      onLogout();
    }
    
    // Navigate to login page
    navigate("/login");
  };

  return createPortal(
    <div className="logout-modal-overlay" onClick={onClose}>
      <div
        className="logout-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
      >
        <button
          className="logout-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div className="logout-modal-icon">
          <FiLogOut size={28} />
        </div>

        <h2 id="logout-modal-title" className="logout-modal-title">
          {title}
        </h2>

        <p className="logout-modal-text">{description}</p>

        <div className="logout-modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );}