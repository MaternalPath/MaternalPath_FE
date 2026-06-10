import React from "react";
import "./HealthGuidance.css";
import HealthOverview from "../../Components/HealthGuidanceComponent/HealthOverview";
import WellnessSection from "../../Components/HealthGuidanceComponent/WellnessSection";
import HealthActions from "../../Components/HealthGuidanceComponent/HealthActions";

const HealthGuidance = () => {
  return (
    <main className="health-guidance-page">
      <div className="page-header">
        <h1>Health Guidance</h1>
        <p>Personalized wellness support throughout your pregnancy journey.</p>
      </div>
      
      <HealthOverview />
      <WellnessSection />
      <HealthActions />
    </main>
  );
};

export default HealthGuidance;
