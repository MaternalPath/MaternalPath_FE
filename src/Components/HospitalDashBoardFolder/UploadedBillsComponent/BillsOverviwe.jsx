import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { getBillDashboardStats } from "../../../api/hospital";
import "./Css/BillsOverviwe.css";
import axios from "axios";

const StatsSkeleton = () => {
  return (
    <div className="stats-grid">
      {[1, 2, 3, 4].map((item) => (
        <div className="stat-card skeleton-stat" key={item}>
          <div className="stat-card-top">
            <span className="skeleton-icon"></span>
          </div>
          <p className="stat-value skeleton-text"></p>
          <p className="stat-label skeleton-text"></p>
        </div>
      ))}
    </div>
  );
};

const BillRecordsSkeleton = () => {
  return (
    <div className="records-section">
      <div className="records-header">
        <h2>Bill Records</h2>
      </div>

      <div className="records-cards">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="record-card skeleton-record">
            <div className="record-card-top">
              <span className="bill-id skeleton-text"></span>
              <span className="more skeleton-icon"></span>
            </div>
            <h3 className="bold-text skeleton-text"></h3>
            <p className="record-meta skeleton-text"></p>
            <p className="amount-label skeleton-text"></p>
            <div className="amount-row">
              <span className="amount-value skeleton-text"></span>
              <div className="amount-badges">
                <span className="badge skeleton-badge"></span>
                <span className="badge skeleton-badge"></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <table className="records-table skeleton-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Patient Name</th>
            <th>Delivery Type</th>
            <th>Bill Amount</th>
            <th>Upload Date</th>
            <th>Verification Status</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item}>
              <td>
                <span className="skeleton-text"></span>
              </td>
              <td>
                <span className="skeleton-text"></span>
              </td>
              <td>
                <span className="skeleton-text"></span>
              </td>
              <td>
                <span className="skeleton-text"></span>
              </td>
              <td>
                <span className="skeleton-text"></span>
              </td>
              <td>
                <span className="skeleton-badge"></span>
              </td>
              <td>
                <span className="skeleton-badge"></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BillsOverview = () => {
  const [stats, setStats] = useState({
    totalBills: 0,
    verifiedBills: 0,
    pendingBills: 0,
    totalAmount: 0,
  });
  const [billsData, setBillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billsLoading, setBillsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 20,
  });
  const [statusFilter, setStatusFilter] = useState("");

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchBillStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBillDashboardStats();

      const data = response?.data?.data || response?.data || response || {};

      setStats({
        totalBills: data.totalBills || 0,
        verifiedBills: data.verifiedBills || 0,
        pendingBills: data.pendingBills || 0,
        totalAmount: data.totalAmount || 0,
      });
    } catch (err) {
      console.error("Error fetching bill stats:", err);
      const msg =
        err?.response?.data?.message || "Failed to load bill statistics";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedBills = async (page = 1, status = "") => {
    if (!token) {
      toast.error("Authentication token not found.");
      setBillsLoading(false);
      return;
    }

    setBillsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page,
        limit: pagination.limit,
      });

      if (status) {
        params.append("status", status);
      }

      const response = await axios.get(
        `${baseURL}/bill/uploaded-bills?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = response?.data?.data || response?.data || response;

      let records = responseData?.records || [];

      setPagination({
        currentPage: responseData?.currentPage || page,
        totalPages: responseData?.totalPages || 1,
        totalRecords: responseData?.totalRecords || 0,
        limit: responseData?.limit || pagination.limit,
      });

      const formattedBills = records.map((bill, index) => ({
        id: bill.billId || bill.id || bill._id || `BL-${Date.now()}-${index}`,
        patient:
          bill.fullName ||
          bill.patientName ||
          bill.patient ||
          bill.patient_name ||
          "Unknown Patient",
        type:
          bill.category ||
          bill.deliveryType ||
          bill.type ||
          bill.delivery_type ||
          "N/A",
        amount: bill.billAmount || bill.amount || 0,
        date:
          bill.billingDate ||
          bill.uploadDate ||
          bill.date ||
          bill.upload_date ||
          bill.createdAt ||
          new Date().toISOString().split("T")[0],
        verification:
          bill.verificationWorkFlow ||
          bill.verificationStatus ||
          bill.verification ||
          bill.status ||
          "Pending",
        payment:
          bill.paymentStatus || bill.payment || bill.payment_status || "Unpaid",
      }));

      setBillsData(formattedBills);
    } catch (err) {
      console.error("Error fetching uploaded bills:", err);

      if (err.response) {
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
        const msg =
          err.response.data?.message || "Failed to load uploaded bills";
        toast.error(msg);

        if (err.response.status === 401) {
          toast.error("Session expired. Please login again.");
        }
      } else if (err.request) {
        console.error("No response received:", err.request);
        toast.error("No response from server. Please check your connection.");
      } else {
        console.error("Error setting up request:", err.message);
        toast.error("Failed to fetch uploaded bills");
      }

      setBillsData([]);
    } finally {
      setBillsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchUploadedBills(newPage, statusFilter);
    }
  };

  const handleStatusFilterChange = (e) => {
    const newStatus = e.target.value;
    setStatusFilter(newStatus);
    fetchUploadedBills(1, newStatus);
  };

  useEffect(() => {
    fetchBillStats();
    fetchUploadedBills(1, "");
  }, []);

  const formatCurrency = (amount) => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) return "₦0.00";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toISOString().split("T")[0];
    } catch {
      return dateString;
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "badge";
    const normalized = status.toLowerCase();
    if (
      normalized === "verified" ||
      normalized === "paid" ||
      normalized === "approved"
    )
      return "badge badge-green";
    if (
      normalized === "pending" ||
      normalized === "in progress" ||
      normalized === "processing"
    )
      return "badge badge-orange";
    if (
      normalized === "requires review" ||
      normalized === "unpaid" ||
      normalized === "rejected" ||
      normalized === "failed"
    )
      return "badge badge-red";
    return "badge";
  };

  const statsData = [
    {
      icon: <FiFileText />,
      up: true,
      value: loading ? "..." : stats.totalBills,
      label: "Total Uploaded Bills",
    },
    {
      icon: <FiCheckCircle />,
      up: true,
      value: loading ? "..." : stats.verifiedBills,
      label: "Verified Bills",
    },
    {
      icon: <FiClock />,
      up: false,
      value: loading ? "..." : stats.pendingBills,
      label: "Pending Bills",
    },
    {
      icon: <FiDollarSign />,
      up: true,
      value: loading ? "..." : formatCurrency(stats.totalAmount),
      label: "Total Bill Amount",
      strike: true,
    },
  ];

  if (error) {
    return (
      <div className="overview">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchBillStats} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overview">
      {loading ? (
        <StatsSkeleton />
      ) : (
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-card-top">
                <span className="stat-icon">{stat.icon}</span>
                <span
                  className={`stat-trend ${stat.up ? "trend-up" : "trend-down"}`}
                ></span>
              </div>
              <p className={`stat-value ${stat.strike ? "strike" : ""}`}>
                {stat.value}
              </p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {billsLoading ? (
        <BillRecordsSkeleton />
      ) : (
        <div className="records-section">
          <div className="records-header">
            <h2>Bill Records</h2>
            <div className="records-controls">
              <select
                className="status-filter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="">All Status</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Requires Review">Requires Review</option>
              </select>
              <span className="record-count">
                {pagination.totalRecords} bills
              </span>
            </div>
          </div>

          {billsData.length === 0 ? (
            <div className="empty-state">
              <FiFileText size={48} />
              <p>No bill records found</p>
              <span>Upload bills to see them here</span>
            </div>
          ) : (
            <>
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Bill ID</th>
                    <th>Patient Name</th>
                    <th>Delivery Type</th>
                    <th>Bill Amount</th>
                    <th>Upload Date</th>
                    <th>Verification Status</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {billsData.map((bill) => (
                    <tr key={bill.id}>
                      <td className="bill-id">{bill.id}</td>
                      <td className="bold-text">{bill.patient}</td>
                      <td>{bill.type}</td>
                      <td>{formatCurrency(bill.amount)}</td>
                      <td>{formatDate(bill.date)}</td>
                      <td>
                        <span className={getStatusClass(bill.verification)}>
                          {bill.verification}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusClass(bill.payment)}>
                          {bill.payment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="records-cards">
                {billsData.map((bill) => (
                  <div className="record-card" key={bill.id}>
                    <div className="record-card-top">
                      <span className="bill-id">{bill.id}</span>
                      <span className="more">
                        <FiMoreVertical />
                      </span>
                    </div>
                    <h3 className="bold-text">{bill.patient}</h3>
                    <p className="record-meta">
                      {bill.type} • {formatDate(bill.date)}
                    </p>

                    <p className="amount-label">AMOUNT</p>
                    <div className="amount-row">
                      <span className="amount-value">
                        {formatCurrency(bill.amount)}
                      </span>
                      <div className="amount-badges">
                        <span className={getStatusClass(bill.verification)}>
                          {bill.verification}
                        </span>
                        <span className={getStatusClass(bill.payment)}>
                          {bill.payment}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    <FiChevronLeft />
                  </button>

                  <span className="pagination-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BillsOverview;
