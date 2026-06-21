import React, { useEffect, useState } from "react";
import {
  FiFileText,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiBell,
} from "react-icons/fi";
import "./Css/RecentActivity.css";
import { toast } from "react-toastify";
import { getRecentNotifications } from "../../../api/hospital";

const securityItems = [
  { icon: <FiShield />, text: "Secure document upload" },
  { icon: <FiLock />, text: "Encrypted patient billing records" },
  { icon: <FiCheckCircle />, text: "Authorized hospital access" },
  { icon: <FiFileText />, text: "Data privacy compliance" },
];

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentNotifications = async () => {
    setLoading(true);
    try {
      const data = await getRecentNotifications();
      const notifications = data?.data || data || [];
      setActivities(notifications);
    } catch (error) {
      console.error("Recent notifications error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load recent activity",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentNotifications();
  }, []);

  return (
    <div className="activity-security">
      <div className="panel">
        <h2 className="panel-title">Recent Activity</h2>
        <div className="panel-list">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div className="activity-item" key={index}>
                <span className="activity-icon skeleton-icon" />
                <div>
                  <p className="activity-text skeleton-text" />
                  <p className="activity-time skeleton-text short" />
                </div>
              </div>
            ))
          ) : activities.length === 0 ? (
            <div className="activitys-item">
              <span className="activitys-icon">
                <FiBell />
              </span>
              <div>
                <p className="activitys-text">No recent activity</p>
              </div>
            </div>
          ) : (
            activities.map((item, index) => (
              <div className="activity-item" key={item.id || index}>
                <span className="activity-icon">
                  <FiFileText />
                </span>
                <div>
                  <p className="activity-text">{item.message || item.text}</p>
                  <p className="activity-time">
                    {item.time || item.createdAt || item.timestamp}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="panel">
        <h2 className="panel-title">Security &amp; Compliance</h2>
        <div className="panel-lists">
          {securityItems.map((item, index) => (
            <div className="security-items" key={index}>
              <span className="security-icon">{item.icon}</span>
              <p className="security-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
