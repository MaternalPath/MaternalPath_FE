import React from "react";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiEdit2,
  FiDownload,
  FiMoreVertical,
} from "react-icons/fi";
import "./Css/BillsOverviwe.css";

const statsData = [
  { icon: <FiFileText />, trend: "+12%", up: true, value: "248", label: "Total Uploaded Bills" },
  { icon: <FiCheckCircle />, trend: "+8%", up: true, value: "186", label: "Verified Bills" },
  { icon: <FiClock />, trend: "-3%", up: false, value: "42", label: "Pending Bills" },
  { icon: <FiDollarSign />, trend: "+15%", up: true, value: "₦842,000.00", label: "Total Delivery Costs", strike: true },
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
  if (status === "Requires Review" || status === "Unpaid") return "badge badge-red";
  return "badge";
};

const BillsOverview = () => {
  return (
    <div className="overview">
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-card-top">
              <span className="stat-icon">{stat.icon}</span>
              <span className={`stat-trend ${stat.up ? "trend-up" : "trend-down"}`}>
                {stat.up ? <FiTrendingUp /> : <FiTrendingDown />} {stat.trend}
              </span>
            </div>
            <p className={`stat-value ${stat.strike ? "strike" : ""}`}>{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="records-section">
        <div className="records-header">
          <h2>Bill Records</h2>
          <button className="filter-btn">Filter By ▾</button>
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
              <th>Actions</th>
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
                  <span className={getStatusClass(bill.verification)}>{bill.verification}</span>
                </td>
                <td>
                  <span className={getStatusClass(bill.payment)}>{bill.payment}</span>
                </td>
                <td className="actions">
                  <button title="View"><FiEye /></button>
                  <button title="Edit"><FiEdit2 /></button>
                  <button title="Download"><FiDownload /></button>
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
                <span className="more"><FiMoreVertical /></span>
              </div>
              <h3 className="bold-text">{bill.patient}</h3>
              <p className="record-meta">{bill.type} • {bill.date}</p>

              <p className="amount-label">AMOUNT</p>
              <div className="amount-row">
                <span className="amount-value">{bill.amount}</span>
                <div className="amount-badges">
                  <span className={getStatusClass(bill.verification)}>{bill.verification}</span>
                  <span className={getStatusClass(bill.payment)}>{bill.payment}</span>
                </div>
              </div>

              <div className="record-actions">
                <button><FiEye /> View</button>
                <button><FiEdit2 /> Edit</button>
                <button><FiDownload /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillsOverview;