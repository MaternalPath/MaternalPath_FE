import {
  LuHeart,
  LuShield,
  LuCircleCheck,
  LuCircleAlert,
} from "react-icons/lu";
import "./Css/CtaSection.css";

const CtaSection = () => {
  const features = [
    { id: 1, icon: <LuShield size={16} />, text: "Secure & Private" },
    { id: 2, icon: <LuHeart size={16} />, text: "Mother-Centered" },
    { id: 3, icon: <LuCircleCheck size={16} />, text: "Evidence-Based" },
  ];

  return (
    <section className="cta-section">
      <div className="cta-badge">
        <LuHeart size={14} />
        <span>Every Mother Deserves Support</span>
      </div>
      <h2 className="cta-title">
        Every Mother Deserves a <em>Supported</em> Pregnancy Journey
      </h2>
      <p className="cta-desc">
        Stay informed. Stay prepared. Feel supported — every week, every
        milestone, every step toward delivery day.
      </p>
      <div className="cta-buttons">
        <button className="cta-btn-primary">Get Started</button>
        <button className="cta-btn-outline-light">Learn More</button>
      </div>
      <div className="cta-features">
        {features.map((f) => (
          <div key={f.id} className="cta-feature">
            {f.icon}
            <span>{f.text}</span>
          </div>
        ))}
      </div>
      <div className="cta-notice">
        <LuCircleAlert size={16} />
        <p>
          <strong style={{color: "var(--primary-deep-teal)"}}>Important:</strong> This platform provides educational
          wellness support and does not replace professional medical advice.
          Always consult your healthcare provider for medical decisions.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
