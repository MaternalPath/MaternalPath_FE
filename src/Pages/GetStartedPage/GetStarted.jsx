import React from "react";
import Card from "./CardSignup/Card";
import "./GetStarted.css";
import { useNavigate } from "react-router-dom";
import babyIcon from "/src/assets/signup-baby-card-icon.png";
import hospitalIcon from "/src/assets/hospital-signup-icon.png";
import AuthHeader from "../../Components/AuthHr&FrFolder/Header/AuthHeader";
import AuthFooter from "../../Components/AuthHr&FrFolder/Fotter/AuthFooter";
import Progress from "../../Components/AuthHr&FrFolder/ProgressBar/Progress";

const GetStarted = () => {
  const nav = useNavigate();

  const cardData = [
    {
      id: 1,
      imgSrc: babyIcon,
      imgAlt: "pregnant woman",
      title: "Pregnant Mother",
      description:
        "Track your pregnancy, receive health guidance, and save for delivery.",
      buttonText: "Continue as Mother ›",
      onclick: () => nav("/signupUser", { state: { role: "mother" } }),
    },
    {
      id: 2,
      imgSrc: hospitalIcon,
      imgAlt: "hospital building",
      title: "Doctor / Healthcare Professional",
      description: "Support maternal care and manage patient engagement.",
      buttonText: "Continue as Hospital ›",
      onclick: () => nav("/signupHospital", { state: { role: "doctor" } }),
    },
  ];

  return (
    <div className="getstarted-container">
      <AuthHeader />

      <main className="progress-layout">
        <Progress currentStep={1} />
        <section className="title-layout">
          <h3>Join MaternalPath today</h3>
          <p>Choose how you want to continue your journey</p>
        </section>

        <article className="card-layout">
          {cardData.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </article>
      </main>
      <AuthFooter />
    </div>
  );
};

export default GetStarted;
