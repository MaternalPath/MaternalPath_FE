

import React from "react";
import "./HeroPage1.css";
import { CiHeart } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
import { FaSignature } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import pregnantWoman from '../../assets/pregnantWoman.png'

const HeroPage1 = () => {
   const nav = useNavigate();
  return (
    <section className="mp-hero">
      <div className="mp-hero-container">
        <div className="mp-hero-content">
          <div className="mp-badge">Empowering mothers. Preparing futures.</div>

          <h1 className="mp-hero-title">
            <span className="mp-title-light">Your Pregnancy</span>
            <span className="mp-title-light">Journey, Guided.</span>
            <span className="mp-title-bold">
              Your Future,<span className="mp-title-light">Secured.</span>
            </span>
          </h1>

          <p className="mp-hero-desc">
            Track your pregnancy week by week, receive personalized health and
            nutrition guidance, and build financial security for your
            delivery—all in one trusted platform.
          </p>

          <button className="mp-btn mp-btn-primary mp-btn-large"
            onClick={() => nav("/getStarted")}>
            Get Started
          </button>

          <div className="mp-trust-badges">
            <div className="mp-trust-item">
              <CiHeart />
              <span>Trusted by mothers</span>
            </div>
            <div className="mp-trust-item">
              <LuWallet />
              <span>Secure savings</span>
            </div>
            <div className="mp-trust-item">
              <FaSignature />
              <span>Personalized guidance</span>
            </div>
          </div>
        </div>

        <div className="mp-hero-image">
          <img src={pregnantWoman} alt="Pregnant woman" />
        </div>
      </div>
    </section>
  );
};

export default HeroPage1;
