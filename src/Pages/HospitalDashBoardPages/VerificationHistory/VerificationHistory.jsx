import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiSearch,
  FiCalendar,
  FiFilter,
  FiDownload,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
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

  useEffect(() => {
    let isMounted = true;

    const fetchVerificationRequests = async () => {
      try {
        const data = await getVerificationRequests();
        console.log("Verification requests:", data);

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

  const handleExportHistory = () => {
    if (filteredRecords.length === 0) {
      toast.warning("No records available to export.");
      return;
    }

    try {
      const headers = [
        "Verification ID",
        "Patient Name",
        "Pregnancy Week",
        "Preferred Hospital",
        "Wallet Amount",
        "Verification Status",
        "Verification Date",
      ];

      const rows = filteredRecords.map((record) => [
        record.verificationId || record.id || "",
        record.patientName || record.patient_name || "",
        record.pregnancyWeek || record.pregnancy_stage || "Week —",
        record.preferredHospital || record.hospital || "",
        record.amountRequested || record.amount || "",
        record.authorizationStatus || record.status || "Pending",
        record.verificationDate || record.date || "",
      ]);

      let csvContent = headers.join(",") + "\n";
      rows.forEach((row) => {
        const escapedRow = row.map((cell) => {
          if (
            typeof cell === "string" &&
            (cell.includes(",") || cell.includes('"'))
          ) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        });
        csvContent += escapedRow.join(",") + "\n";
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      const date = new Date();
      const dateStr = date.toISOString().split("T")[0];
      link.setAttribute("href", url);
      link.setAttribute("download", `Verification_History_${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Exported ${filteredRecords.length} records successfully!`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export records. Please try again.");
    }
  };

  if (recordsLoading || statsLoading) {
    return (
      <div className="verification-history-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading verification history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-history-container">
      <ToastContainer />
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
          <button
            className="btn-export"
            type="button"
            onClick={handleExportHistory}
          >
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
                <th>Verification Date</th>
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
                    <td>{record.verificationDate || record.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-records">
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
