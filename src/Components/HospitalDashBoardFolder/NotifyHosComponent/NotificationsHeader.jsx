import React, { useState, useEffect } from "react";
import {
  FiFilter,
  FiCheckCircle,
  FiBell,
  FiAlertCircle,
  FiCheck,
  FiFileText,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "./Css/NotificationsHeader.css";
import axios from "axios";

const tabs = [
  "All Notifications",
  "Verification Alerts",
  "Bill Updates",
  "Reviews",
  "Security Alerts",
];

const NotificationsHeader = ({ activeTab, onTabChange }) => {
  const [stats, setStats] = useState({
    totalNotifications: 0,
    pendingReviews: 0,
    verificationAlerts: 0,
    billUploadUpdates: 0,
    unreadCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const statsResponse = await axios.get(`${baseURL}/notifications/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = statsResponse.data?.data || statsResponse.data || {};

      setStats({
        totalNotifications: data.totalNotifications || 0,
        pendingReviews: data.pendingReviews || 0,
        verificationAlerts: data.verificationAlerts || 0,
        billUploadUpdates: data.billUploadUpdates || 0,
        unreadCount: data.unreadCount || 0,
      });
    } catch (error) {
      console.error("Error fetching notification stats:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to load notification statistics",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [baseURL]);

  const markAllAsRead = async () => {
    if (markingAll || stats.unreadCount === 0) return;

    setMarkingAll(true);

    if (!token) {
      toast.error("Authentication token not found.");
      setMarkingAll(false);
      return;
    }

    try {
      const unreadResponse = await axios.get(
        `${baseURL}/notifications/unread`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const unreadNotifications =
        unreadResponse.data?.data || unreadResponse.data || [];

      if (
        !Array.isArray(unreadNotifications) ||
        unreadNotifications.length === 0
      ) {
        toast.info("No unread notifications");

        setStats((prev) => ({
          ...prev,
          unreadCount: 0,
        }));

        setMarkingAll(false);
        return;
      }

      setStats((prev) => ({
        ...prev,
        unreadCount: 0,
      }));

      const results = await Promise.allSettled(
        unreadNotifications.map((notification) =>
          axios.patch(
            `${baseURL}/notifications/${notification.id}/read`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          ),
        ),
      );

      const successful = results.filter((r) => r.status === "fulfilled").length;

      const failed = results.filter((r) => r.status === "rejected").length;

      if (successful > 0) {
        toast.success(
          `${successful} notification${successful > 1 ? "s" : ""} marked as read${
            failed > 0 ? `, ${failed} failed` : ""
          }`,
        );
      } else {
        toast.error("Failed to mark notifications as read");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to mark notifications as read",
      );
    } finally {
      setMarkingAll(false);
    }
  };

  const statsData = [
    {
      icon: <FiBell />,
      trend: "+12",
      value: loading ? "..." : stats.totalNotifications,
      label: "Total Notifications",
    },
    {
      icon: <FiAlertCircle />,
      trend: "+3",
      value: loading ? "..." : stats.pendingReviews,
      label: "Pending Reviews",
    },
    {
      icon: <FiCheck />,
      trend: "+5",
      value: loading ? "..." : stats.verificationAlerts,
      label: "Verification Alerts",
    },
    {
      icon: <FiFileText />,
      trend: "+2",
      value: loading ? "..." : stats.billUploadUpdates,
      label: "Bill Upload Updates",
    },
  ];

  return (
    <div className="notifications-header-container">
      <div className="notifications-header-top">
        <div>
          <h1 className="notifications-header-title">Notifications</h1>

          <p className="notifications-header-subtitle">
            Stay updated on maternal verification and hospital activities.
            {stats.unreadCount > 0 && (
              <span className="notifications-header-unread-badge">
                {stats.unreadCount} unread
              </span>
            )}
          </p>
        </div>

        <div className="notifications-header-actions">
          <button className="notifications-header-filter-btn">
            <FiFilter />
            Filter Notifications
          </button>

          <button
            className="notifications-header-mark-btn"
            onClick={markAllAsRead}
            disabled={markingAll || stats.unreadCount === 0}
          >
            <FiCheckCircle />
            {markingAll ? "Marking..." : "Mark All as Read"}
          </button>
        </div>
      </div>

      <div className="notifications-header-stats-grid">
        {statsData.map((stat, index) => (
          <div className="notifications-header-stat-card" key={index}>
            <div className="notifications-header-stat-top">
              <span className="notifications-header-stat-icon">
                {stat.icon}
              </span>
              <span className="notifications-header-stat-trend">
                ↗ {stat.trend}
              </span>
            </div>

            <p className="notifications-header-stat-value">{stat.value}</p>
            <p className="notifications-header-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="notifications-header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`notifications-header-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationsHeader;
