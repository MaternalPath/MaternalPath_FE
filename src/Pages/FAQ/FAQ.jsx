import React, { useState } from "react";
import "./FaqStyles/FAQ.css";
import { IoIosArrowDown } from "react-icons/io";
import { frequentAskquestion } from "./FaqData";

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="Fag-container">
      {frequentAskquestion.map((item) => (
        <div className="Faqholder" key={item.id}>
          <div
            className="dropdown_holder"
            onClick={() => handleToggle(item.id)}
          >
            <h4>{item.question}</h4>

            <IoIosArrowDown
              className={`arrow-icon ${openId === item.id ? "rotate" : ""}`}
            />
          </div>

          {openId === item.id && <p className="faq-answer">{item.answer}</p>}
        </div>
      ))}
    </section>
  );
};

export default FAQ;