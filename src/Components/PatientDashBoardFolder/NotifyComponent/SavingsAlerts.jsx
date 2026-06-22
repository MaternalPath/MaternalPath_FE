import { FiHome, FiClock, FiTrendingUp } from "react-icons/fi";
import "./Css/SavingsAlerts.css";

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

const SavingsAlerts = ({ isMobile, data = [] }) => {
  const alerts = (Array.isArray(data) ? data : [])
    .filter((item) => {
      const type = String(item?.type || "").toLowerCase();
      const text =
        `${item?.title || ""} ${item?.message || ""} ${item?.description || ""}`.toLowerCase();
      return (
        type.includes("wallet") ||
        type.includes("savings") ||
        text.includes("wallet") ||
        text.includes("savings") ||
        text.includes("contribution")
      );
    })
    .map((item, idx) => ({
      id: item?.id ?? idx,
      icon: <FiTrendingUp size={20} />,
      title: item?.title || item?.message || "Savings Alert",
      desc: item?.description || "",
      time: formatTime(item?.time || item?.createdAt || item?.updatedAt),
    }));

  return (
    <div className="card">
      <h3 className="section-title">
        {!isMobile && <FiHome size={18} />} Savings & Wallet Alerts
      </h3>
      <div className={isMobile ? "savings-scroll" : "grid-2"}>
        {alerts.length === 0 && <p>No savings alerts available.</p>}
        {alerts.map((alert, idx) => (
          <div key={alert.id ?? idx} className="mini-card">
            <div className="mini-icon">{alert.icon}</div>
            <div>
              <h4>{alert.title}</h4>
              <p>{alert.desc}</p>
              {alert.time && (
                <div className="notif-meta">
                  <FiClock size={12} /> {alert.time}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsAlerts;