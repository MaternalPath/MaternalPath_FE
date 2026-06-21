import { useNavigate } from "react-router-dom";
import "./HowStyles/Confidence.css";
import { FaArrowRight } from "react-icons/fa6";

const Confidence = () => {
  const nav = useNavigate()
  return (
    <hero className="Confidence-container">
      <h1>Start Your Pregnancy Journey With Confidence</h1>
      <p>
        Stay informed, stay prepared, and feel supported every step of the way.
        Join mothers who trust MaternalPath for their pregnancy journey.
      </p>
      <section className="confidence-btn-holder">
        <button className="confidence-btn1" onClick={() => nav("/getStarted")}>
          Get Started <FaArrowRight />
        </button>
        <button className="confidence-btn2">Learn More</button>
      </section>
      <div className="confidences-notice">
        <strong style={{marginRight: "5px"}}>Important: </strong> This platform provides educational wellness support and does
        not replace professional medical advice. Always consult your healthcare
        provider for medical decisions.
      </div>
    </hero>
  );
};

export default Confidence;