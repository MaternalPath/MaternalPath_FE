import React from "react";
import Header from "/src/Components/header/header";
import HeroSection from "/src/Components/AboutComponent/HeroSection";
import OriginSection from "/src/Components/AboutComponent/OriginSection";
import ChallengeSection from "/src/Components/AboutComponent/ChallengeSection";
import MissionVisionSection from "/src/Components/AboutComponent/MissionVisionSection";
import HowItWorksSection from "/src/Components/AboutComponent/HowItWorksSection";
import PrinciplesSection from "/src/Components/AboutComponent/PrinciplesSection";
import TeamSection from "/src/Components/AboutComponent/TeamSection";
import CtaSection from "/src/Components/AboutComponent/CtaSection";
import FooterSection from "/src/Components/AboutComponent/FooterSection";
import "./About.css";
const About = () => {
  return (
    <>
      <Header />
      <div className="about-page">
        <HeroSection />
        <OriginSection />
        <ChallengeSection />
        <MissionVisionSection />
        <HowItWorksSection />
        <PrinciplesSection />
        <TeamSection />
        <CtaSection />
        <FooterSection />
      </div>
    </>
  );
};

export default About;
