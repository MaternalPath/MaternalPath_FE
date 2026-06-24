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
  searchPatient,
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
  const [searchPatientInput, setSearchPatientInput] = useState("");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [verificationRecords, setVerificationRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  // ========================
  // MAP RAW API RECORD -> UI SHAPE
  // ========================
  const mapRecord = (item) => ({
    id: item.id,
    verificationId: `VER-${String(item.id).padStart(6, "0")}`,
    patientName: item.patientName || "Unknown Patient",
    patient_name: item.patientName,
    pregnancyWeek: item.pregnancyWeek ? `Week ${item.pregnancyWeek}` : "Week —",
    pregnancy_stage: item.pregnancyWeek,
    preferredHospital: item.hospitalName || "Not specified",
    hospital: item.hospitalName,
    amountRequested: item.walletBalance
      ? `₦${item.walletBalance.toLocaleString()}`
      : "₦0",
    amount: item.walletBalance,
    authorizationStatus: item.status || "Pending",
    status: item.status,
    verificationDate: item.updatedAt
      ? new Date(item.updatedAt).toLocaleDateString()
      : "—",
    date: item.updatedAt,
    approvedBy: item.verifiedBy || "-",
    mother: item.mother,
    maternalId: item.maternalId,
    hospitalName: item.hospitalName,
    walletBalance: item.walletBalance,
    savingsGoal: item.savingsGoal,
    goalPercentage: item.goalPercentage,
    readiness: item.readiness,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  });

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

  const fetchVerificationRequests = async () => {
    setRecordsLoading(true);
    try {
      const data = await getVerificationRequests();
      const requests = data?.data || data || [];
      setVerificationRecords(requests.map(mapRecord));
    } catch (error) {
      console.error("Error fetching verification requests:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to load verification requests",
      );
    } finally {
      setRecordsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationRequests();
  }, []);

  // ========================
  // SEARCH PATIENT BY ID OR PHONE
  // ========================
  const handleSearch = async () => {
    const query = searchPatientInput.trim();

    if (!query) {
      fetchVerificationRequests();
      return;
    }

    setSearching(true);
    try {
      const data = await searchPatient(query);
      const result = data?.data || data;
      const results = Array.isArray(result) ? result : result ? [result] : [];

      if (results.length === 0) {
        setVerificationRecords([]);
        toast.info("No record found matching that search.");
      } else {
        setVerificationRecords(results.map(mapRecord));
      }
    } catch (error) {
      console.error("Error searching patient:", error);
      toast.error(error?.response?.data?.message || "Failed to search patient");
      setVerificationRecords([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatValue = (value) =>
    typeof value === "number" ? value.toLocaleString() : "—";

  const statusClass = (status) =>
    `status-badge status-${status?.toLowerCase().replace(/\s+/g, "-") || "pending"}`;

  const isLoadingRecords = recordsLoading || searching;

  return (
    <div className="verification-history-container">
      {/* <ToastContainer /> */}
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
            placeholder="Enter Patient Full Name or Phone Number"
            value={searchPatientInput}
            onChange={(e) => setSearchPatientInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        <button
          type="button"
          className="btn-search-trigger"
          onClick={handleSearch}
          disabled={searching}
        >
          {searching ? "Searching..." : "Search"}
        </button>
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
                <th>Verification Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingRecords ? (
                <tr>
                  <td colSpan="7" className="no-records">
                    Loading...
                  </td>
                </tr>
              ) : verificationRecords.length > 0 ? (
                verificationRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="verification-id">
                      {record.verificationId || record.id}
                    </td>
                    <td>{record.patientName}</td>
                    <td>{record.pregnancyWeek}</td>
                    <td>{record.preferredHospital || record.hospital}</td>
                    <td className="amount-cell">
                      {record.amountRequested || "₦0"}
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
                    <td>{record.verificationDate || "—"}</td>
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
