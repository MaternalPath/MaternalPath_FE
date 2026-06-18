import React, { useEffect, useState } from "react";
import "./PregnancyTracker.css";
import PregnancyOverview from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/PregnancyOverview";
import CareSection from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/CareSection";
import ActionsSection from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/ActionsSection";
import PregnancyTrackerSkeleton from "../../../Components/PatientDashBoardFolder/PregnantTrackerComponent/PregnancyTrackerSkeleton";
import {
  getPregnancyOverview,
  getTrimesterInformation,
} from "../../../api/mothers";

const settledValue = (result) =>
  result?.status === "fulfilled" ? result.value : null;

const PregnancyTracker = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    const loadTracker = async () => {
      try {
        const [overviewRes, timelineRes] = await Promise.allSettled([
          getPregnancyOverview(),
          getTrimesterInformation(),
        ]);

        setOverview(settledValue(overviewRes));
        setTimeline(settledValue(timelineRes));
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
          <PregnancyOverview overview={overview} />
          <CareSection timeline={timeline} />
          <ActionsSection />
        </>
      )}
    </main>
  );
};

export default PregnancyTracker;
