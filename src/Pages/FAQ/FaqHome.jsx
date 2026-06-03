import React from "react";
import Header from "../../Components/header/header";
import "./FaqStyles/FaqHome.css";
import { FiSearch } from "react-icons/fi";
import FAQs from "./FAQ";
import PTopics from "./Topics";
import ContactUs from "./ContactUs";
import HelpCenter from "./HelpCenter";
import Footer from "../../Components/Footer/Footer";

const FaqHome = () => {
  return (
    <>
      <Header />
      <main className="FaqHome-container">
        <div className="FaqHome-holder">
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to common questions about MaternalPath, pregnancy
            tracking, and delivery fund savings.
          </p>
          <div className="search-input-holder">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="faqHome-input"
              placeholder="Search for answers..."
            />
          </div>
        </div>
        <div className="faqHome-buttom">
          <button style={{ backgroundColor: "#267872", color: "#ffffff" }}>
            All Questions
          </button>
          <button>Getting Started</button>
          <button className="longerBtn"> Savings & Payments</button>
          <button className="longerBtn">Pregnancy Tracking</button>
          <button>Hospitals</button>
          <button className="longerBtn">Security & Privacy</button>
        </div>
      </main>
      <FAQs />
      <PTopics />
      <ContactUs />
      <HelpCenter />
      <Footer />
    </>
  );
};

export default FaqHome;