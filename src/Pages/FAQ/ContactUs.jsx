import React from "react";
import "./FaqStyles/ContactUs.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const ContactUs = () => {
  const contactUs = [
    {
      id: 1,
      title: "Email Support",
      description: "We'll respond within 24 hours",
      buttonText: "Send Email",
      icon: <MdOutlineMailOutline style={{ fontSize: "25px" }} />,
      iconBg: "#dcfce7",
      iconColor: "#3f918b",
    },
    {
      id: 2,
      title: "Phone Support",
      description: "Mon-Fri, 9AM-6PM WAT",
      buttonText: "Call Us",
      icon: <FiPhone style={{ fontSize: "25px" }} />,
      iconBg: "#dcfce7",
      iconColor: "#3f918b",
    },
  ];

  return (
    <main className="ContactUs-container">
      <h1>Still Have Questions?</h1>
      <p>Our support team is here to help you every step of the way.</p>
      <aside className="ContactUs-Cards">
        {contactUs.map((item) => (
          <div className="cards" key={item.id}>
            <button className="contact-circle">{item.icon}</button>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <button className="btn-contact">{item.buttonText}</button>
          </div>
        ))}
      </aside>
      <div className="Notice">
        <p>
          Important: This platform provides educational wellness support and
          does not replace professional medical advice. Always consult your
          healthcare provider for medical decisions.
        </p>
      </div>
    </main>
  );
};

export default ContactUs;