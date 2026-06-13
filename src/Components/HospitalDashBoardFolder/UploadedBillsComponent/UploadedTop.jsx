import React from "react";
import { FiUpload, FiSearch } from "react-icons/fi";
import "./Css/UploadedTop.css";
import { useNavigate } from "react-router-dom";

const UploadedTop = ({ onUploadNewBill, searchValue, onSearchChange }) => {
  const nav = useNavigate();
  return (
    <div className="uploadeds">
      <div className="uploadeds-top">
        <div>
          <h1 className="uploadeds-title">Uploaded Bills</h1>
          <p className="uploadeds-subtitle">
            Manage maternal healthcare billing and uploaded delivery records.
          </p>
        </div>

        <button className="uploads-btn" onClick={onUploadNewBill}>
          <FiUpload className="uploads-icon"/>
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
