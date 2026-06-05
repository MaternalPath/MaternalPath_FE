import React from "react";
import "./Header2.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
                src="/src/assets/header.png"
                alt="logo"
                onClick={() => nav("/")}
              />
            </div>

            <div className="header2-center">
              <div onClick={() => nav("/about")}>Abouts</div>
              <div onClick={() => nav("/faq")}>Faq</div>
            </div>

            <div className="header2-right"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header2;
