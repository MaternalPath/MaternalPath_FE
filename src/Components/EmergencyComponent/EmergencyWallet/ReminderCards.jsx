import React from "react";
import { FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import "./Css/ReminderCards.css";

const ReminderCards = ({ data }) => {
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;
  const progressPercent = Math.round((data.currentBalance / data.savingsGoal) * 100);

  return (
    <div className="reminder-cards-grid">
      <div className="reminder-card blue">
        <div className="card-icon">
          <FiCalendar />
        </div>
        <div className="card-content">
          <h4>Savings Reminder</h4>
          <p>Your weekly contribution of {formatCurrency(data.weeklyContribution)} is due in 2 days.</p>
        </div>
      </div>

      <div className="reminder-card yellow">
        <div className="card-icon">
          <FiClock />
        </div>
        <div className="card-content">
          <h4>Due Date Approaching</h4>
          <p>{data.daysUntilDue} days until your estimated delivery date</p>
        </div>
      </div>

      <div className="reminder-card green">
        <div className="card-icon">
          <FiCheckCircle />
        </div>
        <div className="card-content">
          <h4>Financial Progress</h4>
          <p>You're {progressPercent}% toward your delivery savings goal.</p>
        </div>
      </div>
    </div>
  );
};

export default ReminderCards;
