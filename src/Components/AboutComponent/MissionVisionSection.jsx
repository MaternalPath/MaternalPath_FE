import { LuHeart } from "react-icons/lu";
import { GoShieldCheck } from "react-icons/go";
import "./Css/MissionVisionSection.css";

const MissionVisionSection = () => {
  const cards = [
    {
      id: 1,
      icon: <LuHeart size={24} />,
      label: "OUR MISSION",
      title:
        "Supporting mothers with personalized guidance and financial preparedness through every stage of pregnancy.",
      desc: "We exist to make the pregnancy journey accessible, informed, and financially secure. Through technology, we meet mothers where they are — with care, not judgment.",
    },
    {
      id: 2,
      icon: <GoShieldCheck size={24} />,
      label: "OUR VISION",
      title:
        "A future where every mother feels informed, safe, and financially prepared on her pregnancy journey.",
      desc: "We envision a world where delivery day is met with confidence — where no family is turned away and no mother faces her most vulnerable moment unprepared.",
    },
  ];

  return (
    <section className="mission-section">
      <span className="section-label center">WHAT GUIDES US</span>
      <div className="mission-grid">
        {cards.map((item) => (
          <div key={item.id} className="mission-card">
            <div className="card-icon-sm">{item.icon}</div>
            <span className="card-label">{item.label}</span>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionSection;
