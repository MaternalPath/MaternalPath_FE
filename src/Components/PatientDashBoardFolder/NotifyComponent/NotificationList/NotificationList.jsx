import {
  FiRefreshCw,
  FiTrendingUp,
  FiCalendar,
  FiCheckCircle,
  FiHeart,
  FiCreditCard,
  FiActivity,
} from "react-icons/fi";
import NotificationItem from "./NotificationItem/NotificationItem";
import "../Css/NotificationList.css";

const iconByType = (type = "") => {
  const t = String(type).toLowerCase();
  if (t.includes("pregnancy")) return <FiRefreshCw size={20} />;
  if (t.includes("health") || t.includes("wellness"))
    return <FiActivity size={20} />;
  if (t.includes("wallet") || t.includes("savings") || t.includes("payment"))
    return <FiTrendingUp size={20} />;
  if (t.includes("appointment") || t.includes("schedule"))
    return <FiCalendar size={20} />;
  if (t.includes("hospital") || t.includes("verification"))
    return <FiCheckCircle size={20} />;
  if (t.includes("card") || t.includes("contribution"))
    return <FiCreditCard size={20} />;
  return <FiHeart size={20} />;
};

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

const NotificationList = ({ isMobile, data = [] }) => {
  const notifications = (Array.isArray(data) ? data : []).map((item, idx) => ({
    id: item?.id ?? idx,
    icon: iconByType(item?.type),
    title: item?.title || item?.message || "Notification",
    desc: item?.description || "",
    time: formatTime(item?.time || item?.createdAt || item?.updatedAt),
    tag: item?.type || "General",
    unread: Boolean(item?.unread),
  }));

  return (
    <div className="card">
      <h3 className="section-title">
        {isMobile ? "Recent Updates" : "All Notifications"}
      </h3>
      <div className="notif-list">
        {notifications.length === 0 && <p>No notifications available.</p>}
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} {...notif} isMobile={isMobile} />
        ))}
      </div>
      {notifications.length > 0 && (
        <button className="load-more">Load More Notifications</button>
      )}
    </div>
  );
};

export default NotificationList;