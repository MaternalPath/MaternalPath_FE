import React from "react";
import "./Css/TodaysRemindersCard.css";
import { FiCheckCircle, FiCalendar } from "react-icons/fi";

const normalizeReminders = (reminder) => {
  if (!reminder) return [];
  if (Array.isArray(reminder)) return reminder;
  if (Array.isArray(reminder?.reminders)) return reminder.reminders;

  const text = typeof reminder === "string" ? reminder : reminder?.reminder;
  if (!text || text === "No reminder available.") return [];

  return [{ title: text }];
};

const TodaysRemindersCard = ({ reminder }) => {
  const items = normalizeReminders(reminder);

  return (
    <div className="card card-reminders">
      <div className="card-header">
        <div className="card-title">
          <FiCheckCircle size={18} />
          Today's Reminders
        </div>
      </div>
      <div className="reminder-list">
        {items.length === 0 && (
          <p className="reminder-empty">No reminders for today.</p>
        )}
        {items.map((item, idx) => (
          <div key={idx} className="reminder-item">
            <div className="reminder-icon">
              <FiCalendar size={18} />
            </div>
            <div className="reminder-content">
              <div className="reminder-title">{item.title}</div>
              {item.subtitle && (
                <div className="reminder-subtitle">{item.subtitle}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysRemindersCard;
