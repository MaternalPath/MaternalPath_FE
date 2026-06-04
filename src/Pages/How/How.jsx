
import "./HowStyles/How.css";
import Header from "../../Components/header/header";
// import Footer from "../../Components/Footer/Footer";
import { FaArrowRight } from "react-icons/fa";
import Works from "./Works";
import Journey from "./Journey";
import PlatformFeatures from "./PlatformFeatures";
import Secure from "./Secure";
import Confidence from "./Confidence";
import Footer from "../../Components/Footer/Footer";

const How = () => {
  return (
    <>
      <Header />
      <div className="HowContainer">
        <div className="howitworks-textholder">
          <h1>Supporting Mothers Through Every Stage of Pregnancy</h1>
          <p>
            Track your pregnancy journey, receive personalized maternal health
            guidance, and prepare financially for delivery—all in one supportive
            platform designed for mothers.
          </p>
          <button className="get-started-btn">
            Get Started <FaArrowRight />
          </button>
        </div>
        <div className="right-image-holder">
          <img src="https://i.postimg.cc/NjTpJYvn/prenant-woman.png" alt="" />
        </div>
      </div>
      <Works />
      <Journey />
      <PlatformFeatures />
      <Secure />
      <Confidence />
      <Footer />
    </>
  );
};

export default How;