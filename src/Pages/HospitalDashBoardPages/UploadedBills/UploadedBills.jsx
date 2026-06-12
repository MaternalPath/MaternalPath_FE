import React, { useState } from "react";
import UploadedTop from "../../../Components/HospitalDashBoardFolder/UploadedBillsComponent/UploadedTop";
import BillsOverview from "../../../Components/HospitalDashBoardFolder/UploadedBillsComponent/BillsOverviwe";
import RecentActivity from "../../../Components/HospitalDashBoardFolder/UploadedBillsComponent/RecentActivity";
import "./UploadedBills.css";

function UploadedBills() {
  const [search, setSearch] = useState("");

  return (
    <div className="page">
      <div className="page-content">
        <UploadedTop searchValue={search} onSearchChange={setSearch} />
        <BillsOverview />
        <RecentActivity />
      </div>
    </div>
  );
}

export default UploadedBills;
