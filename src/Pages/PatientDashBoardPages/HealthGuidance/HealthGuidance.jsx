import React, { useEffect, useState } from "react";
import "./HealthGuidance.css";
import HealthOverview from "../../../Components/PatientDashBoardFolder/HealthGuidanceComponent/HealthOverview";
import WellnessSection from "../../../Components/PatientDashBoardFolder/HealthGuidanceComponent/WellnessSection";
import HealthActions from "../../../Components/PatientDashBoardFolder/HealthGuidanceComponent/HealthActions";
import HealthGuidanceSkeleton from "../../../Components/PatientDashBoardFolder/HealthGuidanceComponent/HealthGuidanceSkeleton";
import { getWeeklyGuidance } from "../../../api/mothers";

const HealthGuidance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await getWeeklyGuidance();
        if (!cancelled) setData(resp);
      } catch (err) {
        console.error("Failed to load weekly guidance:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <main className="health-guidance-page">
        <HealthGuidanceSkeleton />
      </main>
    );
  }

  return (
    <main className="health-guidance-page">
      <div className="page-header">
        <h1>Health Guidance</h1>
        <p>Personalized wellness support throughout your pregnancy journey.</p>
      </div>

      <HealthOverview data={data} />
      <WellnessSection data={data} />
      <HealthActions />
    </main>
  );
};

export default HealthGuidance;
