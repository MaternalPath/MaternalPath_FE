import React, { useState, useEffect } from "react";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiMoreVertical,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { getBillDashboardStats } from "../../../api/hospital";
import "./Css/BillsOverviwe.css";
import axios from "axios";

const BillsOverview = () => {
  const [stats, setStats] = useState({
    totalUploadedBills: 0,
    totalVerifiedBills: 0,
    totalPendingBills: 0,
    totalDeliveryCost: 0,
  });
  const [billsData, setBillsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billsLoading, setBillsLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchBillStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getBillDashboardStats();
      const data = response?.data || response || {};

      setStats({
        totalUploadedBills:
          data.totalUploadedBills || data.total_uploadedBills || 0,
        totalVerifiedBills:
          data.totalVerifiedBills || data.total_VerifiedBills || 0,
        totalPendingBills:
          data.totalPendingBills || data.total_PendingBills || 0,
        totalDeliveryCost:
          data.totalDeliveryCost || data.total_DeliveryCost || 0,
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

  const fetchUploadedBills = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setBillsLoading(false);
      return;
    }

    setBillsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/bill/uploaded-bills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let records = [];
      if (response?.data?.data && Array.isArray(response.data.data)) {
        records = response.data.data;
      } else if (response?.data && Array.isArray(response.data)) {
        records = response.data;
      } else if (Array.isArray(response)) {
        records = response;
      } else {
        records = [];
      }

      console.log("Processed records:", records);

      const formattedBills = records.map((bill, index) => ({
        id: bill.billId || bill.id || bill._id || `BL-${Date.now()}-${index}`,
        // FIX: Added fullName as the primary field since API returns it
        patient:
          bill.fullName ||
          bill.patientName ||
          bill.patient ||
          bill.patient_name ||
          "Unknown Patient",
        // FIX: Added category as fallback for delivery type
        type:
          bill.category ||
          bill.deliveryType ||
          bill.type ||
          bill.delivery_type ||
          "N/A",
        amount: bill.billAmount || bill.amount || 0,
        // FIX: Added billingDate as fallback for date
        date:
          bill.billingDate ||
          bill.uploadDate ||
          bill.date ||
          bill.upload_date ||
          bill.createdAt ||
          new Date().toISOString().split("T")[0],
        // FIX: Added verificationWorkFlow as fallback
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

  useEffect(() => {
    fetchBillStats();
    fetchUploadedBills();
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

  const statsData = [
    {
      icon: <FiFileText />,
      up: true,
      value: loading ? "..." : stats.totalUploadedBills,
      label: "Total Uploaded Bills",
    },
    {
      icon: <FiCheckCircle />,
      up: true,
      value: loading ? "..." : stats.totalVerifiedBills,
      label: "Verified Bills",
    },
    {
      icon: <FiClock />,
      up: false,
      value: loading ? "..." : stats.totalPendingBills,
      label: "Pending Bills",
    },
    {
      icon: <FiDollarSign />,
      up: true,
      value: loading ? "..." : formatCurrency(stats.totalDeliveryCost),
      label: "Total Delivery Costs",
      strike: true,
    },
  ];

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

      <div className="records-section">
        <div className="records-header">
          <h2>Bill Records</h2>
        </div>

        {billsLoading ? (
          <div className="loading-state">
            <p>Loading bill records...</p>
          </div>
        ) : billsData.length === 0 ? (
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
          </>
        )}
      </div>
    </div>
  );
};

export default BillsOverview;
