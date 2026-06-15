import  { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiSearch,
  FiCalendar,
  FiFilter,
  FiDownload,
  FiEye,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { getVerificationHistoryStats } from "../../../api/hospital";
import "./Styles/VerificationHistory.css";
import RecentActivity from "./RecentActivity";
import SecurityCompliance from "./SecurityCompliance";

const STAT_CARDS = [
  {
    key: "totalVerification",
    Icon: FiCheckCircle,
    tint: "#10b981",
    label: "Total Verifications",
  },
  {
    key: "approvedRequest",
    Icon: FiCheckCircle,
    tint: "#34d399",
    label: "Approved Requests",
  },
  {
    key: "pendingReviews",
    Icon: FiClock,
    tint: "#f59e0b",
    label: "Pending Reviews",
  },
  {
    key: "rejectedRequest",
    Icon: FiXCircle,
    tint: "#9ca3af",
    label: "Rejected Requests",
  },
];

const VerificationHistory = () => {
  const [searchPatient, setSearchPatient] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getVerificationHistoryStats()
      .then((data) => {
        if (isMounted) setStats(data);
      })
      .catch((error) => {
        console.error("Verification stats error:", error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to load verification stats",
        );
      })
      .finally(() => {
        if (isMounted) setStatsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const formatValue = (value) =>
    typeof value === "number" ? value.toLocaleString() : "—";

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
    },
  ];

  const statusClass = (status) =>
    `status-badge status-${status.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="verification-history-container">
      <header className="header-section">
        <div className="header-content">
          <h1>Verification History</h1>
          <p>Track maternal fund verification records and approval activities.</p>
        </div>
        <div className="header-buttons">
          <button className="btn-filter" type="button">
            <FiFilter size={16} />
            Filter Verification
          </button>
          <button className="btn-export" type="button">
            <FiDownload size={16} />
            Export History
          </button>
        </div>
      </header>

      <div className="stats-grid">
        {STAT_CARDS.map(({ key, Icon, tint, label }) => (
          <div key={key} className="stat-card">
            <div className="stat-header">
              <div
                className="stat-icon"
                style={{ background: `${tint}1f`, color: tint }}
              >
                <Icon size={20} />
              </div>
            </div>
            <div className="stat-value">
              {statsLoading ? "…" : formatValue(stats?.[key])}
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <div className="filter-input">
          <FiSearch size={16} className="filter-icon" />
          <input
            type="text"
            placeholder="Search patient"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
          />
        </div>
        <div className="filter-input">
          <FiCalendar size={16} className="filter-icon" />
          <input
            type="text"
            placeholder="Date Range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          />
        </div>
      </div>

      <section className="records-section">
        <div className="records-header">
          <h2>Verification Records</h2>
          <a href="#" className="see-all-link">
            See All
          </a>
        </div>

        <div className="records-table-wrap">
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
                  <td className="amount-cell">{record.amount}</td>
                  <td>
                    <span className={statusClass(record.status)}>
                      <span className="status-dot" />
                      {record.status}
                    </span>
                  </td>
                  <td>{record.approvedBy}</td>
                  <td>{record.date}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn" title="View" type="button">
                        <FiEye size={16} />
                      </button>
                      <button
                        className="action-btn"
                        title="Download"
                        type="button"
                      >
                        <FiDownload size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <RecentActivity />
      <SecurityCompliance />
    </div>
  );
};

export default VerificationHistory;
