import React, { useState, useEffect } from "react";
import {
  FiCheck,
  FiFileText,
  FiActivity,
  FiAlertCircle,
  FiShield,
  FiBell,
} from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import "./Css/NotificationsFeed.css";

const TAB_TYPE_MAP = {
  "Verification Alerts": "verification_alert",
  Reviews: "pending_review",
  "Bill Updates": "bill_upload_update",
  "Security Alerts": "system_notification",
};

const NotificationsFeed = ({ refreshTrigger, activeTab }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionId, setActionId] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const getIconForType = (type) => {
    const map = {
      Verification: <FiCheck />,
      Bill: <FiFileText />,
      Review: <FiActivity />,
      Security: <FiShield />,
      Alert: <FiAlertCircle />,
    };
    return map[type] || <FiBell />;
  };

  const getIconTypeClass = (type) => {
    const map = {
      Verification: "green",
      Bill: "teal",
      Review: "gray",
      Security: "red",
      Alert: "red",
    };
    return map[type] || "gray";
  };

  const getBadgeStyle = (status) => {
    const map = {
      Approved: "green",
      Confirmed: "green",
      "Pending Review": "orange",
      "Awaiting Approval": "red",
      Updated: "green",
    };
    return map[status] || "gray";
  };

  const fetchNotifications = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setLoading(false);
      setError("Authentication required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const type = TAB_TYPE_MAP[activeTab];

      const response = type
        ? await axios.get(`${baseURL}/notifications/type/${type}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 1, limit: 20 },
          })
        : await axios.get(`${baseURL}/notifications/read`, {
            headers: { Authorization: `Bearer ${token}` },
          });

      const data = response.data?.data || response.data || [];
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      const msg = err.response?.data?.message || "Failed to load notifications";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [refreshTrigger, activeTab]);

  const markAsRead = async (id) => {
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    setActionId(id);
    try {
      await axios.patch(
        `${baseURL}/notifications/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      toast.success("Marked as read");
    } catch (err) {
      console.error("Error marking as read:", err);
      toast.error(err.response?.data?.message || "Failed to mark as read");
    } finally {
      setActionId(null);
    }
  };

  const deleteNotification = async (id) => {
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    setActionId(id);
    try {
      await axios.delete(`${baseURL}/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.filter((n) => n.id !== id));
      toast.success("Notification deleted");
    } catch (err) {
      console.error("Error deleting notification:", err);
      toast.error(
        err.response?.data?.message || "Failed to delete notification",
      );
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="notif-feed">
        <h2 className="notif-feed-title">{activeTab}</h2>
        <div className="notif-loading">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notif-feed">
        <h2 className="notif-feed-title">{activeTab}</h2>
        <div className="notif-error">
          <p>{error}</p>
          <button onClick={fetchNotifications} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="notif-feed">
      <h2 className="notif-feed-title">{activeTab}</h2>{" "}
      <div className="notif-feed-list">
        {notifications.length > 0 ? (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`notif-card ${item.highlight ? "highlight" : ""} ${!item.isRead ? "unread" : ""}`}
            >
              <div className={`notif-card-icon ${getIconTypeClass(item.type)}`}>
                {getIconForType(item.type)}
              </div>
              <div className="notif-card-content">
                <h3 className="notif-card-title">{item.title}</h3>
                <p className="notif-card-desc">{item.description}</p>
                <div className="notif-card-footer">
                  <span className="notif-card-time">{item.time}</span>
                  {item.badge && (
                    <span
                      className={`notif-badge ${getBadgeStyle(item.badge)}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
              <div className="notif-card-actions">
                {!item.isRead && (
                  <button
                    title="Mark as read"
                    onClick={() => markAsRead(item.id)}
                    disabled={actionId === item.id}
                  >
                    <FiCheck />
                  </button>
                )}
                <button
                  title="Delete"
                  onClick={() => deleteNotification(item.id)}
                  disabled={actionId === item.id}
                >
                  <AiTwotoneDelete />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="notif-empty">
            <p>No notifications to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsFeed;
