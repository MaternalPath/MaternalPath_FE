import React, { useState, useEffect } from "react";
import "./FaqStyles/FAQ.css";
import { IoIosArrowDown } from "react-icons/io";
import { frequentAskquestion } from "./Data";

const FAQ = ({ activeQuestion, searchTerm = "" }) => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    if (activeQuestion) {
      setOpenId(activeQuestion);

      const element = document.getElementById(`faq-${activeQuestion}`);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [activeQuestion]);

  const filteredQuestions = frequentAskquestion.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="Faq-container">
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((item) => (
          <div className="Faqholder" key={item.id} id={`faq-${item.id}`}>
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
        ))
      ) : (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "18px",
            color: "#3f918b",
          }}
        >
          No matching questions found.
        </p>
      )}
    </section>
  );
};

export default FAQ;