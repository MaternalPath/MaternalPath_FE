import { useEffect, useState } from "react";
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
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const settledValue = (r) => (r?.status === "fulfilled" ? r.value : null);

    const loadTracker = async () => {
      try {
        const [trackerRes, trimesterRes] = await Promise.allSettled([
          getPregnancyTracker(),
          getTrimesterInformation(),
        ]);

        const tracker = settledValue(trackerRes);
        const trimester = settledValue(trimesterRes);

        const combinedOverview = {
          ...(trimester &&
          typeof trimester === "object" &&
          !Array.isArray(trimester)
            ? trimester
            : {}),
          ...(tracker && typeof tracker === "object" && !Array.isArray(tracker)
            ? tracker
            : {}),
          metrix: tracker?.metrix || trimester?.metrix || null,
          perTrimester: tracker?.perTrimester || trimester?.perTrimester || [],
          thirdtrim: tracker?.thirdtrim || trimester?.thirdtrim || [],
          tip: tracker?.tip || trimester?.tip || null,
        };

        setOverview(combinedOverview);
        setWeeklyCare(combinedOverview?.tip || null);
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
          <CareSection weeklyCare={weeklyCare} timeline={overview} />
          <ActionsSection />
        </>
      )}
    </main>
  );
};

export default PregnancyTracker;
