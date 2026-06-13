import React from "react";
import {
  FiActivity,
  FiTrendingUp,
  FiBarChart2,
  FiCheckCircle,
} from "react-icons/fi";
import "./Styles/RecentActivity.css";

const RecentActivity = () => {
  const timelineEvents = [
    {
      id: 1,
      message: "Fund verification approved for Sarah Johnson",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      message: "Bill confirmation received from St. Mary's Hospital",
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      message: "Pending review request from Emily Chen",
      timestamp: "6 hours ago",
    },
    {
      id: 4,
      message: "Hospital authorization updated for Community Health Center",
      timestamp: "1 day ago",
    },
  ];

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

  return (
    <div className="recent-activity-container">
      <div className="recent-activity-wrapper">
        <div className="recent-activity-top-section">
          <div className="recent-activity-timeline-section">
            <h2 className="recent-activity-section-title">
              Recent Activity Timeline
            </h2>
            <div className="recent-activity-timeline">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="recent-activity-timeline-item">
                  <div className="recent-activity-timeline-icon-wrapper">
                    <div className="recent-activity-timeline-icon">
                      <FiActivity/>
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
    </div>
  );
};

export default RecentActivity;