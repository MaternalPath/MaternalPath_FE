import "./HowStyles/PlatformFeatures.css";
import { FaRegHeart } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const featuresData = [
  {
    id: 1,
    icon: <FaRegHeart />,
    title: "Pregnancy Tracker",
    description:
      "Track your baby's development week by week with personalized updates, milestones, and growth information.",
    image:
      "https://i.postimg.cc/7hJXswDd/Screenshot-2026-06-03-at-18-57-36.png",
  },
  {
    id: 2,
    icon: <FiBookOpen />,
    title: "Health Guidance",
    description:
      "Receive nutrition recommendations, wellness tips, and educational resources tailored to your pregnancy stage.",
    image:
      "https://i.postimg.cc/L6MXvStS/Screenshot-2026-06-03-at-20-37-00.png",
  },
  {
    id: 3,
    icon: <LuWallet />,
    title: "Emergency Wallet",
    description:
      "Save for delivery costs with goal tracking, contribution reminders, and wallet progress monitoring.",
    image:
      "https://i.postimg.cc/pTGfzThx/Screenshot-2026-06-03-at-20-46-54.png",
  },
  {
    id: 4,
    icon: <HiOutlineBuildingOffice2 />,
    title: "Hospital Verification",
    description:
      "Healthcare professionals can verify your delivery fund readiness for admission and treatment authorization.",
    image:
      "https://i.postimg.cc/MTvDsV8p/Screenshot-2026-06-03-at-20-49-50.png",
  },
];

const PlatformFeatures = () => {
  return (
    <main className="PlatformFeatures-Container">
      <div className="PlatformFeatures-Top">
        <h1>Platform Features</h1>
        <p>Everything you need for a supported pregnancy</p>
      </div>

      <section className="PlatformFeatures-container">
        {featuresData.map((item) => (
          <div className="FeaturesHolder" key={item.id}>
            <aside className="FeaturesHolder-TopText-container">
              <div className="Features-icons-holder">
                <button className="Features-icons">{item.icon}</button>
              </div>

              <div className="feartues-side-text">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </aside>

            <div className="Dashboard-images">
              <img src={item.image} alt={item.title} className="prenancy-img" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default PlatformFeatures;