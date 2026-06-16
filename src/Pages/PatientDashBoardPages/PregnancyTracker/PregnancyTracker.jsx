 import React from "react";
import "./PregnancyTracker.css";
import PregnancyOverview from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/PregnancyOverview";
import CareSection from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/CareSection";
import ActionsSection from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/ActionsSection";

const PregnancyTracker = () => {
  return (
    <main className="pregnancy-tracker-page">
      <div className="tracker-header">
        <h1>Pregnancy Tracker</h1>
        <p>Follow your pregnancy journey week by week.</p>
      </div>

      <PregnancyOverview />
      <CareSection />
      <ActionsSection />
    </main>
  );
};

export default PregnancyTracker;
