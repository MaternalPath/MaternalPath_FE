import React from "react";
import { FiBookmark, FiChevronRight, FiHeart } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import "./Css/HealthActions.css";

const HealthActions = () => {
  return (
    <>
      <section className="card-section">
        <div className="resources-header">
          <h3>Educational Resources</h3>
          <button className="view-all">View All Articles</button>
        </div>
        <div className="resources-grid">
          <div className="resource-card">
            <span className="tag">Trimester Education</span>
            <h4>Understanding Your Second Trimester</h4>
            <p>Learn about the physical and emotional changes during weeks 13-26 of pregnancy.</p>
            <div className="resource-footer">
              <span>5 min read</span>
              <button><FiBookmark /> Read More <FiChevronRight /></button>
            </div>
          </div>
          <div className="resource-card">
            <span className="tag">Baby Development</span>
            <h4>Baby Development: Week by Week</h4>
            <p>Discover how your baby is growing and developing throughout your pregnancy journey.</p>
            <div className="resource-footer">
              <span>8 min read</span>
              <button><FiBookmark /> Read More <FiChevronRight /></button>
            </div>
          </div>
          <div className="resource-card">
            <span className="tag">Safety Guidelines</span>
            <h4>Safe Pregnancy Practices</h4>
            <p>Essential guidelines for a healthy pregnancy including diet, exercise, and lifestyle.</p>
            <div className="resource-footer">
              <span>6 min read</span>
              <button><FiBookmark /> Read More <FiChevronRight /></button>
            </div>
          </div>
          <div className="resource-card">
            <span className="tag">Birth Preparation</span>
            <h4>Preparing for Labor and Delivery</h4>
            <p>What to expect during labor, breathing techniques, and birth plan considerations.</p>
            <div className="resource-footer">
              <span>10 min read</span>
              <button><FiBookmark /> Read More <FiChevronRight /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="card-section">
        <h3 className="section-title plain">Health Reminders</h3>
        <div className="reminders-grid">
          <div className="reminder-card">
            <div className="reminder-icon">📎</div>
            <div>
              <h4>Prenatal Vitamins</h4>
              <p>Take your daily prenatal supplement</p>
              <span className="time">🕒 Daily - Morning</span>
            </div>
          </div>
          <div className="reminder-card">
            <div className="reminder-icon">💧</div>
            <div>
              <h4>Hydration Reminder</h4>
              <p>Drink 8-10 glasses of water today</p>
              <span className="time">🕒 Throughout the day</span>
            </div>
          </div>
          <div className="reminder-card">
            <div className="reminder-icon">⚡</div>
            <div>
              <h4>Gentle Exercise</h4>
              <p>20-minute prenatal walk or stretching</p>
              <span className="time">🕒 Afternoon or Evening</span>
            </div>
          </div>
        </div>
      </section>

      <section className="card-section">
        <h3 className="quick-title">Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <FiHeart />
            <span>View Pregnancy Tracker</span>
            <FiChevronRight className="chev" />
          </button>
          <button className="action-btn">
            <LuWallet />
            <span>Add to Emergency Wallet</span>
            <FiChevronRight className="chev" />
          </button>
        </div>
      </section>
    </>
  );
};

export default HealthActions;
