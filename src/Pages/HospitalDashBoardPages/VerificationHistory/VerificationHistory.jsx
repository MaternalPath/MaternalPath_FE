import { useEffect, useState } from "react";
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
import { toast, ToastContainer } from "react-toastify";
import {
  getVerificationHistoryStats,
  getVerificationRequests,
} from "../../../api/hospital";
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
  const [verificationRecords, setVerificationRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);

  // Fetch verification history stats
  useEffect(() => {
    let isMounted = true;
    getVerificationHistoryStats()
      .then((data) => {
        if (isMounted) setStats(data);
      })
      .catch((error) => {
        console.error("Verification stats error:", error);
        toast.error(
          error?.response?.data?.message || "Failed to load verification stats",
        );
      })
      .finally(() => {
        if (isMounted) setStatsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch verification requests
  useEffect(() => {
    let isMounted = true;

    const fetchVerificationRequests = async () => {
      try {
        const data = await getVerificationRequests();
        console.log("Verification requests:", data);

        // Handle different response structures
        const requests = data?.data || data || [];
        if (isMounted) setVerificationRecords(requests);
      } catch (error) {
        console.error("Error fetching verification requests:", error);
        toast.error(
          error?.response?.data?.message ||
            "Failed to load verification requests",
        );
      } finally {
        if (isMounted) setRecordsLoading(false);
      }
    };

    fetchVerificationRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatValue = (value) =>
    typeof value === "number" ? value.toLocaleString() : "—";

  const statusClass = (status) =>
    `status-badge status-${status?.toLowerCase().replace(/\s+/g, "-") || "pending"}`;

  // Filter records based on search
  const filteredRecords = verificationRecords.filter((record) => {
    const matchesPatient =
      searchPatient === "" ||
      record.patientName?.toLowerCase().includes(searchPatient.toLowerCase()) ||
      record.patient_name
        ?.toLowerCase()
        .includes(searchPatient.toLowerCase()) ||
      record.id?.toLowerCase().includes(searchPatient.toLowerCase());

    const matchesDate =
      dateRange === "" ||
      record.date?.includes(dateRange) ||
      record.verificationDate?.includes(dateRange);

    return matchesPatient && matchesDate;
  });

  // Display loading state
  if (recordsLoading || statsLoading) {
    return (
      <div className="verification-history-container">
        <ToastContainer />
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading verification history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-history-container">
      <header className="header-section">
        <div className="header-content">
          <h1>Verification History</h1>
          <p>
            Track maternal fund verification records and approval activities.
          </p>
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
            placeholder="Search by patient name or ID"
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
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="verification-id">
                      {record.verificationId || record.id}
                    </td>
                    <td>{record.patientName || record.patient_name}</td>
                    <td>
                      {record.pregnancyWeek ||
                        record.pregnancy_stage ||
                        "Week —"}
                    </td>
                    <td>{record.preferredHospital || record.hospital}</td>
                    <td className="amount-cell">
                      {record.amountRequested || record.amount}
                    </td>
                    <td>
                      <span
                        className={statusClass(
                          record.authorizationStatus || record.status,
                        )}
                      >
                        <span className="status-dot" />
                        {record.authorizationStatus ||
                          record.status ||
                          "Pending"}
                      </span>
                    </td>
                    <td>{record.approvedBy || "-"}</td>
                    <td>{record.verificationDate || record.date}</td>
                    <td className="actions-cell">
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-records">
                    No verification records found.
                  </td>
                </tr>
              )}
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
