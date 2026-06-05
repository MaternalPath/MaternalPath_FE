import {
  LuCircleDollarSign,
  LuLightbulb,
  LuClock,
  LuActivity,
} from "react-icons/lu";
import ".//Css/ChallengeSection.css";

const ChallengeSection = () => {
  const challenges = [
    {
      id: 1,
      icon: <LuCircleDollarSign size={24} />,
      tag: "Financial",
      title: "Unexpected Delivery Expenses",
      desc: "Delivery costs in private and public facilities can reach ₦300,000–₦600,000 or more. Without a savings plan, many families are caught off guard — sometimes leading to delayed care or dangerous compromises.",
    },
    {
      id: 2,
      icon: <LuLightbulb size={24} />,
      tag: "Awareness",
      title: "Limited Maternal Guidance",
      desc: "Many mothers go through pregnancy with little to no accessible, personalized health information. What's happening to their baby this week? What foods to avoid? What symptoms are normal? These questions too often go unanswered.",
    },
    {
      id: 3,
      icon: <LuClock size={24} />,
      tag: "Emergency",
      title: "Emergency Preparedness Gaps",
      desc: "When complications arise, time matters. Families without a designated delivery fund face critical delays in accessing care. Preparedness isn't just financial — it's clinical. It's the difference between a safe delivery and a tragic one.",
    },
    {
      id: 4,
      icon: <LuActivity size={24} />,
      tag: "Information",
      title: "Fragmented Pregnancy Information",
      desc: "Tracking pregnancy week-by-week, understanding baby development, knowing upcoming milestones — mothers currently piece this together from scattered sources. There's no single, trustworthy companion for the full journey.",
    },
  ];

  return (
    <section className="challenge-section">
      <div className="section-header">
        <div className="header-left">
          <span className="section-label">THE CHALLENGE</span>
          <h2 className="section-title">
            The Problem We're <em>Solving</em>
          </h2>
        </div>
        <p className="header-desc">
          Four interconnected challenges that leave mothers <br /> vulnerable
          during one of life's most important <br /> journeys.
        </p>
      </div>
      <div className="challenge-grid">
        {challenges.map((item) => (
          <div key={item.id} className="challenge-card">
            <div className="card-header">
              <div className="card-icon">{item.icon}</div>
              <span className="card-tag">{item.tag}</span>
            </div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChallengeSection;
