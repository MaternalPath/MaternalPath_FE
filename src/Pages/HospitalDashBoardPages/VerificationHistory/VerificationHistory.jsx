import React, { useState } from "react";
import "./Styles/VerificationHistory.css";
import RecentActivity from "./RecentActivity";
import SecurityCompliance from "./SecurityCompliance";

const VerificationHistory = () => {
  const [searchPatient, setSearchPatient] = useState("");
  const [dateRange, setDateRange] = useState("");

  const statsData = [
    {
      id: 1,
      icon: "✓",
      iconColor: "#10b981",
      label: "Total Verifications",
      value: "1,248",
      trend: "+18%",
      trendColor: "positive",
    },
    {
      id: 2,
      icon: "✓",
      iconColor: "#a7f3d0",
      label: "Approved Requests",
      value: "986",
      trend: "+12%",
      trendColor: "positive",
    },
    {
      id: 3,
      icon: "⏱",
      iconColor: "#fcd34d",
      label: "Pending Reviews",
      value: "142",
      trend: "+5%",
      trendColor: "positive",
    },
    {
      id: 4,
      icon: "⊗",
      iconColor: "#d1d5db",
      label: "Rejected Requests",
      value: "120",
      trend: "-8%",
      trendColor: "negative",
    },
  ];

  const verificationRecords = [
    {
      id: "VER-2024-001",
      patientName: "Sarah Johnson",
      pregnancyWeek: "Week 36",
      hospital: "Tolu Medical Hospital",
      amount: "$4,500",
      status: "Approved",
      approvedBy: "Dr. Cassie Seyi",
      date: "2024-05-20",
      statusColor: "#10b981",
    },
    {
      id: "VER-2024-002",
      patientName: "Maria Garcia",
      pregnancyWeek: "Week 32",
      hospital: "Community Health Center",
      amount: "$3,200",
      status: "Pending",
      approvedBy: "-",
      date: "2024-05-21",
      statusColor: "#f59e0b",
    },
    {
      id: "VER-2024-003",
      patientName: "Emily Chen",
      pregnancyWeek: "Week 38",
      hospital: "Augusta Memorial Hospital",
      amount: "$5,100",
      status: "Requires Review",
      approvedBy: "-",
      date: "2024-05-22",
      statusColor: "#ef4444",
    },
    {
      id: "VER-2024-004",
      patientName: "Jessica Brown",
      pregnancyWeek: "Week 28",
      hospital: "GoldenCross Specialist Hospital",
      amount: "$2,800",
      status: "Rejected",
      approvedBy: "Dr. Michael Ozoro",
      date: "2024-05-19",
      statusColor: "#6b7280",
    },
  ];

  return (
    <>
      <div className="verification-history-container">
        {/* <style>{`
        .verification-history-container {
          padding: 32px;
          background-color: #f9fafb;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .header-content h1 {
          font-size: 28px;
          font-weight: 700;
          color: #0f5461;
          margin: 0 0 8px 0;
        }

        .header-content p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .header-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-filter, .btn-export {
          padding: 10px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-filter {
          border-color: #d1d5db;
          background-color: #ffffff;
          color: #1f2937;
        }

        .btn-filter:hover {
          background-color: #f3f4f6;
        }

        .btn-export {
          border-color: #0f766e;
          background-color: #0f766e;
          color: #ffffff;
        }

        .btn-export:hover {
          background-color: #0d5d63;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background-color: #ffffff;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .stat-trend {
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .trend-positive {
          color: #10b981;
        }

        .trend-negative {
          color: #ef4444;
        }

        .trend-arrow {
          display: inline-block;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #0f5461;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }

        .filter-section {
          background-color: #ecfdf5;
          padding: 20px;
          border-radius: 8px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .filter-input {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 10px 12px;
        }

        .filter-input input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #6b7280;
        }

        .filter-input input::placeholder {
          color: #9ca3af;
        }

        .search-icon, .calendar-icon {
          color: #6b7280;
          font-size: 16px;
        }

        .records-section {
          background-color: #ecfdf5;
          border-radius: 8px;
          padding: 24px;
        }

        .records-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .records-header h2 {
          font-size: 18px;
          font-weight: 600;
          color: #0f5461;
          margin: 0;
        }

        .see-all-link {
          color: #0f766e;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .see-all-link:hover {
          color: #0d5d63;
        }

        .records-table {
          width: 100%;
          border-collapse: collapse;
          background-color: #ffffff;
          border-radius: 6px;
          overflow: hidden;
        }

        .records-table thead {
          background-color: #f0fdf4;
          border-bottom: 1px solid #d1d5db;
        }

        .records-table th {
          padding: 12px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .records-table td {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
          color: #1f2937;
        }

        .records-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .records-table tbody tr:last-child td {
          border-bottom: none;
        }

        .verification-id {
          font-weight: 600;
          color: #0f5461;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          width: fit-content;
        }

        .status-approved {
          background-color: #dcfce7;
          color: #15803d;
        }

        .status-pending {
          background-color: #fed7aa;
          color: #b45309;
        }

        .status-review {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .status-rejected {
          background-color: #e5e7eb;
          color: #4b5563;
        }

        .status-icon {
          font-size: 12px;
        }

        .actions-cell {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .action-btn {
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 18px;
          color: #6b7280;
          transition: color 0.3s ease;
          padding: 4px;
        }

        .action-btn:hover {
          color: #1f2937;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .filter-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .verification-history-container {
            padding: 16px;
          }

          .header-section {
            flex-direction: column;
            gap: 16px;
          }

          .header-buttons {
            width: 100%;
          }

          .btn-filter, .btn-export {
            flex: 1;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .records-table {
            font-size: 12px;
          }

          .records-table th,
          .records-table td {
            padding: 8px;
          }
        }
      `}</style> */}
        <div className="header-section">
          <div className="header-content">
            <h1>Verification History</h1>
            <p>
              Track maternal fund verification records and approval activities.
            </p>
          </div>
          <div className="header-buttons">
            <button className="btn-filter">
              <span>⊟</span>
              Filter Verification
            </button>
            <button className="btn-export">
              <span>⬇</span>
              Export History
            </button>
          </div>
        </div>

        <div className="stats-grid">
          {statsData.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-header">
                <div
                  className="stat-icon"
                  style={{ backgroundColor: `${stat.iconColor}33` }}
                >
                  {stat.icon}
                </div>
                <span className={`stat-trend trend-${stat.trendColor}`}>
                  <span className="trend-arrow">
                    {stat.trendColor === "positive" ? "↗️" : "↘️"}
                  </span>
                  {stat.trend}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="filter-section">
          <div className="filter-input">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search patient"
              value={searchPatient}
              onChange={(e) => setSearchPatient(e.target.value)}
            />
          </div>
          <div className="filter-input">
            <span className="calendar-icon">📅</span>
            <input
              type="text"
              placeholder="Date Range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
        </div>

        <div className="records-section">
          <div className="records-header">
            <h2>Verification Records</h2>
            <a href="#" className="see-all-link">
              See All
            </a>
          </div>

          <table className="records-table">
            <thead>
              <tr>
                <th>Verification ID</th>
                <th>Patient Name</th>
                <th>Pregnancy Week</th>
                <th>Preferred Hospital</th>
                <th>Wallet Amount</th>
                <th>Verification Status</th>
                <th>Approved By</th>
                <th>Verification Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {verificationRecords.map((record) => (
                <tr key={record.id}>
                  <td className="verification-id">{record.id}</td>
                  <td>{record.patientName}</td>
                  <td>{record.pregnancyWeek}</td>
                  <td>{record.hospital}</td>
                  <td>{record.amount}</td>
                  <td>
                    <span
                      className={`status-badge status-${record.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span className="status-icon">●</span>
                      {record.status}
                    </span>
                  </td>
                  <td>{record.approvedBy}</td>
                  <td>{record.date}</td>
                  <td className="actions-cell">
                    <button className="action-btn" title="View">
                      👁
                    </button>
                    <button className="action-btn" title="Download">
                      📥
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <RecentActivity />
      <SecurityCompliance />
    </>
  );
};

export default VerificationHistory;
