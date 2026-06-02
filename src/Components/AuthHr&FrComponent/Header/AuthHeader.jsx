import React from "react";
import "./AuthHeader.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();

  return (
    <>
      <header className="AuthHeader-container">
        <div className="AuthHeader-wrapper">
          <div className="AuthHeader">
            <div className="AuthHeader-left">
              <img
                className="AuthHeader-left-image"
                src="/src/assets/header.png"
                alt="logo"
              />
            </div>

            <div className="AuthHeader-right">
              <button
                className="AuthHeader-right-1"
                onClick={() => nav("/login")}
              >
                Login in
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
