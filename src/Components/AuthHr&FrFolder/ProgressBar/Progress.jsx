import React from "react";
import "./Progress.css";

const Progress = ({ currentStep = 1 }) => {
  const sectionProgress = [
    {
      id: 1,
      name: "Role Selection",
      num: "01",
      active: currentStep === 1,
      completed: currentStep > 1,
    },
    {
      id: 2,
      name: "Account Details",
      num: "02",
      active: currentStep === 2,
      completed: currentStep > 2,
    },
    {
      id: 3,
      name: "Completion",
      num: "03",
      active: currentStep === 3,
      completed: false,
    },
  ];

  return (
    <div className="progress-wrapper">
      {sectionProgress.map((section) => (
        <section
          className={`progress-content 
            ${section.active ? "active" : ""} 
            ${section.completed ? "completed" : ""}`}
          key={section.id}
        >
          <span className="progress-num-content">
            {section.completed ? "✓" : section.num}
          </span>
          <h3 className="progress-title">{section.name}</h3>
        </section>
      ))}
    </div>
  );
};

export default Progress;
