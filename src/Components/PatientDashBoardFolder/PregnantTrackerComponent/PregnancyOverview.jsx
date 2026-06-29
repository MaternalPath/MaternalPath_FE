import { useState } from "react";
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
  const [activeSlide, setActiveSlide] = useState(0);

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
  const totalWeeks = parsedRange?.to || 40;
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
    daysRemaining: metrix?.daysUntilDelivery,
  };

  const symptoms = whatToExpect;
  const nutrition = nutritionGuidance;
  const mobileSymptoms = tipDetails.length > 0 ? tipDetails : whatToExpect;

  // Build slides for "What to Expect" carousel
  const expectSlides = [
    { title: "Physical Changes", items: mobileSymptoms, icon: <FiHeart /> },
    { title: "Nutrition", items: nutrition, icon: <span>🍎</span> },
  ].filter((slide) => slide.items.length > 0);

  return (
    <>
      <section className="overview-card mobile-only">
        <div className="week-header">
          <h2>Week {data.week ?? "—"}</h2>
          <span className="trimester-label">{data.trimester}</span>
        </div>
        <p className="progress-meta">
          {Number.isFinite(data.progress) ? `${data.progress}% complete` : ""}
          {Number.isFinite(data.progress) && Number.isFinite(data.totalWeeks)
            ? " • "
            : ""}
          {Number.isFinite(data.totalWeeks)
            ? `${data.totalWeeks} weeks total`
            : ""}
        </p>

        <div className="progress-bar-mobile">
          <div
            className="progress-fill-mobile"
            style={{
              width: `${Number.isFinite(data.progress) ? data.progress : 0}%`,
            }}
          />
        </div>

        <div className="mobile-stats-grid">
          <div className="mobile-stat-item">
            <span className="stat-label">Estimated Due Date</span>
            <span className="stat-value">{data.dueDate || "—"}</span>
          </div>
          <div className="mobile-stat-item">
            <span className="stat-label">Days Remaining</span>
            <span className="stat-value">
              {data.daysRemaining !== undefined && data.daysRemaining !== null
                ? `${data.daysRemaining} days`
                : "—"}
            </span>
          </div>
        </div>
      </section>

      {/* Desktop - keep existing */}
      <section className="overview-card desktop-only">
        {/*... your existing desktop code... */}
      </section>

      <div className="info-cards-row desktop-only">
        {/*... your existing desktop code... */}
      </div>

      <section className="mobile-section mobile-only">
        <h3 className="mobile-section-title">What to Expect This Week</h3>
        <div className="mobile-carousel-wrapper">
          <div
            className="mobile-carousel-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {expectSlides.map((slide, idx) => (
              <div key={idx} className="mobile-carousel-card">
                <div className="carousel-card-header">
                  <div className="carousel-card-icon">{slide.icon}</div>
                  <h4>{slide.title}</h4>
                </div>
                <ul className="carousel-card-list">
                  {slide.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                  {slide.items.length === 0 && <li>No data from backend.</li>}
                </ul>
              </div>
            ))}
          </div>
          {expectSlides.length > 1 && (
            <button
              className="carousel-nav-btn"
              onClick={() =>
                setActiveSlide((prev) => (prev + 1) % expectSlides.length)
              }
            >
              <FiChevronRight />
            </button>
          )}
        </div>
        {expectSlides.length > 1 && (
          <div className="carousel-indicators">
            {expectSlides.map((_, i) => (
              <button
                key={i}
                className={`indicator-dot ${i === activeSlide ? "active" : ""}`}
                onClick={() => setActiveSlide(i)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default PregnancyOverview;
