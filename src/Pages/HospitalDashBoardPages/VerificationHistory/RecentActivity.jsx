import React, { useState, useEffect } from "react";
import {
  FiActivity,
  FiTrendingUp,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "./Styles/RecentActivity.css";
import { FiInbox } from "react-icons/fi";

const insights = [
  {
    id: 1,
    label: "Verification Trends",
    shortLabel: "Verification Trend",
    value: "+18%",
    icon: <FiTrendingUp />,
  },
  {
    id: 2,
    label: "Monthly Approvals",
    shortLabel: "Monthly Approvals",
    value: "986",
    icon: <FiBarChart2 />,
  },
  {
    id: 3,
    label: "Approval Rate",
    shortLabel: "Approval Rate",
    value: "79%",
    icon: <FiCheckCircle />,
  },
  {
    id: 4,
    label: "Readiness Score",
    shortLabel: "Readiness Score",
    value: "92%",
    icon: <FiActivity />,
  },
];

// ===== SKELETON COMPONENT =====
const TimelineSkeleton = () => {
  return (
    <div className="recent-activity-timeline">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="recent-activity-timeline-item skeleton">
          <div className="recent-activity-timeline-icon-wrapper">
            <div className="recent-activity-timeline-icon skeleton-icon"></div>
            {item !== 5 && (
              <span className="recent-activity-timeline-line skeleton-line"></span>
            )}
          </div>
          <div className="recent-activity-timeline-content">
            <div className="skeleton-text skeleton-text-title"></div>
            <div className="skeleton-text skeleton-text-subtitle"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const RecentActivity = () => {
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchRecentActivity = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/notifications/recent`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data?.data || response.data || [];
      setTimelineEvents(data);
    } catch (err) {
      console.error("Error fetching recent activity:", err);
      toast.error(
        err.response?.data?.message || "Failed to load recent activity",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  return (
    <div className="recent-activity-wrapper">
      <div className="recent-activity-top-section">
        <div className="recent-activity-timeline-section">
          <h2 className="recent-activity-section-title">
            Recent Activity Timeline
          </h2>

          {loading ? (
            <TimelineSkeleton />
          ) : timelineEvents.length === 0 ? (
            <div className="recent-activity-empty">
              <FiInbox className="recent-activity-empty-icon" />
              <p className="recent-activity-empty-text">
                No recent activity to display.
              </p>
            </div>
          ) : (
            <div className="recent-activity-timeline">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="recent-activity-timeline-item"
                >
                  <div className="recent-activity-timeline-icon-wrapper">
                    <div className="recent-activity-timeline-icon">
                      <FiActivity />
                    </div>
                    {index !== timelineEvents.length - 1 && (
                      <span className="recent-activity-timeline-line"></span>
                    )}
                  </div>
                  <div className="recent-activity-timeline-content">
                    <p className="recent-activity-timeline-message">
                      {event.message}
                    </p>
                    <p className="recent-activity-timeline-timestamp">
                      {event.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="recent-activity-insights-section">
          <div className="recent-activity-insights-header">
            <h2 className="recent-activity-section-title">
              Insights &amp; Reports
            </h2>
            <FiBarChart2 className="recent-activity-insights-header-icon" />
          </div>
          <div className="recent-activity-insights-grid">
            {insights.map((insight) => (
              <div key={insight.id} className="recent-activity-insight-card">
                <div className="recent-activity-insight-icon">
                  {insight.icon}
                </div>
                <div className="recent-activity-insight-content">
                  <p className="recent-activity-insight-label">
                    <span className="label-full">{insight.label}</span>
                    <span className="label-short">{insight.shortLabel}</span>
                  </p>
                  <p className="recent-activity-insight-value">
                    {insight.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
