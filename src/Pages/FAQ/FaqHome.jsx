import React, { useState } from "react";
import Header from "../../Components/header/header";
import "./FaqStyles/FaqHome.css";
import { FiSearch } from "react-icons/fi";
import FAQs from "./FAQ";
import PTopics from "./Topics";
import ContactUs from "./ContactUs";
import HelpCenter from "./HelpCenter";
import Footer from "../../Components/Footer/Footer";

const FaqHome = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isActive = (id) => activeQuestion === id;

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
            <FiSearch className="search-icons" /> {/* fixed className */}
            <input
              type="text"
              className="faqHome-input"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="faqHome-buttom">
          <button
            className={isActive(null) ? "active" : ""}
            onClick={() => setActiveQuestion(null)}
          >
            All Questions
          </button>

          <button
            className={isActive(1) ? "active" : ""}
            onClick={() => setActiveQuestion(1)}
          >
            Getting Started
          </button>

          <button
            className={`longerBtn ${isActive(4) ? "active" : ""}`}
            onClick={() => setActiveQuestion(4)}
          >
            Savings & Payments
          </button>

          <button
            className={`longerBtn ${isActive(9) ? "active" : ""}`}
            onClick={() => setActiveQuestion(9)}
          >
            Pregnancy Tracking
          </button>

          <button
            className={isActive(12) ? "active" : ""}
            onClick={() => setActiveQuestion(12)}
          >
            Hospitals
          </button>

          <button
            className={`longerBtn ${isActive(16) ? "active" : ""}`}
            onClick={() => setActiveQuestion(16)}
          >
            Security & Privacy
          </button>
        </div>
      </main>

      <FAQs activeQuestion={activeQuestion} searchTerm={searchTerm} />
      <PTopics />
      <ContactUs />
      <HelpCenter />
      <Footer />
    </>
  );
};

export default FaqHome;
