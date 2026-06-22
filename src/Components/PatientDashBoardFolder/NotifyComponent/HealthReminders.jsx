import { FiActivity, FiClock } from "react-icons/fi";
import "./Css/HealthReminders.css";

const formatTime = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const HealthReminders = ({ isMobile, data = [] }) => {
  const reminders = (Array.isArray(data) ? data : [])
    .filter((item) => {
      const type = String(item?.type || "").toLowerCase();
      const text =
        `${item?.title || ""} ${item?.message || ""} ${item?.description || ""}`.toLowerCase();
      return (
        type.includes("health") ||
        type.includes("wellness") ||
        text.includes("wellness") ||
        text.includes("nutrition") ||
        text.includes("mental health") ||
        text.includes("prenatal") ||
        text.includes("hydration") ||
        text.includes("exercise") ||
        text.includes("vitamin")
      );
    })
    .map((item, idx) => ({
      id: item?.id ?? idx,
      icon: isMobile ? "💚" : <FiActivity size={20} />,
      title: item?.title || item?.message || "Health Reminder",
      desc: item?.description || "",
      time: formatTime(item?.time || item?.createdAt || item?.updatedAt),
      color: isMobile ? "blue-light" : "blue",
    }));

  return (
    <div className="card">
      <h3 className="section-title">
        {!isMobile && <FiActivity size={18} />} Health & Wellness Reminders
      </h3>
      <div className={isMobile ? "health-scroll" : "grid-3"}>
        {reminders.length === 0 && <p>No health reminders available.</p>}
        {reminders.map((reminder, idx) => (
          <div
            key={reminder.id ?? idx}
            className={`health-card ${reminder.color}`}
          >
            <div className="health-icon">{reminder.icon}</div>
            <h4>{reminder.title}</h4>
            <p>{reminder.desc}</p>
            {!isMobile && reminder.time && (
              <div className="health-time">
                <FiClock size={12} /> {reminder.time}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthReminders;