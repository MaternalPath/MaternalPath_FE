import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiShield, FiCheck, FiActivity } from "react-icons/fi";
import "./Css/ActivityStatus.css";

const systemStatus = [
  {
    icon: <FiShield />,
    label: "Secure Verification",
    status: "Active",
    statusType: "gray",
  },
  {
    icon: <FiCheck />,
    label: "Privacy Compliance",
    status: "Updated",
    statusType: "green",
  },
  {
    icon: <FiActivity />,
    label: "Encrypted Workflow",
    status: "Running",
    statusType: "green",
  },
];

const ActivityStatus = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) {
        setError("Authentication token not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/notifications/recent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data?.data || response.data || [];
        const mapped = data.map((item) => ({
          text: item.title || item.message || item.text || "Notification",
          time: item.time || item.createdAt || "Just now",
        }));

        setActivities(mapped);
        setError(null);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        const msg =
          err.response?.data?.message || "Failed to load recent activity.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [baseURL, token]);

  return (
    <div className="activity-status">
      <div className="activity-panel">
        <h2 className="activity-status-title">Recent Activity</h2>
        <div className="activity-list">
          {loading && <p className="activity-time loading">Loading...</p>}
          {error && <p className="activity-time error">{error}</p>}
          {!loading && !error && activities.length === 0 && (
            <p className="activity-time no-activity">No recent activity.</p>
          )}
          {!loading &&
            !error &&
            activities.map((item, index) => (
              <div className="activity-row" key={index}>
                <span className="activity-dot"></span>
                <div>
                  <p className="activity-text">{item.text}</p>
                  <p className="activity-time">{item.time}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="status-panel">
        <h2 className="activity-status-title">System Status</h2>
        <div className="status-list">
          {systemStatus.map((item, index) => (
            <div className="status-row" key={index}>
              <span className="status-icon">{item.icon}</span>
              <span className="status-label">{item.label}</span>
              <span className={`status-badge ${item.statusType}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityStatus;
