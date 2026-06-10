import React from "react";
import { FiActivity, FiDroplet, FiMoon, FiCalendar, FiCheck, FiChevronRight } from "react-icons/fi";
import "./Css/CareSection.css";

const CareSection = () => {
  const reminders = [
    { icon: <FiActivity />, title: "Prenatal Vitamin", desc: "Daily • Morning", status: "Not Started" },
    { icon: <FiDroplet />, title: "Hydration Goal", desc: "8 glasses today", status: "" }
  ];

  const timelineData = {
    title: "First Trimester",
    weeks: "Weeks 1-13",
    tags: ["Embryo Formation", "Heartbeat Begins", "Organs Develop"]
  };

  return (
    <>
      <section className="reminders-card desktop-only">
        <h3 className="section-title">Weekly Care Reminders</h3>
        <div className="reminders-grid">
          <div className="reminder-item">
            <div className="reminder-icon"><FiActivity /></div>
            <div className="reminder-content">
              <h4>Prenatal Vitamin</h4>
              <p>Take daily supplement</p>
              <span className="reminder-time">Morning</span>
            </div>
          </div>
          <div className="reminder-item">
            <div className="reminder-icon"><FiDroplet /></div>
            <div className="reminder-content">
              <h4>Hydration Goal</h4>
              <p>8 glasses today</p>
              <span className="reminder-time">Throughout day</span>
            </div>
          </div>
          <div className="reminder-item">
            <div className="reminder-icon"><FiMoon /></div>
            <div className="reminder-content">
              <h4>Rest & Sleep</h4>
              <p>7-9 hours nightly</p>
              <span className="reminder-time">Evening</span>
            </div>
          </div>
          <div className="reminder-item">
            <div className="reminder-icon"><FiCalendar /></div>
            <div className="reminder-content">
              <h4>Hospital Checkup</h4>
              <p>Upcoming appointment</p>
              <span className="reminder-time">May 20, 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-section mobile-only">
        <h3 className="section-title">Weekly Care Reminders</h3>
        <div className="reminders-carousel">
          {reminders.map((item, i) => (
            <div key={i} className="reminder-card">
              <div className="reminder-header">
                <h4>{item.title}</h4>
                <div className="check-icon">
                  <FiCheck />
                </div>
              </div>
              <p className="reminder-desc">{item.desc}</p>
              <div className="reminder-progress">
                <div className="progress-line"></div>
              </div>
              <span className="reminder-status">Not Started</span>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline-card desktop-only">
        <h3 className="section-title">Pregnancy Timeline</h3>
        <div className="timeline-items">
          <div className="timeline-item completed">
            <div className="timeline-header">
              <h4>First Trimester</h4>
              <span className="badge completed">Completed</span>
            </div>
            <p className="timeline-weeks">Weeks 1-12</p>
            <div className="timeline-tags">
              <span className="tag">Initial prenatal visit</span>
              <span className="tag">First ultrasound</span>
              <span className="tag">Pregnancy confirmation</span>
            </div>
          </div>
          <div className="timeline-item current">
            <div className="timeline-header">
              <h4>Second Trimester</h4>
              <span className="badge current">Current</span>
            </div>
            <p className="timeline-weeks">Weeks 13-26</p>
            <div className="timeline-tags">
              <span className="tag">Anatomy scan</span>
              <span className="tag">Feel baby movements</span>
              <span className="tag">Glucose screening</span>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-header">
              <h4>Third Trimester</h4>
            </div>
            <p className="timeline-weeks">Weeks 27-40</p>
            <div className="timeline-tags">
              <span className="tag">Hospital tour</span>
              <span className="tag">Birth plan discussion</span>
              <span className="tag">Final preparations</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-section mobile-only">
        <h3 className="section-title">Pregnancy Timeline</h3>
        <div className="carousel-container">
          <div className="timeline-card-mobile">
            <h4>{timelineData.title}</h4>
            <p className="timeline-weeks">{timelineData.weeks}</p>
            <div className="timeline-tags">
              {timelineData.tags.map((tag, i) => (
                <span key={i} className="timeline-tag">{tag}</span>
              ))}
            </div>
          </div>
          <button className="carousel-arrow">
            <FiChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
    </>
  );
};

export default CareSection;
