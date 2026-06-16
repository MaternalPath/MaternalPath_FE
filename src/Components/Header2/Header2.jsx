import React from "react";
import "./Header2.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginHed from "/src/assets/header.png";

const Header2 = () => {
  const nav = useNavigate();

  return (
    <>
      <header className="header2-container">
        <div className="header2-wrapper">
          <div className="header2">
            <div className="header2-left">
              <img
                className="header2-left-image"
                src={LoginHed}
                alt="logo"
                onClick={() => nav("/")}
              />
            </div>

            <div className="header2-center">
              <div onClick={() => nav("/about")}>About</div>
              <div onClick={() => nav("/faq")}>FAQ</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header2;
