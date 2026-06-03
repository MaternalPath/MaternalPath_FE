import React from "react";
import "./landingpage.css";
import Header from "../../components/header/header";
import HeroPage1 from "../../Components/HeroPage1/HeroPage1";
import HeroPage2 from "../../Components/HeroPage2/HeroPage2";
import HeroPage3 from "../../Components/HeroPage3/HeroPage3";
import Footer from "../../Components/Footer/Footer";

const LandingPage = () => {
  return (
    <>
<Header />
<HeroPage1 />
<HeroPage2/>
<HeroPage3 />
<Footer/>
    </>
  );
};

export default LandingPage;
