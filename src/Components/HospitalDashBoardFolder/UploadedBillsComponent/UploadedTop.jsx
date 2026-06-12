import React from "react";
import { FiUpload, FiSearch } from "react-icons/fi";
import "./Css/UploadedTop.css";

const UploadedTop = ({ searchValue, onSearchChange }) => {
  return (
    <div className="uploaded">
      <div className="uploaded-top">
        <div>
          <h1 className="uploaded-title">Uploaded Bills</h1>
          <p className="uploaded-subtitle">
            Manage maternal healthcare billing and uploaded delivery records.
          </p>
        </div>

        <button className="upload-btn">
          <FiUpload className="upload-icon" />
          Upload New Bill
        </button>
      </div>

      <div className="search-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search bills, patients..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default UploadedTop;