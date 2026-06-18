// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   FileCheck,
//   CheckCircle2,
//   Clock,
//   Shield,
//   Lock,
//   BadgeCheck,
// } from "lucide-react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import "./VerifyPatient.css";
// import BabyIcon from "../../../assets/babyhead.png";
// import SearchIcon from "../../../assets/searchIcon.png";
// import { useNavigate } from "react-router-dom";

// const VerifyPatient = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [patients, setPatients] = useState([]);
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activityLoading, setActivityLoading] = useState(true);

//   const baseURL = import.meta.env.VITE_BASE_URL;
//   const token = localStorage.getItem("token");

//   const readinessData = [
//     { label: "Fully Prepared", value: 68, color: "#b0d571" },
//     { label: "Nearly Ready", value: 22, color: "#f1c880" },
//     { label: "Just Started", value: 10, color: "#ec9d9d" },
//   ];

//   const securityItems = [
//     { icon: <Shield size={18} />, label: "Secure Records" },
//     { icon: <Lock size={18} />, label: "Encrypted Verification" },
//     { icon: <BadgeCheck size={18} />, label: "Authorized Access" },
//   ];

//   const fetchVerificationRequests = async () => {
//     if (!token) {
//       toast.error("Authentication token not found.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${baseURL}/hospital/verification-requests`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       const data = response.data?.data || response.data || [];

//       const mappedPatients = data.map((item) => ({
//         id: item.id,
//         name: item.patientName || item.patient_name || "Unknown Patient",
//         week: item.pregnancyWeek || item.pregnancy_stage || "Week 0",
//         dueDate: item.dueDate || item.expectedDueDate || "N/A",
//         hospital: item.preferredHospital || item.hospital || "Not specified",
//         balance: item.amountRequested || item.amount || "₦0",
//         goal: Math.round((item.walletBalance / item.deliveryGoal) * 100) || 0,
//         status: item.authorizationStatus || item.status || "Pending",
//       }));

//       setPatients(mappedPatients);
//     } catch (error) {
//       console.error("Error fetching verification requests:", error);
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to load verification requests.",
//       );
//       setPatients([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRecentNotifications = async () => {
//     if (!token) {
//       setActivityLoading(false);
//       return;
//     }

//     setActivityLoading(true);
//     try {
//       const response = await axios.get(`${baseURL}/notifications/recent`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = response.data?.data || response.data || [];

//       const mappedActivity = data.map((item) => ({
//         status: item.status || item.type || "Pending",
//         name: item.patientName || item.title || "Unknown",
//         time: item.time || item.createdAt || "Just now",
//       }));

//       setRecentActivity(mappedActivity);
//     } catch (error) {
//       console.error("Error fetching recent notifications:", error);
//       setRecentActivity([]);
//     } finally {
//       setActivityLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVerificationRequests();
//     fetchRecentNotifications();
//   }, []);

//   const filteredPatients = patients.filter(
//     (patient) =>
//       patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       patient.id.toString().includes(searchTerm),
//   );

//   const handleViewProfile = (id) => {
//     navigate(`/dashboard/patientDetails/${id}`);
//   };

//   const PatientNameButton = ({ patient, mobile = false }) => (
//     <button
//       type="button"
//       className={`patient-name-trigger${mobile ? " mobile" : ""}`}
//       onClick={() => handleViewProfile(patient.id)}
//     >
//       {patient.name}
//     </button>
//   );

//   const SkeletonRow = () => (
//     <div className="table-row skeleton-row">
//       <div className="patient-info">
//         <div className="avatar skeleton-avatar"></div>
//         <span className="skeleton-cell" style={{ width: "120px" }}></span>
//       </div>
//       <span className="skeleton-cell" style={{ width: "70px" }}></span>
//       <span className="skeleton-cell" style={{ width: "90px" }}></span>
//       <span className="skeleton-cell" style={{ width: "140px" }}></span>
//       <span className="skeleton-cell" style={{ width: "80px" }}></span>
//       <div className="goal-cell">
//         <span className="skeleton-cell" style={{ width: "40px" }}></span>
//         <div className="progress-bar skeleton-progress"></div>
//       </div>
//       <span className="skeleton-cell" style={{ width: "70px" }}></span>
//     </div>
//   );

//   const SkeletonCard = () => (
//     <div className="patient-card skeleton-card">
//       <div className="card-header">
//         <div className="card-user">
//           <div
//             className="skeleton-avatar"
//             style={{ width: "40px", height: "40px", borderRadius: "50%" }}
//           ></div>
//           <div>
//             <div
//               className="skeleton-cell"
//               style={{ width: "120px", height: "16px", marginBottom: "4px" }}
//             ></div>
//             <div
//               className="skeleton-cell"
//               style={{ width: "80px", height: "12px" }}
//             ></div>
//           </div>
//         </div>
//         <div
//           className="skeleton-cell"
//           style={{ width: "60px", height: "20px", borderRadius: "12px" }}
//         ></div>
//       </div>
//       <div className="card-details">
//         <div>
//           <div
//             className="skeleton-cell"
//             style={{ width: "100px", height: "10px", marginBottom: "4px" }}
//           ></div>
//           <div
//             className="skeleton-cell"
//             style={{ width: "140px", height: "14px" }}
//           ></div>
//         </div>
//         <div className="text-right">
//           <div
//             className="skeleton-cell"
//             style={{ width: "60px", height: "10px", marginBottom: "4px" }}
//           ></div>
//           <div
//             className="skeleton-cell"
//             style={{ width: "80px", height: "14px" }}
//           ></div>
//         </div>
//       </div>
//       <div className="card-progress">
//         <div
//           className="skeleton-cell"
//           style={{ width: "100px", height: "12px", marginBottom: "8px" }}
//         ></div>
//         <div className="progress-row">
//           <div className="progress-bar skeleton-progress"></div>
//           <div
//             className="skeleton-cell"
//             style={{ width: "30px", height: "14px" }}
//           ></div>
//         </div>
//       </div>
//       <div className="card-footer">
//         <div
//           className="skeleton-cell"
//           style={{ width: "100px", height: "32px", borderRadius: "6px" }}
//         ></div>
//         <div
//           className="skeleton-cell"
//           style={{ width: "32px", height: "32px", borderRadius: "6px" }}
//         ></div>
//       </div>
//     </div>
//   );

//   const SkeletonActivityItem = () => (
//     <div className="activity-item skeleton-activity">
//       <div
//         className="skeleton-avatar"
//         style={{ width: "32px", height: "32px", borderRadius: "50%" }}
//       ></div>
//       <div className="activity-info" style={{ flex: 1 }}>
//         <div
//           className="skeleton-cell"
//           style={{ width: "100px", height: "14px", marginBottom: "4px" }}
//         ></div>
//         <div
//           className="skeleton-cell"
//           style={{ width: "80px", height: "12px" }}
//         ></div>
//       </div>
//       <div
//         className="skeleton-cell"
//         style={{ width: "60px", height: "12px" }}
//       ></div>
//     </div>
//   );

//   return (
//     <main className="verify-fund-page">
//       <section className="page-headers">
//         <div className="header-text">
//           <h1>Verify Patient Fund</h1>
//           <p>
//             Review patient savings readiness and approve maternal healthcare
//             verification.
//           </p>
//         </div>
//       </section>

//       <div className="search-bar">
//         <Search size={15} />
//         <input
//           type="text"
//           placeholder="Search by patient name, ID, or hospital..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="patient-table">
//         <div className="table-header">
//           <span>PATIENT NAME</span>
//           <span>WEEK</span>
//           <span>DUE DATE</span>
//           <span>HOSPITAL</span>
//           <span>WALLET BALANCE</span>
//           <span>GOAL</span>
//           <span>STATUS</span>
//         </div>
//         {loading ? (
//           <>
//             <SkeletonRow />
//             <SkeletonRow />
//             <SkeletonRow />
//             <SkeletonRow />
//           </>
//         ) : filteredPatients.length > 0 ? (
//           filteredPatients.map((patient) => (
//             <div className="table-row" key={patient.id}>
//               <div className="patient-info">
//                 <div className="avatar">
//                   <img src={BabyIcon} alt="baby-icon" />
//                 </div>
//                 <PatientNameButton patient={patient} />
//               </div>
//               <span>{patient.week}</span>
//               <span>{patient.dueDate}</span>
//               <span>{patient.hospital}</span>
//               <span className="balance">{patient.balance}</span>
//               <div className="goal-cell">
//                 <span>{patient.goal}%</span>
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ width: `${patient.goal}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <span className={`status-badge ${patient.status.toLowerCase()}`}>
//                 {patient.status}
//               </span>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">No patients found</div>
//         )}
//       </div>

//       <div className="mobile-cards">
//         <div className="active-header">
//           <span>ACTIVE VERIFICATIONS</span>
//           <span className="pending-count">
//             {patients.filter((p) => p.status === "Pending").length} Pending
//           </span>
//         </div>
//         {loading ? (
//           <>
//             <SkeletonCard />
//             <SkeletonCard />
//             <SkeletonCard />
//           </>
//         ) : filteredPatients.length > 0 ? (
//           filteredPatients.map((patient) => (
//             <div className="patient-card" key={patient.id}>
//               <div className="card-header">
//                 <div className="card-user">
//                   <img src={SearchIcon} alt="baby-icon" />
//                   <div>
//                     <PatientNameButton patient={patient} mobile />
//                     <p>
//                       {patient.week} • EDD: {patient.dueDate}
//                     </p>
//                   </div>
//                 </div>
//                 <span
//                   className={`status-badge ${patient.status.toLowerCase()}`}
//                 >
//                   {patient.status}
//                 </span>
//               </div>
//               <div className="card-details">
//                 <div>
//                   <span className="label">PREFERRED HOSPITAL</span>
//                   <p>{patient.hospital}</p>
//                 </div>
//                 <div className="text-right">
//                   <span className="label">BALANCE</span>
//                   <p className="balance">{patient.balance}</p>
//                 </div>
//               </div>
//               <div className="card-progress">
//                 <span className="label">Savings Readiness</span>
//                 <div className="progress-row">
//                   <div className="progress-bar">
//                     <div
//                       className="progress-fill"
//                       style={{ width: `${patient.goal}%` }}
//                     ></div>
//                   </div>
//                   <span>{patient.goal}%</span>
//                 </div>
//               </div>
//               <div className="card-footer">
//                 <button onClick={() => handleViewProfile(patient.id)}>
//                   View Full Profile &gt;
//                 </button>
//                 <button className="more-btn">⋮</button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">No patients found</div>
//         )}
//       </div>

//       <div className="dashboard-grid">
//         <div className="card">
//           <h3>Recent Activity</h3>
//           <div className="activity-list">
//             {activityLoading ? (
//               <>
//                 <SkeletonActivityItem />
//                 <SkeletonActivityItem />
//                 <SkeletonActivityItem />
//                 <SkeletonActivityItem />
//               </>
//             ) : recentActivity.length > 0 ? (
//               recentActivity.map((item, idx) => (
//                 <div className="activity-item" key={idx}>
//                   <div className="activity-icon">
//                     {item.status === "Approved" ? (
//                       <CheckCircle2 size={18} color="#10B981" />
//                     ) : (
//                       <Clock size={18} color="#F59E0B" />
//                     )}
//                   </div>
//                   <div className="activity-info">
//                     <strong>{item.status}</strong>
//                     <p>{item.name}</p>
//                   </div>
//                   <span className="activity-time">{item.time}</span>
//                 </div>
//               ))
//             ) : (
//               <div className="no-results">No recent activity</div>
//             )}
//           </div>
//         </div>

//         <div className="card">
//           <h3>Readiness Overview</h3>
//           <div className="readiness-list">
//             {readinessData.map((item, idx) => (
//               <div className="readiness-item" key={idx}>
//                 <div className="readiness-header">
//                   <span>{item.label}</span>
//                   <span className="percent" style={{ color: item.color }}>
//                     {item.value}%
//                   </span>
//                 </div>
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{
//                       width: `${item.value}%`,
//                       backgroundColor: item.color,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="card">
//           <h3>Security & Compliance</h3>
//           <div className="security-list">
//             {securityItems.map((item, idx) => (
//               <div className="security-item" key={idx}>
//                 <div className="security-icon">{item.icon}</div>
//                 <span>{item.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="secure-banner mobile-only">
//         <Shield size={24} />
//         <div>
//           <strong>Secure Platform</strong>
//           <p>
//             Protected maternal records & authorized hospital access powered by
//             MaternalPath.
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default VerifyPatient;
import React, { useState, useEffect } from "react";
import {
  Search,
  FileCheck,
  CheckCircle2,
  Clock,
  Shield,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import "./VerifyPatient.css";
import BabyIcon from "../../../assets/babyhead.png";
import SearchIcon from "../../../assets/searchIcon.png";
import { useNavigate } from "react-router-dom";

// ========================
// DUMMY DATA - SINGLE PATIENT
// ========================
const DUMMY_PATIENT = {
  id: 1,
  name: "Chidinma Okonkwo",
  week: "Week 24",
  dueDate: "Oct 12, 2026",
  hospital: "Lagos University Hospital",
  balance: "₦285,000",
  goal: 71,
  status: "Approved",
};

const DUMMY_ACTIVITY = [
  { status: "Approved", name: "Chidinma O.", time: "2 hours ago" },
];

const VerifyPatient = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);
  const [useDummyData, setUseDummyData] = useState(false);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const readinessData = [
    { label: "Fully Prepared", value: 68, color: "#b0d571" },
    { label: "Nearly Ready", value: 22, color: "#f1c880" },
    { label: "Just Started", value: 10, color: "#ec9d9d" },
  ];

  const securityItems = [
    { icon: <Shield size={18} />, label: "Secure Records" },
    { icon: <Lock size={18} />, label: "Encrypted Verification" },
    { icon: <BadgeCheck size={18} />, label: "Authorized Access" },
  ];

  const fetchVerificationRequests = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setPatients([DUMMY_PATIENT]);
      setUseDummyData(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${baseURL}/hospital/verification-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data?.data || response.data || [];

      if (data.length === 0) {
        setPatients([DUMMY_PATIENT]);
        setUseDummyData(true);
        toast.info("No data from server. Showing demo data.");
      } else {
        const mappedPatients = data.map((item) => ({
          id: item.id,
          name: item.patientName || item.patient_name || "Unknown Patient",
          week: item.pregnancyWeek || item.pregnancy_stage || "Week 0",
          dueDate: item.dueDate || item.expectedDueDate || "N/A",
          hospital: item.preferredHospital || item.hospital || "Not specified",
          balance: item.amountRequested || item.amount || "₦0",
          goal: Math.round((item.walletBalance / item.deliveryGoal) * 100) || 0,
          status: item.authorizationStatus || item.status || "Pending",
        }));
        setPatients(mappedPatients);
        setUseDummyData(false);
      }
    } catch (error) {
      console.error("Error fetching verification requests:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to load verification requests. Showing demo data.",
      );
      setPatients([DUMMY_PATIENT]);
      setUseDummyData(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentNotifications = async () => {
    if (!token) {
      setRecentActivity(DUMMY_ACTIVITY);
      setActivityLoading(false);
      return;
    }

    setActivityLoading(true);
    try {
      const response = await axios.get(`${baseURL}/notifications/recent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data?.data || response.data || [];

      if (data.length === 0) {
        setRecentActivity(DUMMY_ACTIVITY);
      } else {
        const mappedActivity = data.map((item) => ({
          status: item.status || item.type || "Pending",
          name: item.patientName || item.title || "Unknown",
          time: item.time || item.createdAt || "Just now",
        }));
        setRecentActivity(mappedActivity);
      }
    } catch (error) {
      console.error("Error fetching recent notifications:", error);
      setRecentActivity(DUMMY_ACTIVITY);
    } finally {
      setActivityLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationRequests();
    fetchRecentNotifications();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toString().includes(searchTerm),
  );

  const handleViewProfile = (id) => {
    navigate(`/dashboard/patientDetails/${id}`);
  };

  const PatientNameButton = ({ patient, mobile = false }) => (
    <button
      type="button"
      className={`patient-name-trigger${mobile ? " mobile" : ""}`}
      onClick={() => handleViewProfile(patient.id)}
    >
      {patient.name}
    </button>
  );

  const SkeletonRow = () => (
    <div className="table-row skeleton-row">
      <div className="patient-info">
        <div className="avatar skeleton-avatar"></div>
        <span className="skeleton-cell" style={{ width: "120px" }}></span>
      </div>
      <span className="skeleton-cell" style={{ width: "70px" }}></span>
      <span className="skeleton-cell" style={{ width: "90px" }}></span>
      <span className="skeleton-cell" style={{ width: "140px" }}></span>
      <span className="skeleton-cell" style={{ width: "80px" }}></span>
      <div className="goal-cell">
        <span className="skeleton-cell" style={{ width: "40px" }}></span>
        <div className="progress-bar skeleton-progress"></div>
      </div>
      <span className="skeleton-cell" style={{ width: "70px" }}></span>
    </div>
  );

  const SkeletonCard = () => (
    <div className="patient-card skeleton-card">
      <div className="card-header">
        <div className="card-user">
          <div
            className="skeleton-avatar"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          ></div>
          <div>
            <div
              className="skeleton-cell"
              style={{ width: "120px", height: "16px", marginBottom: "4px" }}
            ></div>
            <div
              className="skeleton-cell"
              style={{ width: "80px", height: "12px" }}
            ></div>
          </div>
        </div>
        <div
          className="skeleton-cell"
          style={{ width: "60px", height: "20px", borderRadius: "12px" }}
        ></div>
      </div>
      <div className="card-details">
        <div>
          <div
            className="skeleton-cell"
            style={{ width: "100px", height: "10px", marginBottom: "4px" }}
          ></div>
          <div
            className="skeleton-cell"
            style={{ width: "140px", height: "14px" }}
          ></div>
        </div>
        <div className="text-right">
          <div
            className="skeleton-cell"
            style={{ width: "60px", height: "10px", marginBottom: "4px" }}
          ></div>
          <div
            className="skeleton-cell"
            style={{ width: "80px", height: "14px" }}
          ></div>
        </div>
      </div>
      <div className="card-progress">
        <div
          className="skeleton-cell"
          style={{ width: "100px", height: "12px", marginBottom: "8px" }}
        ></div>
        <div className="progress-row">
          <div className="progress-bar skeleton-progress"></div>
          <div
            className="skeleton-cell"
            style={{ width: "30px", height: "14px" }}
          ></div>
        </div>
      </div>
      <div className="card-footer">
        <div
          className="skeleton-cell"
          style={{ width: "100px", height: "32px", borderRadius: "6px" }}
        ></div>
        <div
          className="skeleton-cell"
          style={{ width: "32px", height: "32px", borderRadius: "6px" }}
        ></div>
      </div>
    </div>
  );

  const SkeletonActivityItem = () => (
    <div className="activity-item skeleton-activity">
      <div
        className="skeleton-avatar"
        style={{ width: "32px", height: "32px", borderRadius: "50%" }}
      ></div>
      <div className="activity-info" style={{ flex: 1 }}>
        <div
          className="skeleton-cell"
          style={{ width: "100px", height: "14px", marginBottom: "4px" }}
        ></div>
        <div
          className="skeleton-cell"
          style={{ width: "80px", height: "12px" }}
        ></div>
      </div>
      <div
        className="skeleton-cell"
        style={{ width: "60px", height: "12px" }}
      ></div>
    </div>
  );

  return (
    <main className="verify-fund-page">
      <section className="page-headers">
        <div className="header-text">
          <h1>Verify Patient Fund</h1>
          <p>
            Review patient savings readiness and approve maternal healthcare
            verification.
          </p>
        </div>
      </section>

      <div className="search-bar">
        <Search size={15} />
        <input
          type="text"
          placeholder="Search by patient name, ID, or hospital..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {useDummyData && (
        <div className="demo-banner">
          ⚠️ Using demo data — server unavailable
        </div>
      )}

      <div className="patient-table">
        <div className="table-header">
          <span>PATIENT NAME</span>
          <span>WEEK</span>
          <span>DUE DATE</span>
          <span>HOSPITAL</span>
          <span>WALLET BALANCE</span>
          <span>GOAL</span>
          <span>STATUS</span>
        </div>
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div className="table-row" key={patient.id}>
              <div className="patient-info">
                <div className="avatar">
                  <img src={BabyIcon} alt="baby-icon" />
                </div>
                <PatientNameButton patient={patient} />
              </div>
              <span>{patient.week}</span>
              <span>{patient.dueDate}</span>
              <span>{patient.hospital}</span>
              <span className="balance">{patient.balance}</span>
              <div className="goal-cell">
                <span>{patient.goal}%</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${patient.goal}%` }}
                  ></div>
                </div>
              </div>
              <span className={`status-badge ${patient.status.toLowerCase()}`}>
                {patient.status}
              </span>
            </div>
          ))
        ) : (
          <div className="no-results">No patients found</div>
        )}
      </div>

      <div className="mobile-cards">
        <div className="active-header">
          <span>ACTIVE VERIFICATIONS</span>
          <span className="pending-count">
            {patients.filter((p) => p.status === "Pending").length} Pending
          </span>
        </div>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div className="patient-card" key={patient.id}>
              <div className="card-header">
                <div className="card-user">
                  <img src={SearchIcon} alt="baby-icon" />
                  <div>
                    <PatientNameButton patient={patient} mobile />
                    <p>
                      {patient.week} • EDD: {patient.dueDate}
                    </p>
                  </div>
                </div>
                <span
                  className={`status-badge ${patient.status.toLowerCase()}`}
                >
                  {patient.status}
                </span>
              </div>
              <div className="card-details">
                <div>
                  <span className="label">PREFERRED HOSPITAL</span>
                  <p>{patient.hospital}</p>
                </div>
                <div className="text-right">
                  <span className="label">BALANCE</span>
                  <p className="balance">{patient.balance}</p>
                </div>
              </div>
              <div className="card-progress">
                <span className="label">Savings Readiness</span>
                <div className="progress-row">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${patient.goal}%` }}
                    ></div>
                  </div>
                  <span>{patient.goal}%</span>
                </div>
              </div>
              <div className="card-footer">
                <button onClick={() => handleViewProfile(patient.id)}>
                  View Full Profile &gt;
                </button>
                <button className="more-btn">⋮</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No patients found</div>
        )}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activityLoading ? (
              <>
                <SkeletonActivityItem />
                <SkeletonActivityItem />
                <SkeletonActivityItem />
                <SkeletonActivityItem />
              </>
            ) : recentActivity.length > 0 ? (
              recentActivity.map((item, idx) => (
                <div className="activity-item" key={idx}>
                  <div className="activity-icon">
                    {item.status === "Approved" ? (
                      <CheckCircle2 size={18} color="#10B981" />
                    ) : (
                      <Clock size={18} color="#F59E0B" />
                    )}
                  </div>
                  <div className="activity-info">
                    <strong>{item.status}</strong>
                    <p>{item.name}</p>
                  </div>
                  <span className="activity-time">{item.time}</span>
                </div>
              ))
            ) : (
              <div className="no-results">No recent activity</div>
            )}
          </div>
        </div>

        <div className="card">
          <h3>Readiness Overview</h3>
          <div className="readiness-list">
            {readinessData.map((item, idx) => (
              <div className="readiness-item" key={idx}>
                <div className="readiness-header">
                  <span>{item.label}</span>
                  <span className="percent" style={{ color: item.color }}>
                    {item.value}%
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Security & Compliance</h3>
          <div className="security-list">
            {securityItems.map((item, idx) => (
              <div className="security-item" key={idx}>
                <div className="security-icon">{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="secure-banner mobile-only">
        <Shield size={24} />
        <div>
          <strong>Secure Platform</strong>
          <p>
            Protected maternal records & authorized hospital access powered by
            MaternalPath.
          </p>
        </div>
      </div>
    </main>
  );
};

export default VerifyPatient;
