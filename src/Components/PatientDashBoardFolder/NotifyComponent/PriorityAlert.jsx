import { FiAlertCircle, FiCalendar } from "react-icons/fi";
import "./Css/PriorityAlert.css";

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

const PriorityAlert = ({ isMobile, data = [] }) => {
  const items = Array.isArray(data) ? data : [];
  const priorityItem =
    items.find((item) => {
      const t = String(item?.type || "").toLowerCase();
      const title = String(item?.title || item?.message || "").toLowerCase();
      return (
        t.includes("priority") ||
        t.includes("urgent") ||
        title.includes("urgent")
      );
    }) || items[0];

  return (
    <div className="card">
      {!isMobile && <h3 className="section-title">Priority Alerts</h3>}
      <div className="priority-alert">
        <div className="alert-icon">
          <FiAlertCircle size={24} />
        </div>
        <div className="alert-content">
          <h4>
            {priorityItem?.title ||
              priorityItem?.message ||
              "No priority alerts"}
          </h4>
          <p>
            {priorityItem?.description || "No priority alerts from backend."}
          </p>
          {priorityItem?.time && !isMobile && (
            <p>{formatTime(priorityItem.time)}</p>
          )}
          {isMobile && (
            <button className="timeline-link">
              <FiCalendar size={14} />
              {priorityItem?.time
                ? formatTime(priorityItem.time)
                : "View Pregnancy Timeline"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriorityAlert;