import React, { useState } from "react";
import BillForm from "./BillForm";
import BillSidebar from "./BillSidebar";
import "./Styles/UploadNewBill.css";

const UploadNewBill = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    maternalId: "MP-2024-8890",
    phoneNumber: "+234 800 000 0000",
    edd: "",
    referenceNumber: "INV-2024-001",
    category: "",
    amount: "",
    billingDate: "",
    dueDate: "",
    notes: "",
    file: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="upload-bill-page">
      <header className="upload-bill-header">
        <h1>Upload New Bill</h1>
        <p className="subtitle">
          Submit maternal billing records for verification and patient wallet
          approval.
        </p>
      </header>

      <div className="upload-bill-body">
        <BillForm
          formData={formData}
          onChange={handleChange}
          uploadProgress={uploadProgress}
          setUploadProgress={setUploadProgress}
        />
        <BillSidebar formData={formData} uploadProgress={uploadProgress} />
      </div>
    </div>
  );
};

export default UploadNewBill;
