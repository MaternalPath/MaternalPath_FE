import { LuClock, LuBookOpen, LuWallet, LuBuilding2 } from "react-icons/lu";
import "./Css/HowItWorksSection.css";

const HowItWorksSection = () => {
  const steps = [
    {
      id: "01",
      icon: <LuClock size={28} />,
      title: "Pregnancy Tracking",
      desc: "From the first week to due date, we track your baby's growth and your progress — week by week, milestone by milestone. Personalized to your EDD.",
    },
    {
      id: "02",
      icon: <LuBookOpen size={28} />,
      title: "Health Guidance",
      desc: "Curated nutrition tips, wellness reminders, and trimester-specific health education — all tailored to where you are in your pregnancy, not generic advice.",
    },
    {
      id: "03",
      icon: <LuWallet size={28} />,
      title: "Emergency Wallet",
      desc: "A dedicated savings space to build your delivery fund gradually. Set your goal, track contributions, and arrive at delivery day financially ready.",
    },
    {
      id: "04",
      icon: <LuBuilding2 size={28} />,
      title: "Hospital Verification",
      desc: "When delivery day comes, healthcare professionals can instantly verify fund availability — a seamless, secure process built to ease admission.",
    },
  ];

  return (
    <section className="how-section">
      <span className="section-label center">HOW IT WORKS</span>
      <h2 className="section-title center">
        How We Support <em>Mothers</em>
      </h2>
      <div className="steps-row">
        {steps.map((step) => (
          <div key={step.id} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <span className="step-num">{step.id}</span>
            <h4 className="step-title">{step.title}</h4>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
