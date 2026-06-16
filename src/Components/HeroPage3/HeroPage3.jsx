import React, { useState } from "react";
import "./HeroPage3.css";
import holdingTommy from "../../assets/holdingTommy.png";
import { useNavigate } from "react-router-dom";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <>
      <section className="mp-newsletter">
        <div className="mp-newsletter-container">
          <h2 className="mp-newsletter-title">
            Stay Informed Throughout Your Journey
          </h2>
          <p className="mp-newsletter-desc">
            Get weekly pregnancy tips, nutrition advice, and milestone reminders
            delivered to your inbox.
          </p>

          <form className="mp-newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="mp-newsletter-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="mp-newsletter-btn">
              Subscribe
            </button>
          </form>

          <div className="mp-disclaimer">
            <strong>Important:</strong> This platform provides educational
            wellness support and does not replace professional medical advice.
            Always consult your healthcare provider for medical decisions.
          </div>
        </div>
      </section>

      <section className="mp-cta-banner">
        <div className="mp-cta-container">
          <div className="mp-cta-content">
            <img src={holdingTommy} alt="CTA Image" />
            <div className="wraps-cta-btn">
              <h2 className="mp-cta-title">
                Start Your Safe Motherhood Journey!
              </h2>
              <button className="mp-cta-btn" onClick={() => nav("/getStarted")}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterCTA;
