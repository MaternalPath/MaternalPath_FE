import React from "react";
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
      value: "+18%",
      icon: "📈",
    },
    {
      id: 2,
      label: "Monthly Approvals",
      value: "986",
      icon: "📊",
    },
    {
      id: 3,
      label: "Approval Rate",
      value: "79%",
      icon: "✓",
    },
    {
      id: 4,
      label: "Readiness Score",
      value: "92%",
      icon: "⚡",
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
              {timelineEvents.map((event) => (
                <div key={event.id} className="recent-activity-timeline-item">
                  <div className="recent-activity-timeline-icon">
                    <span className="recent-activity-pulse-icon">⚡</span>
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
            <h2 className="recent-activity-section-title">
              Insights & Reports
            </h2>
            <div className="recent-activity-insights-grid">
              {insights.map((insight) => (
                <div key={insight.id} className="recent-activity-insight-card">
                  <div className="recent-activity-insight-icon">
                    {insight.icon}
                  </div>
                  <div className="recent-activity-insight-content">
                    <p className="recent-activity-insight-label">
                      {insight.label}
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