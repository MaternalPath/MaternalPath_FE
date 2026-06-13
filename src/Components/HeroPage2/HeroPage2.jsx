import React, { useState } from "react";
import "./HeroPage2.css";
import { FaSignature } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";
import { MdOutlineChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
const FeaturesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      icon: <FaSignature />,
      title: "Pregnancy Tracking",
      desc: "Monitor your baby's growth and development week by week with personalized insights.",
      route: "/pregnancyTracker",
    },
    {
      icon: <FaRegHeart />,
      title: "Health Guidance",
      desc: "Get tailored nutrition advice, exercise tips, and health recommendations for you and your baby.",
    },
    {
      icon: <LuWallet />,
      title: "Emergency Wallet",
      desc: "Save securely for delivery costs and build financial readiness for your baby's arrival.",
    },
    {
      icon: <IoLocationOutline />,
      title: "Preferred Hospitals",
      desc: "Find and save your preferred hospitals and healthcare providers for delivery day.",
    },
  ];

  const testimonials = [
    {
      name: "Blessing O.",
      location: "Abuja, Nigeria",
      quote:
        "I loved the nutrition guidance and health reminders. It felt like having a supportive companion through every stage of pregnancy.",
    },
    {
      name: "Fatima I.",
      location: "Kano, Nigeria",
      quote:
        "The emergency wallet helped me save for delivery without stress. I felt financially prepared when it was time to give birth.",
    },
    {
      name: "Aisha M.",
      location: "Lagos, Nigeria",
      quote:
        "Finding hospitals near me was so easy. I felt confident knowing I had options ready for delivery day.",
    },
    {
      name: "Grace K.",
      location: "Port Harcourt, Nigeria",
      quote:
        "The weekly tracking kept me informed about my baby's growth. It made me feel connected to my pregnancy journey.",
    },
  ];

  const cardsToShow = 3;
  const totalCards = testimonials.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % totalCards;
      visible.push({ ...testimonials[index], key: `${index}-${i}` });
    }
    return visible;
  };

  return (
    <>
      <section className="mp-features">
        <div className="mp-features-container">
          <h2 className="mp-sections-title">
            Everything you need for a healthy pregnancy and a prepared delivery
          </h2>

          <div className="mp-features-grid">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="mp-features-card"
                onClick={() => navigate(feature.route)}
              >
                <div className="mp-features-icon">{feature.icon}</div>
                <h3 className="mp-features-title">{feature.title}</h3>
                <p className="mp-features-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mp-testimonials">
        <div className="mp-testimonials-container">
          <h2 className="mp-section-title mp-section-title-center">
            Trusted by Mothers
          </h2>
          <p className="mp-section-subtitle">
            Hear from mothers who used our platform
          </p>

          <div className="mp-testimonial-grid">
            {getVisibleTestimonials().map((testimonial) => (
              <div key={testimonial.key} className="mp-testimonial-card">
                <div className="mp-testimonial-header">
                  <div className="mp-testimonial-avatar">
                    <RxPeople />
                  </div>
                  <div className="mp-testimonial-info">
                    <div className="mp-testimonial-name">
                      {testimonial.name}
                    </div>
                    <div className="mp-testimonial-location">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <p className="mp-testimonial-quote">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>

          <div className="mp-carousel-controls">
            <button
              className="mp-carousel-btn"
              onClick={prevSlide}
              aria-label="Previous"
            >
              <MdOutlineChevronLeft />
            </button>
            <div className="mp-carousel-dots">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`mp-carousel-dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              className="mp-carousel-btn"
              onClick={nextSlide}
              aria-label="Next"
            >
              <MdChevronRight />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
