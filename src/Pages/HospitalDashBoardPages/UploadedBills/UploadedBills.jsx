import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadedTop from "../../../Components/HospitalDashBoardFolder/UploadedBillsComponent/UploadedTop";
import BillsOverview from "../../../Components/HospitalDashBoardFolder/UploadedBillsComponent/BillsOverviwe";
import RecentActivity from "../../../Components/HospitalDashBoardFolder/UploadedBillsComponent/RecentActivity";
import "./UploadedBills.css";

function UploadedBills() {
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  const handleUploadNewBill = () => {
    nav("/dashboard/uploadNewBill");
  };

  return (
    <div className="page">
      <div className="page-content">
        <UploadedTop
          searchValue={search}
          onSearchChange={setSearch}
          handleUploadNewBill={handleUploadNewBill}
        />
        <BillsOverview />
        <RecentActivity />
      </div>
    </div>
  );
}

export default UploadedBills;
