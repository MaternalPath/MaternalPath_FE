import React from "react";
import "./DashboardHome.css";
import {
  FiCreditCard,
  FiCheckCircle,
  FiCalendar,
  FiHeart,
  FiBell,
  FiChevronRight,
  FiTarget,
  FiActivity,
} from "react-icons/fi";
import { FaAppleAlt } from "react-icons/fa";

const PregnancyDashboard = ({ data }) => {
  const userData = data || {
    name: "Adaeze Nnamdi",
    week: 24,
    trimester: "Second Trimester",
    dueDate: "September 18, 2026",
    daysUntilDue: 128,
    hospital: "Lagos General Hospital",
    pregnancyProgress: 60,
    walletBalance: 285000,
    savingsGoal: 400000,
    savingsProgress: 71,
    readinessStatus: "Moderate Preparedness",
  };

  const reminders = [
    { title: "Prenatal Vitamins", subtitle: "Daily - Morning" },
    { title: "Hydration Goal", subtitle: "Drink 8 glasses today" },
    { title: "Gentle Exercise", subtitle: "20 minute walk" },
  ];

  const weeklyFocus = [
    {
      title: "Nutrition",
      desc: "Iron-rich foods and proper hydration",
      bgColor: "#E8F1FF",
      icon: <FaAppleAlt size={20} color="#3B82F6" />,
    },
    {
      title: "Wellness",
      desc: "Gentle prenatal yoga and adequate rest",
      bgColor: "#E7F8F0",
      icon: <FiHeart size={20} color="#10B981" />,
    },
    {
      title: "Milestone",
      desc: "Second trimester progressing well",
      bgColor: "#FFF7ED",
      icon: <FiTarget size={20} color="#F59E0B" />,
    },
  ];

  const notifications = [
    {
      title: "You are now in Week 24",
      desc: "Your baby is growing beautifully",
      time: "2 hours ago",
      bgColor: "#E8F1FF",
      icon: <FiActivity size={18} color="#3B82F6" />,
    },
    {
      title: "Savings milestone reached",
      desc: "70% of your delivery goal",
      time: "1 day ago",
      bgColor: "#E7F8F0",
      icon: <FiCreditCard size={18} color="#10B981" />,
    },
    {
      title: "Appointment tomorrow",
      desc: "Dr. Okonkwo at 10:00 AM",
      time: "1 day ago",
      bgColor: "#FEF3C7",
      icon: <FiCalendar size={18} color="#F59E0B" />,
    },
  ];

  return (
    <main className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome back, {userData.name}</h1>
          <p>Here's your pregnancy journey overview</p>
        </div>

        <div className="card card-hero">
          <h2>
            Week {userData.week}{" "}
            <span className="trimester">{userData.trimester}</span>
          </h2>
          <p className="subtitle">
            Your baby is growing beautifully this week.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Estimated Due Date</div>
              <div className="stat-value">{userData.dueDate}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Days Until Due Date</div>
              <div className="stat-value">{userData.daysUntilDue} days</div>
            </div>
            <div className="stat-item full-width">
              <div className="stat-label">Preferred Hospital</div>
              <div className="stat-value">{userData.hospital}</div>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <span className="progress-label">Pregnancy Progress</span>
              <span className="progress-week">Week {userData.week} of 40</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${userData.pregnancyProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card card-wallet">
          <div className="card-header">
            <div className="card-title">
              <FiCreditCard size={18} />
              Emergency Wallet
            </div>
            <a className="card-link">
              View Details <FiChevronRight size={16} />
            </a>
          </div>

          <div className="wallet-stats">
            <div className="stat-item">
              <div className="stat-label">Current Balance</div>
              <div className="stat-value">
                ₦{userData.walletBalance.toLocaleString()}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Savings Goal</div>
              <div className="stat-value">
                ₦{userData.savingsGoal.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="readiness-row">
            <span className="stat-label">Readiness Status</span>
            <span className="readiness-badge">{userData.readinessStatus}</span>
          </div>

          <div className="wallet-progress-header">
            <span className="stat-label">Savings Progress</span>
            <span className="percentage">
              {userData.savingsProgress}% Complete
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${userData.savingsProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <FiCheckCircle size={18} />
              Today's Reminders
            </div>
          </div>
          <div className="reminder-list">
            {reminders.map((item, idx) => (
              <div key={idx} className="reminder-item">
                <input type="checkbox" className="reminder-checkbox" />
                <div className="reminder-content">
                  <div className="reminder-title">{item.title}</div>
                  <div className="reminder-subtitle">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="focus-section">
          <h3 className="section-title">This Week's Focus</h3>
          <div className="focus-scroll">
            {weeklyFocus.map((item, idx) => (
              <div
                key={idx}
                className="focus-card"
                style={{ background: item.bgColor }}
              >
                <div className="focus-icon">{item.icon}</div>
                <div className="focus-title">{item.title}</div>
                <div className="focus-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Recent Notifications</div>
            <a className="card-link">View All</a>
          </div>
          <div className="notification-list">
            {notifications.map((item, idx) => (
              <div key={idx} className="notification-item">
                <div
                  className="notification-icon"
                  style={{ background: item.bgColor }}
                >
                  {item.icon}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{item.title}</div>
                  <div className="notification-desc">{item.desc}</div>
                  <div className="notification-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PregnancyDashboard;
