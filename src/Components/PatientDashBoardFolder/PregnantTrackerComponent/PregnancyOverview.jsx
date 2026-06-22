import { FiActivity, FiHeart, FiChevronRight } from "react-icons/fi";
import "./Css/PregnancyOverview.css";
import babyIllustration from "../../../assets/baby.png";

const TRIMESTER_LABELS = {
  1: "First Trimester",
  2: "Second Trimester",
  3: "Third Trimester",
};

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

const pickTrimesterRows = (overview) => {
  const candidates = [
    overview?.thirdtrim,
    overview?.firsttrim,
    overview?.secondtrim,
  ];

  for (const entry of candidates) {
    if (Array.isArray(entry) && entry.length > 0) return entry;
  }

  return [];
};

const parseStringifiedArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
};

const parseWeekRange = (value) => {
  if (typeof value !== "string") return null;
  const m = value.match(/(\d+)\s*-\s*(\d+)/i);
  if (!m) return null;
  return { from: Number(m[1]), to: Number(m[2]) };
};

const parseTipDescription = (description) => {
  if (Array.isArray(description)) return description;
  if (typeof description !== "string" || !description.trim()) return [];
  try {
    const parsed = JSON.parse(description);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const PregnancyOverview = ({ overview }) => {
  const metrix = overview?.metrix || overview?.info || {};
  const perTrimesterItem = Array.isArray(overview?.perTrimester)
    ? overview.perTrimester[0]
    : null;
  const trimesterRows = pickTrimesterRows(overview);
  const currentTrimester =
    trimesterRows.find(
      (row) =>
        Array.isArray(row) && String(row[1] || "").toLowerCase() === "current",
    ) ||
    trimesterRows[trimesterRows.length - 1] ||
    [];

  const trimesterFromApi = currentTrimester[0];
  const weeksRangeFromApi = currentTrimester[2] || "";
  const parsedRange = parseWeekRange(weeksRangeFromApi);
  const tipWeek = parseFloat(overview?.tip?.week);
  const weekValue = parseFloat(metrix?.week);
  const week = Number.isFinite(weekValue)
    ? weekValue
    : Number.isFinite(tipWeek)
      ? tipWeek
      : parsedRange?.from;

  const progressValue = parseFloat(metrix?.pregnancyProgress);
  const totalWeeks = parsedRange?.to;
  const progress = Number.isFinite(progressValue)
    ? progressValue
    : Number.isFinite(week) && Number.isFinite(totalWeeks) && totalWeeks > 0
      ? Math.min(100, Math.round((week / totalWeeks) * 100))
      : null;

  const tipItems = parseTipDescription(overview?.tip?.description);
  const tipDetails = tipItems.map((item) => item?.detail).filter(Boolean);

  const whatToExpect = parseStringifiedArray(perTrimesterItem?.whatToExpect);
  const nutritionGuidance = parseStringifiedArray(
    perTrimesterItem?.nutritionGuidance,
  );

  const data = {
    week,
    totalWeeks,
    progress,
    trimester:
      trimesterFromApi ||
      TRIMESTER_LABELS[String(metrix?.trimester || "")] ||
      "",
    dueDate: formatDate(metrix?.estimatedDueDate),
    daysRemaining: metrix?.daysUntilDueDate,
  };

  const symptoms = whatToExpect;
  const nutrition = nutritionGuidance;
  const mobileSymptoms = tipDetails.length > 0 ? tipDetails : whatToExpect;

  return (
    <>
      <section className="overview-card">
        <div className="overview-content">
          <div className="overview-info">
            <div className="week-title">
              <h2>Week {data.week ?? "—"}</h2>
              <span className="trimester">{data.trimester}</span>
            </div>
            <p className="week-desc desktop-only"></p>
            <p className="week-desc mobile-only">
              {Number.isFinite(data.progress)
                ? `${data.progress}% complete`
                : ""}
              {Number.isFinite(data.progress) &&
              Number.isFinite(data.totalWeeks)
                ? " • "
                : ""}
              {Number.isFinite(data.totalWeeks)
                ? `${data.totalWeeks} weeks total`
                : ""}
            </p>

            <div className="stats-grid desktop-only">
              <div className="stat">
                <span className="label">Estimated Due Date</span>
                <span className="value">{data.dueDate || "—"}</span>
              </div>
              <div className="stat">
                <span className="label">Days Until Due Date</span>
                <span className="value">
                  {data.daysRemaining !== undefined &&
                  data.daysRemaining !== null
                    ? `${data.daysRemaining} days`
                    : "—"}
                </span>
              </div>

              <div className="stat">
                <span className="label">Pregnancy Progress</span>
                <span className="value">
                  {Number.isFinite(data.progress)
                    ? `${data.progress}% Complete`
                    : "—"}
                </span>
              </div>
            </div>

            <div className="progress-section">
              <span className="progress-label desktop-only">
                Journey Timeline
              </span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Number.isFinite(data.progress) ? data.progress : 0}%`,
                  }}
                />
              </div>
              <div className="progress-markers desktop-only">
                <span>Week {data.week ?? "—"}</span>
                <span>
                  {Number.isFinite(data.progress) ? `${data.progress}%` : "—"}
                </span>
              </div>
            </div>

            <div className="mobile-stats mobile-only">
              <div className="mobile-stat">
                <span className="label">Estimated Due Date</span>
                <span className="value">{data.dueDate || "—"}</span>
              </div>
              <div className="mobile-stat">
                <span className="label">Days Remaining</span>
                <span className="value">
                  {data.daysRemaining !== undefined &&
                  data.daysRemaining !== null
                    ? `${data.daysRemaining} days`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="overview-illustration desktop-only">
            <img src={babyIllustration} alt="Baby" />
          </div>
        </div>
      </section>

      <div className="info-cards-row desktop-only">
        <div className="info-card">
          <div className="card-header">
            <FiActivity className="card-icon" />
            <h3>What to Expect This Week</h3>
          </div>
          <p className="card-sub">Common symptoms and body changes</p>
          <ul className="card-list">
            {symptoms.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
            {symptoms.length === 0 && <li>No data from backend.</li>}
          </ul>
        </div>

        <div className="info-card">
          <div className="card-header">
            <span className="card-icon">🍎</span>
            <h3>Nutrition Guidance</h3>
          </div>
          <p className="card-sub">Recommended foods and hydration</p>
          <ul className="card-list">
            {nutrition.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
            {nutrition.length === 0 && <li>No data from backend.</li>}
          </ul>
        </div>
      </div>

      <section className="mobile-section mobile-only">
        <h3 className="section-title">What to Expect This Week</h3>
        <div className="carousel-container">
          <div className="carousel-card">
            <div className="carousel-header">
              <div className="carousel-icon">
                <FiHeart />
              </div>
              <h4>Physical Changes</h4>
            </div>
            <ul className="carousel-list">
              {mobileSymptoms.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
              {mobileSymptoms.length === 0 && <li>No data from backend.</li>}
            </ul>
          </div>
          <button className="carousel-arrow">
            <FiChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>
    </>
  );
};

export default PregnancyOverview;