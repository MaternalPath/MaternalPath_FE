import React from "react";
import { FiDroplet, FiMoon, FiActivity, FiAlertTriangle, FiInfo } from "react-icons/fi";
import { LuBrain, LuSmile } from "react-icons/lu";
import "./Css/WellnessSection.css";

const WellnessSection = ({ data }) => {
  const nutrition = data?.nutrition || {};
  const foodsToAvoid = Array.isArray(nutrition.foodsToAvoid)
    ? nutrition.foodsToAvoid
    : [];
  const symptoms = Array.isArray(data?.trimesterGuide?.symptoms)
    ? data.trimesterGuide.symptoms
    : [];
  const sleepRest =
    data?.wellness?.sleepRest ||
    "Aim for 7-9 hours of sleep nightly. Rest on your left side for better circulation.";
  const stressManagement =
    data?.wellness?.stressManagement ||
    "Practice deep breathing, meditation, or prenatal yoga to reduce stress levels.";

  return (
    <>
      <section className="card-section">
        <div className="section-title">
          <span className="apple">🍎</span>
          <h3>Nutrition Guidance</h3>
        </div>

        <div className="nutrition-grid">
          <div className="white-card">
            <h4>Iron-Rich Foods</h4>
            <p>{data.ironRichFoods || "—"}</p>
          </div>
          <div className="white-card">
            <h4>Protein Sources</h4>
            <p>{data.proteinSources || "—"}</p>
          </div>
          <div className="white-card">
            <h4>Calcium-Rich Foods</h4>
            <p>{data.calciumRichFoods || "—"}</p>
          </div>
          <div className="white-card">
            <h4>Whole Grains</h4>
            <p>{data.wholeGrains || "—"}</p>
          </div>
        </div>

        <div className="hydration-banner">
          <FiDroplet className="hydration-icon" />
          <div>
            <h4>Hydration Reminder</h4>
            <p>
              {nutrition.hydrationReminder }
                {/* "Drink 8-10 glasses of water daily to stay hydrated" */}
            </p>
          </div>
        </div>

        {foodsToAvoid.length > 0 && (
          <>
            <h4 className="avoid-heading">Foods to Avoid</h4>
            <div className="avoid-grid">
              {foodsToAvoid.map((item, idx) => (
                <div key={idx} className="avoid-card">
                  <FiAlertTriangle /> {item}
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <section className="card-section">
        <h3 className="section-title plain">Wellness & Self-Care</h3>
        <div className="wellness-grid">
          <div className="white-card wellness">
            <div className="icon-box"><FiMoon /></div>
            <div>
              <h4>Sleep & Rest</h4>
              <p>{sleepRest}</p>
            </div>
          </div>
          <div className="white-card wellness">
            <div className="icon-box"><LuBrain /></div>
            <div>
              <h4>Stress Management</h4>
              <p>{stressManagement}</p>
            </div>
          </div>
          <div className="white-card wellness">
            <div className="icon-box"><FiActivity /></div>
            <div>
              <h4>Safe Physical Activity</h4>
              <p>Gentle walking, prenatal yoga, and stretching are safe. Avoid contact sports.</p>
            </div>
          </div>
          <div className="white-card wellness">
            <div className="icon-box"><LuSmile /></div>
            <div>
              <h4>Mental Wellness</h4>
              <p>Talk about your feelings with loved ones. It's normal to have emotional changes.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="symptoms-row">
        <div className="symptom-card">
          <div className="symptom-header">
            <FiInfo />
            <h3>Common Symptoms This Trimester</h3>
          </div>
          <p className="symptom-sub">Body changes you may experience</p>
          <div className="symptom-list">
            {symptoms.length > 0 ? (
              symptoms.map((item, idx) => (
                <div key={idx} className="symptom-item">{item}</div>
              ))
            ) : (
              <div className="symptom-item">No symptoms reported for this week.</div>
            )}
          </div>
          <p className="symptom-note">These symptoms are typically normal. Contact your healthcare provider if you have concerns.</p>
        </div>

        <div className="symptom-card">
          <div className="symptom-header red">
            <FiAlertTriangle />
            <h3>When to Contact a Doctor</h3>
          </div>
          <p className="symptom-sub">Red-flag symptoms requiring medical attention</p>
          <div className="symptom-list red">
            <div className="symptom-item"><FiAlertTriangle /> Severe abdominal pain</div>
            <div className="symptom-item"><FiAlertTriangle /> Heavy vaginal bleeding</div>
            <div className="symptom-item"><FiAlertTriangle /> Severe headache with blurred vision</div>
            <div className="symptom-item"><FiAlertTriangle /> Reduced baby movement after week 28</div>
            <div className="symptom-item"><FiAlertTriangle /> High fever above 38°C</div>
            <div className="symptom-item"><FiAlertTriangle /> Sudden severe swelling</div>
          </div>
          <div className="emergency-box">
            If you experience any of these symptoms, contact your healthcare provider immediately or visit the nearest hospital.
          </div>
        </div>
      </div>
    </>
  );
};

export default WellnessSection;
