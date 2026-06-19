import React, { useEffect, useState } from "react";
import "./PregnancyTracker.css";
import PregnancyOverview from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/PregnancyOverview";
import CareSection from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/CareSection";
import ActionsSection from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/ActionsSection";
import PregnancyTrackerSkeleton from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/PregnancyTrackerSkeleton";
import {
  getPregnancyTracker,
  getTrimesterInformation,
} from "../../../api/mothers";

const PregnancyTracker = () => {
  const [loading, setLoading] = useState(true);
  const [weeklyCare, setWeeklyCare] = useState(null);

  useEffect(() => {
    const loadTracker = async () => {
      try {
        const [] =
          await Promise.allSettled([
            getPregnancyTracker(),
            getTrimesterInformation(),
          ]);
      } catch (err) {
        console.error("Pregnancy tracker load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTracker();
  }, []);

  return (
    <main className="pregnancy-tracker-page">
      <div className="tracker-header">
        <h1>Pregnancy Tracker</h1>
        <p>Follow your pregnancy journey week by week.</p>
      </div>

      {loading ? (
        <PregnancyTrackerSkeleton />
      ) : (
        <>
          <PregnancyOverview />
          <CareSection weeklyCare={weeklyCare} />
          <ActionsSection />
        </>
      )}
    </main>
  );
};

export default PregnancyTracker;
