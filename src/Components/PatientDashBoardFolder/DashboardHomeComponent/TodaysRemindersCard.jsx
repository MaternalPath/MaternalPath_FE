import React from "react";
import "./Css/TodaysRemindersCard.css";
import { FiCheckCircle, FiCalendar } from "react-icons/fi";

const normalizeReminders = (reminder) => {
  if (!reminder) return [];
  if (reminder.data) return normalizeReminders(reminder.data);

  if (Array.isArray(reminder)) {
    return reminder
      .filter(Boolean)
      .map((item) => {
        if (typeof item === "string") return { title: item };
        if (typeof item === "object") {
          return {
            title:
              item.title ||
              item.reminder ||
              item.text ||
              item.message ||
              item.description ||
              "Reminder",
            subtitle:
              item.subtitle ||
              item.description ||
              item.details ||
              item.time ||
              "",
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  if (Array.isArray(reminder?.reminders)) {
    return normalizeReminders(reminder.reminders);
  }

  const text =
    typeof reminder === "string"
      ? reminder
      : reminder?.reminder || reminder?.title || reminder?.text;
  if (!text || text === "No reminder available.") return [];

  return [
    {
      title: text,
      subtitle: reminder?.subtitle || reminder?.description || "",
    },
  ];
};

const TodaysRemindersCard = ({ dashboardData: reminder }) => {
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
