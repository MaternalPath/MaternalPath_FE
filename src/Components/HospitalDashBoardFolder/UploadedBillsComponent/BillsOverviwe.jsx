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

const BillsOverview = () => {
  const [stats, setStats] = useState({
    totalUploadedBills: 0,
    totalVerifiedBills: 0,
    totalPendingBills: 0,
    totalDeliveryCost: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchBillStats();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
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

  const billsData = [
    {
      id: "BL-2024-001",
      patient: "Sarah Johnson",
      type: "C-Section",
      amount: "₦700,100",
      date: "2024-05-20",
      verification: "Verified",
      payment: "Paid",
    },
    {
      id: "BL-2024-002",
      patient: "Maria Garcia",
      type: "Natural Birth",
      amount: "₦320,500",
      date: "2024-05-21",
      verification: "Pending",
      payment: "Unpaid",
    },
    {
      id: "BL-2024-003",
      patient: "Emily Chen",
      type: "C-Section",
      amount: "₦750,000",
      date: "2024-05-22",
      verification: "Requires Review",
      payment: "Unpaid",
    },
  ];

  const getStatusClass = (status) => {
    if (status === "Verified" || status === "Paid") return "badge badge-green";
    if (status === "Pending") return "badge badge-orange";
    if (status === "Requires Review" || status === "Unpaid")
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
                <td>{bill.amount}</td>
                <td>{bill.date}</td>
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
                {bill.type} • {bill.date}
              </p>

              <p className="amount-label">AMOUNT</p>
              <div className="amount-row">
                <span className="amount-value">{bill.amount}</span>
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
      </div>
    </div>
  );
};

export default BillsOverview;
