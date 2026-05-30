import React from "react";
import "./header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();

  return (
    <>
      <header className="header-container">
        <div className="header-wrapper">
          <div className="header">
            <div className="header-left">
              <img
                className="header-left-image"
                src="/src/assets/header.png"
                alt="logo"
              />
            </div>

              <div className="header-center">
                <div onClick={() => nav("/")}>Home</div>
                <div onClick={() => nav("/how")}>
                  How it works
                </div>
                <div onClick={() => nav("/about")}>About</div>
                <div onClick={() => nav("/FAQ")}>FAQ</div>
            
            </div>

            <div className="header-right">
              <button className="header-right-1" onClick={() => nav("/signup")}>
                Sign up
              </button>

              <button className="header-right-2" onClick={() => nav("/login")}>
                Get Started now
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
