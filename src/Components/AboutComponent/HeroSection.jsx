import { GoShieldCheck } from "react-icons/go";
import "./Css/HeroSection.css";
import heroImg from "/src/assets/preg-about.png";
import mobileImage from "../../assets/mobileAbout.png"
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const nav = useNavigate();
  return (
    <section className="hero-section">
      <div className="hero-badge">
        <GoShieldCheck size={14} />
        <span>Our Story & Mission</span>
      </div>
      <div className="hero-content">
        <div className="hero-left">
          <h1 className="hero-title">
            Supporting Mothers <br />
            With Guidance, <br /> Preparedness,
            <span className="highlight-teal">
              {" "}
              and <br />
              Care
            </span>
          </h1>
          <p className="hero-desc">
            Because every pregnant woman deserves to feel informed, supported,
            and financially prepared — not just on delivery day, but every
            single day of the journey.
          </p>
          <div className="hero-cta-btn">
            <button
              className="btn-primary-hero"
              onClick={() => nav("/getStarted")}
            >
              Start Your Journey
            </button>
            <button
              className="btn-outline-hero"
              onClick={() => nav("/teamSection")}
            >
              Meet the Team
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img className="image-desk" src={heroImg} alt="Pregnant mother" />
            <img className="image-mobile" src={mobileImage} alt="preg" />
            <div className="float-card week-card">
              <span className="label">Pregnancy Week</span>
              <strong>Week 24</strong>
              <div className="progress-bar">
                <div className="progress" style={{ width: "60%" }}></div>
              </div>
              <span className="percent">60% complete</span>
            </div>
            <div className="float-card wallet-card">
              <span className="label">Emergency Wallet</span>
              <strong>₦285,000</strong>
              <span className="sub">On track for delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
