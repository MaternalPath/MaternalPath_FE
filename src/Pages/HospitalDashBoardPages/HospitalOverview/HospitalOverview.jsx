import React, { useEffect, useState } from "react";
import "./Styles/HospitalOverview.css";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getHospitalDashboardStats } from "../../../api/hospital";
import HospitalVerificationHistory from "./HospitalVerificationHistory";
import PatientVerification from "./PatientVerification";

const HospitalOverview = () => {
  const [stats, setStats] = useState({
    totalVerificationRequests: 0,
    pendingAuthorizations: 0,
    approvedRequests: 0,
    declinedRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchHospitalDashboardStats = async () => {
    setLoading(true);

    try {
      const data = await getHospitalDashboardStats();

      console.log("Dashboard stats response:", data);

      const statsData = data?.data || data;

      setStats({
        totalVerificationRequests:
          statsData.totalVerificationRequests ||
          statsData.totalVerification ||
          0,
        pendingAuthorizations:
          statsData.pendingAuthorizations ||
          statsData.pendingAuthorization ||
          0,
        approvedRequests:
          statsData.approvedRequests || statsData.approvedRequest || 0,
        declinedRequests:
          statsData.declinedRequests || statsData.declinedRequest || 0,
      });

      toast.success("Dashboard statistics loaded successfully!");
    } catch (error) {
      console.error("Hospital dashboard stats error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to load hospital dashboard statistics",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalDashboardStats();
  }, []);

  const statCards = [
    {
      icon: <FileText size={18} />,
      number: loading ? "..." : stats.totalVerificationRequests,
      label: "Total Verification Requests",
    },
    {
      icon: <Clock size={18} />,
      number: loading ? "..." : stats.pendingAuthorizations,
      label: "Pending Authorizations",
    },
    {
      icon: <CheckCircle size={18} />,
      number: loading ? "..." : stats.approvedRequests,
      label: "Approved Requests",
    },
    {
      icon: <XCircle size={18} />,
      number: loading ? "..." : stats.declinedRequests,
      label: "Declined Requests",
    },
  ];

  if (loading) {
    return (
      <>
        <div className="hospital-overview">
          <div className="overview-header">
            <h1>Dashboard Overview</h1>
            <p>Patient verification and fund authorization portal</p>
          </div>
          <div className="stat-cards-container">
            {statCards.map((card, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{card.icon}</div>
                <div className="stat-number">...</div>
                <div className="stat-label">{card.label}</div>
              </div>
            ))}
          </div>
        </div>
        <PatientVerification />
        <HospitalVerificationHistory />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="hospital-overview">
        <div className="overview-header">
          <h1>Dashboard Overview</h1>
          <p>Patient verification and fund authorization portal</p>
        </div>

        <div className="stat-cards-container">
          {statCards.map((card, index) => (
            <div key={index} className="stats-card">
              <div className="stat-icon">{card.icon}</div>
              <div className="stat-number">{card.number}</div>
              <div className="stat-label">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
      <PatientVerification />
      <HospitalVerificationHistory />
    </>
  );
};

export default HospitalOverview;
