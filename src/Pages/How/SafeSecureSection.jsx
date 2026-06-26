import "./SafeSecureSection.css";
import { MdOutlineShield } from "react-icons/md";
import { LuBookOpen } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { LuBuilding2 } from "react-icons/lu";

const features = [
  {
    icon: <MdOutlineShield size={28} />,
    title: "Secure Savings",
    description: "Protected with secure payment methods",
  },
  {
    icon: <LuBookOpen size={28} />,
    title: "Educational Guidance",
    description: "Evidence-based info from trusted sources",
  },
  {
    icon: <BsLightningCharge size={28} />,
    title: "Care Support",
    description: "Supportive tools designed for mothers",
  },
  {
    icon: <LuBuilding2 size={28} />,
    title: "Hospital Verification",
    description: "Streamlined verification process",
  },
];

const SafeSecureSection = () => {
  return (
    <div className="sss-wrapper">
      <div className="sss-container">
        <h2 className="sss-title">Safe, Secure, and Supportive</h2>
        <p className="sss-subtitle">
          Your health and security are our priority
        </p>

        <div className="sss-grid">
          {features.map((feature, index) => (
            <div className="sss-card" key={index}>
              <div className="sss-icon">{feature.icon}</div>
              <h3 className="sss-card-title">{feature.title}</h3>
              <p className="sss-card-desc">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="sss-notice">
          <p>
            <strong>Important:</strong> This platform provides educational
            wellness support and does not replace professional medical advice.
            Always consult your healthcare provider for medical decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafeSecureSection;
