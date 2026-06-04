import React from "react";
import "./EmergencyWallet.css";
import {
  FiPlus,
  FiTarget,
  FiDownload,
  FiCalendar,
  FiArrowUpRight,
  FiCheck,
  FiInfo,
  FiClock,
  FiShield,
  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";
import { MdOutlineSavings, MdOutlineLocalHospital } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiPiggyBank } from "react-icons/pi";

const EmergencyWallet = () => {
  const savingsData = [
    { month: "January", amount: 60000, completed: true },
    { month: "February", amount: 45000, completed: true },
    { month: "March", amount: 60000, completed: true },
    { month: "April", amount: 55000, completed: true },
    { month: "May", amount: 75000, completed: true, active: true },
    { month: "June", amount: 0, target: 40000, completed: false },
  ];

  const transactions = [
    {
      date: "May 12, 2026",
      type: "Contribution",
      desc: "Monthly savings deposit",
      amount: 25000,
      status: "Completed",
    },
    {
      date: "May 05, 2026",
      type: "Contribution",
      desc: "Weekly savings deposit",
      amount: 10000,
      status: "Completed",
    },
    {
      date: "April 28, 2026",
      type: "Contribution",
      desc: "Monthly savings deposit",
      amount: 30000,
      status: "Completed",
    },
    {
      date: "April 20, 2026",
      type: "Contribution",
      desc: "Weekly savings deposit",
      amount: 10000,
      status: "Completed",
    },
    {
      date: "April 12, 2026",
      type: "Contribution",
      desc: "Family contribution",
      amount: 15000,
      status: "Completed",
    },
  ];

  return (
    <div className="emergency-wallet">
      <div className="wallet-header">
        <div className="wallet-header-left">
          <h1>Emergency Wallet</h1>
          <p>Track your delivery savings and stay financially prepared.</p>
        </div>
        <button className="add-funds-btn desktop-emergency">
          <FiPlus size={18} /> Add Funds
        </button>
      </div>

      <div className="wallet-hero desktop-emergency">
        <div className="hero-content">
          <div className="hero-main">
            <div className="hero-balance">
              <h2>₦285,000</h2>
              <span>Current Savings Balance</span>
              <p>You're making great progress toward your delivery goal.</p>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-label">Delivery Savings Goal</span>
                <span className="stat-value">₦400,000</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Remaining Amount Needed</span>
                <span className="stat-value">₦115,000</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Estimated Due Date</span>
                <span className="stat-value">September 18, 2026</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Days Until Due Date</span>
                <span className="stat-value">128 days</span>
              </div>
            </div>
            <div className="hero-progress">
              <div className="progress-label">
                <span>Savings Progress</span>
                <span>71% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "71%" }}></div>
              </div>
              <div className="progress-range">
                <span>₦0</span>
                <span>₦400,000</span>
              </div>
            </div>
          </div>
          <div className="hero-card">
            <div className="readiness-icon">
              <FiTarget size={24} />
            </div>
            <span className="readiness-label">Readiness Status</span>
            <span className="readiness-value">Moderate Preparedness</span>
            <span className="readiness-badge">71% Ready</span>
          </div>
        </div>
      </div>

      <div className="wallet-hero-mobile mobile-emergency">
        <div className="mobile-hero-card">
          <span className="mobile-hero-label">Current Savings Balance</span>
          <h2>₦285,000</h2>
          <span className="mobile-hero-updated">Updated today at 2:45 PM</span>
          <div className="mobile-hero-stats">
            <div className="mobile-stat">
              <span>Monthly Deposit</span>
              <span>₦60,000</span>
            </div>
            <div className="mobile-stat">
              <span>Savings Goal</span>
              <span>₦400,000</span>
            </div>
          </div>
          <div className="mobile-readiness">
            <span>Readiness Status</span>
            <span className="readiness-badge">Moderate Preparedness</span>
          </div>
          <div className="mobile-progress">
            <div className="mobile-progress-header">
              <span>Goal Progress</span>
              <span>71% Complete</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "71%" }}></div>
            </div>
          </div>
          <button className="mobile-add-funds">
            <FiPlus size={18} /> Add Funds Now
          </button>
        </div>
        <div className="mobile-hero-bottom">
          <div className="mobile-bottom-card">
            <span>Last Deposit</span>
            <span>May 14, 2026</span>
          </div>
          <div className="mobile-bottom-card">
            <span>Next Scheduled</span>
            <span>June 1, 2026</span>
          </div>
        </div>
      </div>

      <div className="wallet-grid">
        <div className="card">
          <div className="card-header">
            <BsGraphUpArrow size={18} />
            <span>Savings Progress</span>
          </div>
          <div className="savings-list desktop-emergency">
            {savingsData.map((item) => (
              <div
                key={item.month}
                className={`savings-item ${item.active ? "active" : ""}`}
              >
                <div
                  className={`savings-check ${item.completed ? "checked" : ""} ${item.active ? "active" : ""}`}
                >
                  {item.completed && <FiCheck size={14} />}
                </div>
                <div className="savings-info">
                  <span>{item.month}</span>
                  {item.target && (
                    <span className="savings-target">
                      Target: ₦{item.target.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="savings-amount">
                  ₦{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="savings-scroll mobile-emergency">
            {savingsData.slice(0, 3).map((item) => (
              <div key={item.month} className="savings-card">
                <div className="savings-card-icon">
                  <FiCheck size={18} />
                </div>
                <span className="savings-card-month">{item.month}</span>
                <span className="savings-card-amount">
                  ₦{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <FiInfo size={18} />
            <span>Savings Insights</span>
          </div>
          <div className="insights-list">
            <div className="insight-item blue">
              <div className="insight-icon">
                <BsGraphUpArrow size={18} />
              </div>
              <div className="insight-content">
                <span className="insight-title">
                  Weekly Contribution Recommendation
                </span>
                <span className="insight-desc">
                  Saving ₦6,053 weekly can help you reach your goal before
                  delivery.
                </span>
              </div>
            </div>
            <div className="insight-item desktop-emergency">
              <div className="insight-content">
                <span className="insight-title">
                  Current Weekly Contribution
                </span>
                <span className="insight-desc">₦10,000 per week</span>
              </div>
            </div>
            <div className="insight-item desktop-emergency">
              <div className="insight-content">
                <span className="insight-title">
                  Weeks Remaining Until Due Date
                </span>
                <span className="insight-desc">19 weeks</span>
              </div>
            </div>
            <div className="insight-item green">
              <div className="insight-content">
                <span className="insight-title">On Track</span>
                <span className="insight-desc">
                  At your current pace, you'll reach 100% of your goal by late
                  August.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header space-between">
          <span>Transaction History</span>
          <span className="card-link">View All</span>
        </div>
        <div className="table-wrapper desktop-emergency">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>
                    <span className="type-badge">
                      <FiArrowUpRight size={14} /> {t.type}
                    </span>
                  </td>
                  <td>{t.desc}</td>
                  <td className="amount">₦{t.amount.toLocaleString()}</td>
                  <td>
                    <span className="status-badge">{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="transaction-list mobile-emergency">
          {transactions.slice(0, 3).map((t, i) => (
            <div key={i} className="transaction-item">
              <div className="transaction-icon">
                <FiArrowUpRight size={16} />
              </div>
              <div className="transaction-info">
                <span className="transaction-desc">{t.desc}</span>
                <span className="transaction-date">{t.date}</span>
              </div>
              <div className="transaction-right">
                <span className="transaction-amount">
                  +₦{t.amount.toLocaleString()}
                </span>
                <span className="status-badge">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span>Quick Actions</span>
        </div>
        <div className="quick-actions">
          <button className="action-btn">
            <div className="action-icon">
              <FiPlus size={20} />
            </div>
            <span>Add Funds</span>
          </button>
          <button className="action-btn desktop-emergency">
            <div className="action-icon">
              <FiTarget size={20} />
            </div>
            <span>Update Savings Goal</span>
          </button>
          <button className="action-btn mobile-emergency">
            <div className="action-icon">
              <BsGraphUpArrow size={20} />
            </div>
            <span>Track Savings</span>
          </button>
          <button className="action-btn desktop-emergency">
            <div className="action-icon">
              <FiDownload size={20} />
            </div>
            <span>Download Statement</span>
          </button>
          <button className="action-btn mobile-emergency">
            <div className="action-icon">
              <FiCalendar size={20} />
            </div>
            <span>Set Reminders</span>
          </button>
          <button className="action-btn desktop-emergency">
            <div className="action-icon">
              <MdOutlineLocalHospital size={20} />
            </div>
            <span>View Hospital Readiness</span>
          </button>
          <button className="action-btn mobile-emergency">
            <div className="action-icon">
              <FiDownload size={20} />
            </div>
            <span>Download Reports</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <MdOutlineLocalHospital size={18} />
          <span>Hospital Readiness</span>
        </div>
        <div className="hospital-card desktop-emergency">
          <div className="hospital-row">
            <div className="hospital-stat">
              <span className="stat-label">Preferred Hospital</span>
              <span className="stat-value">Lagos General Hospital</span>
            </div>
            <div className="hospital-stat">
              <span className="stat-label">Estimated Delivery Cost</span>
              <span className="stat-value">₦400,000</span>
            </div>
            <div className="hospital-stat">
              <span className="stat-label">Wallet Coverage</span>
              <span className="stat-value">71% Covered</span>
            </div>
            <div className="hospital-stat">
              <span className="stat-label">Eligibility Status</span>
              <span className="readiness-badge">Moderate Preparedness</span>
            </div>
          </div>
          <div className="progress-bar dark">
            <div className="progress-fill" style={{ width: "71%" }}></div>
          </div>
        </div>
        <div className="hospital-mobile mobile-emergency">
          <div className="hospital-mobile-card">
            <span className="hospital-label">Preferred Hospital</span>
            <span className="hospital-name">Lagos General Hospital</span>
            <div className="hospital-row">
              <div className="hospital-stat">
                <span>Estimated Cost</span>
                <span>₦400,000</span>
              </div>
              <div className="hospital-stat">
                <span>Fund Readiness</span>
                <span className="orange">71%</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "71%" }}></div>
            </div>
          </div>
          <div className="feature-item blue">
            <div className="feature-icon">
              <FiShield size={20} />
            </div>
            <div className="feature-content">
              <span className="feature-title">Secured Savings</span>
              <span className="feature-desc">
                Your funds are protected and can emergency be accessed for verified
                delivery expenses
              </span>
            </div>
          </div>
          <div className="feature-item pink">
            <div className="feature-icon">
              <FiFileText size={20} />
            </div>
            <div className="feature-content">
              <span className="feature-title">Fast Fund Verification</span>
              <span className="feature-desc">
                Hospitals can instantly verify your available funds for seamless
                admission
              </span>
            </div>
          </div>
          <div className="feature-item green">
            <div className="feature-icon">
              <PiPiggyBank size={20} />
            </div>
            <div className="feature-content">
              <span className="feature-title">Flexible Savings Plan</span>
              <span className="feature-desc">
                Adjust your weekly or monthly contributions based on your
                financial capacity
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="alerts-row">
        <div className="alert-card blue">
          <div className="alert-icon">
            <FiCalendar size={20} />
          </div>
          <div className="alert-content">
            <span className="alert-title">Savings Reminder</span>
            <span className="alert-desc">
              Your weekly contribution of ₦10,000 is due in 2 days.
            </span>
          </div>
        </div>
        <div className="alert-card orange">
          <div className="alert-icon">
            <FiClock size={20} />
          </div>
          <div className="alert-content">
            <span className="alert-title">Due Date Approaching</span>
            <span className="alert-desc">
              128 days until your estimated delivery date.
            </span>
          </div>
        </div>
        <div className="alert-card green">
          <div className="alert-icon">
            <FiCheck size={20} />
          </div>
          <div className="alert-content">
            <span className="alert-title">Financial Progress</span>
            <span className="alert-desc">
              You're 71% toward your delivery savings goal.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyWallet;
