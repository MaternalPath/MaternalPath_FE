// import React, { useState, useEffect } from "react";
// import "./Styles/ViewAllPatient.css";
// import axios from "axios";
// import { FiSearch } from "react-icons/fi";
// import { toast, ToastContainer } from "react-toastify";

// const SkeletonRow = ({ index }) => (
//   <tr
//     className={`viewallpatient-table-row ${
//       index % 2 === 0 ? "viewallpatient-even" : "viewallpatient-odd"
//     }`}
//   >
//     {[20, 18, 12, 16, 10, 10].map((w, i) => (
//       <td key={i} style={{ padding: "14px 20px" }}>
//         <span
//           className="vap-skeleton"
//           style={{ width: `${w}%`, minWidth: "60px" }}
//         />
//       </td>
//     ))}
//   </tr>
// );

// const Viewallpatient = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [patients, setPatients] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   // Track window resize for responsive adjustments
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const baseURL = import.meta.env.VITE_BASE_URL;
//   const token = localStorage.getItem("token");

//   const fetchMothers = async () => {
//     if (!token) {
//       toast.error("Authentication token not found.");
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.get(`${baseURL}/hospital/mothers`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = response.data?.data || [];
//       setPatients(data);
//     } catch (error) {
//       console.error("Error fetching mothers:", error);
//       toast.error(error?.response?.data?.message || "Failed to load patients");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMothers();
//   }, []);

//   const filteredPatients = patients.filter((p) => {
//     const q = searchQuery.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       p.id?.toLowerCase().includes(q) ||
//       p.phoneNumber?.toLowerCase().includes(q) ||
//       `${p.firstName} ${p.lastName}`.toLowerCase().includes(q)
//     );
//   });

//   // Adjust items per page based on screen size
//   const getItemsPerPage = () => {
//     if (windowWidth < 576) return 5;
//     if (windowWidth < 768) return 6;
//     return 7;
//   };

//   const itemsPerPage = getItemsPerPage();
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredPatients.length / itemsPerPage),
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, itemsPerPage]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentPatients = filteredPatients.slice(
//     startIndex,
//     startIndex + itemsPerPage,
//   );

//   const handleSearchInputChange = (e) => setSearchQuery(e.target.value);
//   const handlePageClick = (pageNum) => setCurrentPage(pageNum);
//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage((p) => p - 1);
//   };
//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((p) => p + 1);
//   };

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = windowWidth < 576 ? 3 : windowWidth < 768 ? 5 : 7;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);
//       if (currentPage > Math.ceil(maxVisible / 2)) pages.push("...");

//       const start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
//       const end = Math.min(
//         totalPages - 1,
//         currentPage + Math.floor(maxVisible / 2),
//       );
//       for (let i = start; i <= end; i++) {
//         if (!pages.includes(i)) pages.push(i);
//       }

//       if (currentPage < totalPages - Math.floor(maxVisible / 2))
//         pages.push("...");
//       if (!pages.includes(totalPages)) pages.push(totalPages);
//     }

//     return pages;
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "—";
//     const d = new Date(dateStr);
//     if (isNaN(d)) return dateStr;
//     return d.toLocaleDateString("en-GB").replace(/\//g, "-");
//   };

//   const trimesterLabel = (t) => {
//     if (!t) return "—";
//     return t.charAt(0).toUpperCase() + t.slice(1);
//   };

//   // Get skeleton count based on screen size
//   const getSkeletonCount = () => {
//     if (windowWidth < 576) return 5;
//     if (windowWidth < 768) return 6;
//     return 7;
//   };

//   return (
//     <div className="viewallpatient-container">
//       {/* <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       /> */}

//       <div className="viewallpatient-header-section">
//         <h1 className="viewallpatient-title">All Patients</h1>
//         <div className="viewallpatient-search-section">
//           <input
//             type="text"
//             className="viewallpatient-search-input"
//             placeholder={
//               windowWidth < 576
//                 ? "Search..."
//                 : "Search by name, ID or phone number"
//             }
//             value={searchQuery}
//             onChange={handleSearchInputChange}
//           />
//           <button className="viewallpatient-search-btn">
//             <FiSearch className="viewallpatient-search-icon" />
//             {windowWidth >= 576 ? "Search Patient" : "Search"}
//           </button>
//         </div>
//       </div>

//       <div className="viewallpatient-table-wrapper">
//         <table className="viewallpatient-patients-table">
//           <thead>
//             <tr className="viewallpatient-table-header">
//               <th className="viewallpatient-col-patient-id">Patient ID</th>
//               <th className="viewallpatient-col-full-name">Full Name</th>
//               <th className="viewallpatient-col-date-of-birth">Due Date</th>
//               <th className="viewallpatient-col-phone-number">Phone Number</th>
//               <th className="viewallpatient-col-trimester">Trimester</th>
//               <th className="viewallpatient-col-status">Verified</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isLoading ? (
//               Array.from({ length: getSkeletonCount() }).map((_, i) => (
//                 <SkeletonRow key={i} index={i} />
//               ))
//             ) : filteredPatients.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="viewallpatient-empty">
//                   {searchQuery
//                     ? "No patients match your search."
//                     : "No patients found."}
//                 </td>
//               </tr>
//             ) : (
//               currentPatients.map((patient, index) => (
//                 <tr
//                   key={patient.id}
//                   className={`viewallpatient-table-row ${
//                     index % 2 === 0
//                       ? "viewallpatient-even"
//                       : "viewallpatient-odd"
//                   }`}
//                 >
//                   <td className="viewallpatient-col-patient-id">
//                     {patient.id}
//                   </td>
//                   <td className="viewallpatient-col-full-name">
//                     {patient.firstName} {patient.lastName}
//                   </td>
//                   <td className="viewallpatient-col-date-of-birth">
//                     {formatDate(patient.estimatedDueDate)}
//                   </td>
//                   <td className="viewallpatient-col-phone-number">
//                     {patient.phoneNumber}
//                   </td>
//                   <td className="viewallpatient-col-trimester">
//                     {trimesterLabel(patient.trimester)}
//                   </td>
//                   <td className="viewallpatient-col-status">
//                     <span
//                       className={`viewallpatient-badge ${
//                         patient.isVerified
//                           ? "viewallpatient-badge-verified"
//                           : "viewallpatient-badge-unverified"
//                       }`}
//                     >
//                       {patient.isVerified ? "Verified" : "Pending"}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {!isLoading && filteredPatients.length > 0 && (
//         <div className="viewallpatient-pagination-section">
//           <button
//             className="viewallpatient-pagination-btn viewallpatient-prev-btn"
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//           >
//             {windowWidth < 576 ? "←" : "← Previous"}
//           </button>

//           <div className="viewallpatient-page-numbers">
//             {getPageNumbers().map((page, index) => (
//               <React.Fragment key={index}>
//                 {page === "..." ? (
//                   <span className="viewallpatient-pagination-ellipsis">
//                     {page}
//                   </span>
//                 ) : (
//                   <button
//                     className={`viewallpatient-page-number ${
//                       currentPage === page ? "viewallpatient-active" : ""
//                     }`}
//                     onClick={() => handlePageClick(page)}
//                   >
//                     {page}
//                   </button>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>

//           <button
//             className="viewallpatient-pagination-btn viewallpatient-next-btn"
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//           >
//             {windowWidth < 576 ? "→" : "Next →"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Viewallpatient;


import React, { useState, useEffect } from "react";
import "./Styles/ViewAllPatient.css";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";

const SkeletonRow = ({ index }) => (
  <tr
    className={`viewallpatient-table-row ${
      index % 2 === 0 ? "viewallpatient-even" : "viewallpatient-odd"
    }`}
  >
    {[20, 18, 12, 16, 10, 10].map((w, i) => (
      <td key={i} style={{ padding: "14px 20px" }}>
        <span
          className="vap-skeleton"
          style={{ width: `${w}%`, minWidth: "60px" }}
        />
      </td>
    ))}
  </tr>
);

const Viewallpatient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchMothers = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(`${baseURL}/hospital/mothers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      let combinedData = [];

      if (response.data?.data?.mothers && response.data?.data?.motherData) {
        const mothers = response.data.data.mothers;
        const motherData = response.data.data.motherData;

        combinedData = mothers.map((mother, index) => {
          const data = motherData[index] || {};

          return {
            ...mother,
            estimatedDueDate: data.estimatedDueDate || null,
            trimester: data.trimester || null,
            currentPregnancyWeek: data.currentPregnancyWeek || null,
          };
        });

        console.log("Combined data:", combinedData);
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        combinedData = response.data.data;
      } else if (Array.isArray(response.data)) {
        combinedData = response.data;
      } else if (
        response.data?.mothers &&
        Array.isArray(response.data.mothers)
      ) {
        combinedData = response.data.mothers;
      } else if (
        response.data?.patients &&
        Array.isArray(response.data.patients)
      ) {
        combinedData = response.data.patients;
      } else {
        combinedData = [];
      }

      if (combinedData.length > 0) {
        console.log("First patient fields:", Object.keys(combinedData[0]));
        console.log("First patient data:", combinedData[0]);
      }

      setPatients(combinedData);
    } catch (error) {
      console.error("Error fetching mothers:", error);
      toast.error(error?.response?.data?.message || "Failed to load patients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMothers();
  }, []);

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.id?.toLowerCase().includes(q) ||
      p.maternalId?.toLowerCase().includes(q) ||
      p.phoneNumber?.toLowerCase().includes(q) ||
      p.phone_number?.toLowerCase().includes(q) ||
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
      `${p.first_name} ${p.last_name}`.toLowerCase().includes(q) ||
      p.fullName?.toLowerCase().includes(q)
    );
  });

  const itemsPerPage = 7;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPatients.length / itemsPerPage),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearchInputChange = (e) => setSearchQuery(e.target.value);
  const handlePageClick = (pageNum) => setCurrentPage(pageNum);
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > maxVisible / 2) pages.push("...");

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - maxVisible / 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("en-GB").replace(/\//g, "-");
  };

  const trimesterLabel = (t) => {
    if (!t) return "—";
    return t.charAt(0).toUpperCase() + t.slice(1);
  };

  const getPatientField = (patient, field, fallback = "") => {
    return patient?.[field] || fallback;
  };

  return (
    <div className="viewallpatient-container">
      <ToastContainer />

      <div className="viewallpatient-header-section">
        <h1 className="viewallpatient-title">All Patients</h1>
        <div className="viewallpatient-search-section">
          <input
            type="text"
            className="viewallpatient-search-input"
            placeholder="Search by name, ID or phone number"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button className="viewallpatient-search-btn">
            <FiSearch className="viewallpatient-search-icon" />
            Search Patient
          </button>
        </div>
      </div>

      <div className="viewallpatient-table-wrapper">
        <table className="viewallpatient-patients-table">
          <thead>
            <tr className="viewallpatient-table-header">
              <th className="viewallpatient-col-patient-id">Patient ID</th>
              <th className="viewallpatient-col-full-name">Full Name</th>
              <th className="viewallpatient-col-date-of-birth">Due Date</th>
              <th className="viewallpatient-col-phone-number">Phone Number</th>
              <th className="viewallpatient-col-trimester">Trimester</th>
              <th className="viewallpatient-col-status">Verified</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 7 }).map((_, i) => (
                <SkeletonRow key={i} index={i} />
              ))
            ) : filteredPatients.length === 0 ? (
              <tr>
                <td colSpan={6} className="viewallpatient-empty">
                  {searchQuery
                    ? "No patients match your search."
                    : "No patients found."}
                </td>
              </tr>
            ) : (
              currentPatients.map((patient, index) => {
                const patientId =
                  getPatientField(patient, "maternalId") ||
                  getPatientField(patient, "id") ||
                  getPatientField(patient, "patientId") ||
                  getPatientField(patient, "patient_id") ||
                  "—";

                const firstName =
                  getPatientField(patient, "firstName") ||
                  getPatientField(patient, "first_name") ||
                  "";
                const lastName =
                  getPatientField(patient, "lastName") ||
                  getPatientField(patient, "last_name") ||
                  "";
                const fullName =
                  firstName && lastName
                    ? `${firstName} ${lastName}`
                    : getPatientField(patient, "fullName") ||
                      getPatientField(patient, "full_name") ||
                      getPatientField(patient, "name") ||
                      "—";

                const dueDate =
                  getPatientField(patient, "estimatedDueDate") ||
                  getPatientField(patient, "estimated_due_date") ||
                  getPatientField(patient, "dueDate") ||
                  getPatientField(patient, "due_date") ||
                  getPatientField(patient, "edd") ||
                  null;

                const trimester =
                  getPatientField(patient, "trimester") ||
                  getPatientField(patient, "currentTrimester") ||
                  getPatientField(patient, "current_trimester") ||
                  null;

                const phoneNumber =
                  getPatientField(patient, "phoneNumber") ||
                  getPatientField(patient, "phone_number") ||
                  getPatientField(patient, "phone") ||
                  "—";

                const isVerified =
                  getPatientField(patient, "isVerified") ||
                  getPatientField(patient, "is_verified") ||
                  getPatientField(patient, "verified") ||
                  false;

                return (
                  <tr
                    key={patient.id || index}
                    className={`viewallpatient-table-row ${
                      index % 2 === 0
                        ? "viewallpatient-even"
                        : "viewallpatient-odd"
                    }`}
                  >
                    <td className="viewallpatient-col-patient-id">
                      {patientId}
                    </td>
                    <td className="viewallpatient-col-full-name">{fullName}</td>
                    <td className="viewallpatient-col-date-of-birth">
                      {formatDate(dueDate)}
                    </td>
                    <td className="viewallpatient-col-phone-number">
                      {phoneNumber}
                    </td>
                    <td className="viewallpatient-col-trimester">
                      {trimesterLabel(trimester)}
                    </td>
                    <td className="viewallpatient-col-status">
                      <span
                        className={`viewallpatient-badge ${
                          isVerified
                            ? "viewallpatient-badge-verified"
                            : "viewallpatient-badge-unverified"
                        }`}
                      >
                        {isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && filteredPatients.length > 0 && (
        <div className="viewallpatient-pagination-section">
          <button
            className="viewallpatient-pagination-btn viewallpatient-prev-btn"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className="viewallpatient-page-numbers">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === "..." ? (
                  <span className="viewallpatient-pagination-ellipsis">
                    {page}
                  </span>
                ) : (
                  <button
                    className={`viewallpatient-page-number ${
                      currentPage === page ? "viewallpatient-active" : ""
                    }`}
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            className="viewallpatient-pagination-btn viewallpatient-next-btn"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Viewallpatient;