import React, { useMemo, useState } from "react";
import { FiActivity, FiDroplet, FiMoon, FiCalendar, FiCheck, FiChevronRight } from "react-icons/fi";
import "./Css/CareSection.css";

const STATUS_TOKENS = ["current", "completed"];

const fallbackTimeline = [
  {
    name: "First Trimester",
    status: "Completed",
    weeks: "Weeks 1-12",
    tags: ["Initial prenatal visit", "First ultrasound", "Pregnancy confirmation"]
  },
  {
    name: "Second Trimester",
    status: "Current",
    weeks: "Weeks 13-26",
    tags: ["Anatomy scan", "Feel baby movements", "Glucose screening"]
  },
  {
    name: "Third Trimester",
    status: "",
    weeks: "Weeks 27-40",
    tags: ["Hospital tour", "Birth plan discussion", "Final preparations"]
  }
];

const REMINDER_ICONS = {
  vitamin: <FiActivity />,
  prenatal: <FiActivity />,
  activity: <FiActivity />,
  exercise: <FiActivity />,
  water: <FiDroplet />,
  hydration: <FiDroplet />,
  sleep: <FiMoon />,
  rest: <FiMoon />,
  appointment: <FiCalendar />,
  checkup: <FiCalendar />,
  hospital: <FiCalendar />,
};

const pickReminderIcon = (title = "") => {
  const lower = String(title).toLowerCase();
  for (const key of Object.keys(REMINDER_ICONS)) {
    if (lower.includes(key)) return REMINDER_ICONS[key];
  }
  return <FiActivity />;
};

const normalizeWeeklyCare = (resp) => {
  if (!resp) return [];
  if (resp.data) return normalizeWeeklyCare(resp.data);
  if (resp.tip) return normalizeWeeklyCare(resp.tip);

  if (Array.isArray(resp)) {
    return resp
      .filter(Boolean)
      .map((item) => {
        if (typeof item === "string") {
          return { title: item, desc: "", time: "" };
        }
        if (typeof item === "object") {
          const title =
            item.title || item.name || item.reminder ||
            item.message || item.text || "Reminder";
          return {
            title,
            desc:
              item.desc || item.description || item.details ||
              item.subtitle || "",
            time:
              item.time || item.when || item.schedule ||
              item.frequency ||
              (item.week ? `Week ${item.week}` : ""),
            icon: pickReminderIcon(title),
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  if (typeof resp === "object") {
    const desc =
      resp.message || resp.description || resp.details || resp.text || "";
    const title = resp.title || resp.name || resp.reminder ||
      (resp.week ? "This Week's Tip" : desc);
    if (title) {
      return [{
        title,
        desc: title === desc ? "" : desc,
        time: resp.time || resp.when ||
          (resp.week ? `Week ${resp.week}` : ""),
        icon: pickReminderIcon(title + " " + desc),
      }];
    }
  }

  return [];
};

const parseTrimesterEntry = (entry) => {
  if (!Array.isArray(entry) || entry.length === 0) return null;

  const [name, second, ...rest] = entry;
  const isStatus = typeof second === "string" && STATUS_TOKENS.includes(second.toLowerCase());

  const status = isStatus ? second : "";
  const weeks = isStatus ? rest[0] || "" : second || "";
  const tags = (isStatus ? rest.slice(1) : rest).filter(Boolean);

  return { name, status, weeks, tags };
};

const CareSection = ({ timeline: timelineProp, weeklyCare }) => {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  const timeline = useMemo(() => {
    const source =
      Array.isArray(timelineProp?.perTrimester) && timelineProp.perTrimester.length > 0
        ? timelineProp.perTrimester
        : timelineProp?.firsttrim;

    if (!Array.isArray(source) || source.length === 0) return fallbackTimeline;

    const parsed = source.map(parseTrimesterEntry).filter(Boolean);
    return parsed.length > 0 ? parsed : fallbackTimeline;
  }, [timelineProp]);

  const baseReminders = [
    { icon: <FiActivity />, title: "Prenatal Vitamin", desc: "Take daily supplement", time: "Morning" },
    { icon: <FiDroplet />, title: "Hydration Goal", desc: "8 glasses today", time: "Throughout day" },
    { icon: <FiMoon />, title: "Rest & Sleep", desc: "7-9 hours nightly", time: "Evening" },
    { icon: <FiCalendar />, title: "Hospital Checkup", desc: "Upcoming appointment", time: "" },
  ];

  const careReminders = useMemo(
    () => [...baseReminders, ...normalizeWeeklyCare(weeklyCare)],
    [weeklyCare],
  );

  const mobileReminders = careReminders.map((item) => ({
    icon: item.icon || <FiActivity />,
    title: item.title,
    desc: item.desc || item.time || "",
    status: "Not Started",
  }));

  const statusClass = (status) => (status ? status.toLowerCase() : "");
  const activeMobile = timeline[activeMobileIdx] || timeline[0];

  return (
    <>
      <section className="reminders-card desktop-only">
        <h3 className="section-title">Weekly Care Reminders</h3>
        <div className="reminders-grid">
          {careReminders.map((item, i) => (
            <div key={i} className="reminder-item">
              <div className="reminder-icon">{item.icon || <FiActivity />}</div>
              <div className="reminder-content">
                <h4>{item.title}</h4>
                {item.desc && <p>{item.desc}</p>}
                {item.time && <span className="reminder-time">{item.time}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mobile-section mobile-only">
        <h3 className="section-title">Weekly Care Reminders</h3>
        <div className="reminders-carousel">
          {mobileReminders.map((item, i) => (
            <div key={i} className="reminder-card">
              <div className="reminder-header">
                <h4>{item.title}</h4>
                <div className="check-icon">
                  <FiCheck />
                </div>
              </div>
              <p className="reminder-desc">{item.desc}</p>
              <div className="reminder-progress">
                <div className="progress-line"></div>
              </div>
              <span className="reminder-status">{item.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline-card desktop-only">
        <h3 className="section-title">Pregnancy Timeline</h3>
        <div className="timeline-items">
          {timeline.map((item, idx) => (
            <div key={idx} className={`timeline-item ${statusClass(item.status)}`}>
              <div className="timeline-header">
                <h4>{item.name}</h4>
                {item.status && (
                  <span className={`badge ${statusClass(item.status)}`}>{item.status}</span>
                )}
              </div>
              <p className="timeline-weeks">{item.weeks}</p>
              <div className="timeline-tags">
                {item.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mobile-section mobile-only">
        <h3 className="section-title">Pregnancy Timeline</h3>
        <div className="carousel-container">
          <div className="timeline-card-mobile">
            <h4>{activeMobile?.name}</h4>
            <p className="timeline-weeks">{activeMobile?.weeks}</p>
            <div className="timeline-tags">
              {activeMobile?.tags.map((tag, i) => (
                <span key={i} className="timeline-tag">{tag}</span>
              ))}
            </div>
          </div>
          <button
            className="carousel-arrow"
            onClick={() => setActiveMobileIdx((idx) => (idx + 1) % timeline.length)}
          >
            <FiChevronRight />
          </button>
        </div>
        <div className="carousel-dots">
          {timeline.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === activeMobileIdx ? "active" : ""}`}
              onClick={() => setActiveMobileIdx(i)}
            ></span>
          ))}
        </div>
      </section>
    </>
  );
};

export default CareSection;
