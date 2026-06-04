import "./HowStyles/Secure.css";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FiBookOpen } from "react-icons/fi";
import { TbArrowCurveRight } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const secureData = [
  {
    id: 1,
    icon: <AiOutlineSafetyCertificate />,
    title: "Secure Savings",
    description:
      "Your emergency wallet is protected with secure payment methods",
  },
  {
    id: 2,
    icon: <FiBookOpen />,
    title: "Educational Guidance",
    description: "Evidence-based wellness information from trusted sources",
  },
  {
    id: 3,
    icon: <TbArrowCurveRight />,
    title: "Maternal Care Support",
    description: "Supportive tools designed specifically for pregnant mothers",
  },
  {
    id: 4,
    icon: <HiOutlineBuildingOffice2 />,
    title: "Hospital Verification",
    description: "Streamlined verification process for delivery readiness",
  },
];

const Secure = () => {
  return (
    <main className="Secured-container">
      <div className="Secure-toptext">
        <h1>Safe, Secure, and Supportive</h1>
        <p>Your health and security are our priority</p>
      </div>

      <div className="Secured-card-container">
        {secureData.map((item) => (
          <div className="Secured-card" key={item.id}>
            <button className="Secured-icons">{item.icon}</button>

            <h6>{item.title}</h6>

            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="Secured-bottom">
        <div className="Important">
          Important: This platform provides educational wellness support and
          does not replace professional medical advice. Always consult your
          healthcare provider for medical decisions.
        </div>
      </div>
    </main>
  );
};

export default Secure;