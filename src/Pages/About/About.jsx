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
import "./About.css";
import Footer from "../../Components/Footer/Footer";
import PregnancyWalletCards from "/src/Components/AboutComponent/PregnancyWalletCards";
const About = () => {
  return (
    <>
      <Header />
      <div className="about-page">
        <HeroSection />
        <PregnancyWalletCards />
        <OriginSection />
        <ChallengeSection />
        <MissionVisionSection />
        <HowItWorksSection />
        <PrinciplesSection />
        <TeamSection />
        <CtaSection />
        <Footer />
      </div>
    </>
  );
};

export default About;
