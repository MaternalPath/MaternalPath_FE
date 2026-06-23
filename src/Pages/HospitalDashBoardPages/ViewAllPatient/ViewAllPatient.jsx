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

      const data = response.data?.data || [];
      setPatients(data);
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
      p.phoneNumber?.toLowerCase().includes(q) ||
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q)
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
              // 7 skeleton rows — one per page slot
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
              currentPatients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className={`viewallpatient-table-row ${
                    index % 2 === 0
                      ? "viewallpatient-even"
                      : "viewallpatient-odd"
                  }`}
                >
                  <td className="viewallpatient-col-patient-id">
                    {patient.id}
                  </td>
                  <td className="viewallpatient-col-full-name">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="viewallpatient-col-date-of-birth">
                    {formatDate(patient.estimatedDueDate)}
                  </td>
                  <td className="viewallpatient-col-phone-number">
                    {patient.phoneNumber}
                  </td>
                  <td className="viewallpatient-col-trimester">
                    {trimesterLabel(patient.trimester)}
                  </td>
                  <td className="viewallpatient-col-status">
                    <span
                      className={`viewallpatient-badge ${
                        patient.isVerified
                          ? "viewallpatient-badge-verified"
                          : "viewallpatient-badge-unverified"
                      }`}
                    >
                      {patient.isVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
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
