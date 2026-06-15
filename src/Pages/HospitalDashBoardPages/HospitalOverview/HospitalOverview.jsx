import React, { useEffect, useState } from "react";
import "./Styles/HospitalOverview.css";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import HospitalVerificationHistory from "./HospitalVerificationHistory";
import PatientVerification from "./PatientVerification";
import { ToastContainer, toast } from "react-toastify";

const HospitalOverview = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const [dashboardData, setDashboardData] = useState({
    totalVerificationRequests: 0,
    pendingAuthorizations: 0,
    approvedRequest: 0,
    declinedRequest: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${baseURL}/hospital/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setDashboardData({
        totalVerificationRequests: response.data.totalVerificationRequests || 0,
        pendingAuthorizations: response.data.pendingAuthorizations || 0,
        approvedRequest: response.data.approvedRequest || 0,
        declinedRequest: response.data.declinedRequest || 0,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch hospital dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      icon: <FileText size={18} />,
      number: dashboardData.totalVerificationRequests,
      label: "Total Verification Requests",
    },
    {
      icon: <Clock size={18} />,
      number: dashboardData.pendingAuthorizations,
      label: "Pending Authorizations",
    },
    {
      icon: <CheckCircle size={18} />,
      number: dashboardData.approvedRequest,
      label: "Approved Requests",
    },
    {
      icon: <XCircle size={18} />,
      number: dashboardData.declinedRequest,
      label: "Declined Requests",
    },
  ];

  return (
    <>
      <div className="hospital-overview-container">
        <ToastContainer />
        <div className="hospital-overview-header">
          <h1 className="hospital-overview-title">Dashboard Overview</h1>
          <p className="hospital-overview-subtitle">
            Patient verification and fund authorization portal
          </p>
        </div>

        <div className="hospital-overview-stat-cards-container">
          {statCards.map((card, index) => (
            <div key={index} className="hospital-overview-stat-card">
              <div className="hospital-overview-stat-icon">{card.icon}</div>
              <div className="hospital-overview-stat-number">
                {loading ? "..." : card.number}
              </div>
              <div className="hospital-overview-stat-label">{card.label}</div>
            </div>
          ))}
        </div>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {error}
          </p>
        )}
      </div>

      <PatientVerification />
      <HospitalVerificationHistory />
    </>
  );
};

export default HospitalOverview;