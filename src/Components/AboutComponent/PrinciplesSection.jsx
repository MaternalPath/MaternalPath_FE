import { LuHeart, LuBookOpen, LuShield, LuUsers } from "react-icons/lu";
import "./Css/PrinciplesSection.css";

const PrinciplesSection = () => {
  const principles = [
    {
      id: 1,
      icon: <LuHeart size={20} />,
      title: "Maternal-Centered Experience",
      desc: "Every interface decision, every word of copy, every notification — designed with a pregnant mother's emotional state in mind. Calm, not clinical.",
    },
    {
      id: 2,
      icon: <LuBookOpen size={20} />,
      title: "Educational Wellness Support",
      desc: "Evidence-informed health guidance that empowers mothers to make good decisions — without overwhelming them with medical jargon or unnecessary anxiety.",
    },
    {
      id: 3,
      icon: <LuShield size={20} />,
      title: "Secure Financial Preparedness",
      desc: "Your wallet data and health records are protected with industry-standard encryption. Financial preparedness should feel safe — not stressful.",
    },
    {
      id: 4,
      icon: <LuUsers size={20} />,
      title: "Trusted Healthcare Collaboration",
      desc: "We work alongside healthcare professionals, not around them. Our verification portal streamlines the clinical process without replacing the human care.",
    },
  ];

  return (
    <section className="principles-section">
      <div className="principles-content">
        <div className="principles-left">
          <span className="section-label">OUR PRINCIPLES</span>
          <h2 className="section-title">
            Built with Care, <em>Trust</em>, and Purpose
          </h2>
          <p className="section-desc">
            Everything we build begins with a single question: does this make a
            mother's journey safer and more supported?
          </p>
        </div>
        <div className="principles-grid">
          {principles.map((item) => (
            <div key={item.id} className="principle-card">
              <div className="card-icon-sm">{item.icon}</div>
              <h4 className="card-title">{item.title}</h4>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
