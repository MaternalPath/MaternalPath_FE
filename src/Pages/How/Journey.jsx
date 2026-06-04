import "./HowStyles/Journey.css";
import { CiCalendar } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegGrinHearts } from "react-icons/fa";

const journeyData = [
  {
    id: 1,
    icon: <FaRegGrinHearts />,
    title: "First Trimester",
    weeks: "Weeks 1-12",
    cards: [
      {
        heading: "Initial Setup",
        text: "Create profile and set goals",
      },
      {
        heading: "Early Development",
        text: "Track baby's first weeks",
      },
      {
        heading: "Begin Saving",
        text: "Start emergency wallet",
      },
    ],
  },
  {
    id: 2,
    icon: <IoMdHeartEmpty />,
    title: "Second Trimester",
    weeks: "Weeks 13-26",
    cards: [
      {
        heading: "Second Trimester",
        text: "Weekly baby updates",
      },
      {
        heading: "Nutrition Focus",
        text: "Personalized meal guidance",
      },
      {
        heading: "Savings Growth",
        text: "Steady wallet contributions",
      },
    ],
  },
  {
    id: 3,
    icon: <CiCalendar />,
    title: "Third Trimester",
    weeks: "Weeks 27-40",
    cards: [
      {
        heading: "Delivery Prep",
        text: "Final preparations",
      },
      {
        heading: "Hospital Readiness",
        text: "Verify delivery funds",
      },
      {
        heading: "Final Countdown",
        text: "Ready for arrival",
      },
    ],
  },
];

const Journey = () => {
  return (
    <main className="journey-contaner">
      <div className="Journey-Text">
        <h1>Your Pregnancy Journey Timeline</h1>
        <p>We support you through every trimester</p>
      </div>

      <section className="Journey-Holder">
        {journeyData.map((item) => (
          <div className="Journey-Cards" key={item.id}>
            <button className="Journey-circle">{item.icon}</button>

            <h6>{item.title}</h6>

            <span className="week-span">{item.weeks}</span>

            {item.cards.map((card, index) => (
              <aside className="smallcards" key={index}>
                <p>{card.heading}</p>
                <p>{card.text}</p>
              </aside>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default Journey;