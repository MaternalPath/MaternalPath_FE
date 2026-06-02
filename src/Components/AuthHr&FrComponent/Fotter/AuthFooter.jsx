import React from "react";
import "./AuthFooter.css";
import { useNavigate } from "react-router-dom";

const AuthFooter = () => {
  return (
    <footer className="mobile-footer">
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
};

export default AuthFooter;
