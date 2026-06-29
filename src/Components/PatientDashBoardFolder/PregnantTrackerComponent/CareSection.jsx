import { useMemo, useState } from "react";
import {
  FiActivity,
  FiDroplet,
  FiMoon,
  FiCalendar,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";
import "./Css/CareSection.css";

const STATUS_TOKENS = ["current", "completed"];

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
            item.title ||
            item.name ||
            item.reminder ||
            item.message ||
            item.text ||
            "Reminder";
          return {
            title,
            desc:
              item.desc ||
              item.description ||
              item.details ||
              item.subtitle ||
              "",
            time:
              item.time ||
              item.when ||
              item.schedule ||
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
    if (resp.description) {
      try {
        const parsed = JSON.parse(resp.description);
        if (Array.isArray(parsed)) {
          return parsed.filter(Boolean).map((item) => {
            const title = item?.category || "Reminder";
            return {
              title,
              desc: item?.detail || "",
              time: item?.time || "",
              icon: pickReminderIcon(title),
            };
          });
        }
      } catch {
        // Fall through to non-JSON mapping when description is plain text.
      }
    }

    const desc =
      resp.message || resp.description || resp.details || resp.text || "";
    const title =
      resp.title ||
      resp.name ||
      resp.reminder ||
      (resp.week ? "This Week's Tip" : desc);
    if (title) {
      return [
        {
          title,
          desc: title === desc ? "" : desc,
          time:
            resp.time || resp.when || (resp.week ? `Week ${resp.week}` : ""),
          icon: pickReminderIcon(title + " " + desc),
        },
      ];
    }
  }

  return [];
};

const parseTrimesterEntry = (entry) => {
  if (!Array.isArray(entry) || entry.length === 0) return null;

  const [name, second, ...rest] = entry;
  const isStatus =
    typeof second === "string" && STATUS_TOKENS.includes(second.toLowerCase());

  const status = isStatus ? second : "";
  const weeks = isStatus ? rest[0] || "" : second || "";
  const tags = (isStatus ? rest.slice(1) : rest).filter(Boolean);

  return { name, status, weeks, tags };
};

const CareSection = ({ timeline: timelineProp, weeklyCare }) => {
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const [timelineSlide, setTimelineSlide] = useState(0);

  const timeline = useMemo(() => {
    const source =
      Array.isArray(timelineProp?.thirdtrim) &&
      timelineProp.thirdtrim.length > 0
        ? timelineProp.thirdtrim
        : timelineProp?.firsttrim;

    if (!Array.isArray(source) || source.length === 0) return [];

    const parsed = source.map(parseTrimesterEntry).filter(Boolean);
    return parsed;
  }, [timelineProp]);

  const careReminders = useMemo(
    () => normalizeWeeklyCare(weeklyCare),
    [weeklyCare],
  );

  const mobileReminders = careReminders.map((item) => ({
    icon: item.icon || <FiActivity />,
    title: item.title,
    desc: item.desc || item.time || "",
    status: item.status || "",
  }));

  const statusClass = (status) => (status ? status.toLowerCase() : "");
  const activeMobile = timeline[activeMobileIdx] || timeline[0];

  return (
    <>
      <section className="reminders-card desktop-only">
        <h3 className="section-title">Weekly Care Reminders</h3>
        <div className="reminders-grid">
          {careReminders.length === 0 && <p>No reminders from backend.</p>}
          {careReminders.map((item, i) => (
            <div key={i} className="reminder-item">
              <div className="reminder-icon">{item.icon || <FiActivity />}</div>
              <div className="reminder-content">
                <h4>{item.title}</h4>
                {item.desc && <p>{item.desc}</p>}
                {item.time && (
                  <span className="reminder-time">{item.time}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mobile-section mobile-only">
        <h3 className="mobile-section-title">Weekly Care Reminders</h3>
        <div className="care-reminders-list">
          {mobileReminders.length === 0 && (
            <div className="empty-state">No reminders from backend.</div>
          )}
          {mobileReminders.map((item, i) => (
            <div key={i} className="care-reminder-card">
              <div className="reminder-card-header">
                <h4>{item.title}</h4>
                <div className="check-box">
                  <FiCheck />
                </div>
              </div>
              <p className="reminder-card-desc">
                {item.desc || "Daily • Morning"}
              </p>
              <div className="reminder-progress-line">
                <div className="progress-line-fill" style={{ width: "0%" }} />
              </div>
              <span className="reminder-status-text">Not Started</span>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline-card desktop-only">
        <h3 className="section-title">Pregnancy Timeline</h3>
        <div className="timeline-items">
          {timeline.length === 0 && <p>No timeline from backend.</p>}
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className={`timeline-item ${statusClass(item.status)}`}
            >
              <div className="timeline-header">
                <h4>{item.name}</h4>
                {item.status && (
                  <span className={`badge ${statusClass(item.status)}`}>
                    {item.status}
                  </span>
                )}
              </div>
              <p className="timeline-weeks">{item.weeks}</p>
              <div className="timeline-tags">
                {item.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mobile-section mobile-only">
        <h3 className="mobile-section-title">Pregnancy Timeline</h3>
        {timeline.length === 0 ? (
          <div className="empty-state">No timeline from backend.</div>
        ) : (
          <>
            <div className="mobile-carousel-wrapper">
              <div
                className="mobile-carousel-track"
                style={{ transform: `translateX(-${timelineSlide * 100}%)` }}
              >
                {timeline.map((item, idx) => (
                  <div key={idx} className="mobile-carousel-card timeline-card">
                    <h4>{item.name}</h4>
                    <p className="timeline-weeks-text">{item.weeks}</p>
                    <div className="timeline-tags-wrap">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="timeline-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {timeline.length > 1 && (
                <button
                  className="carousel-nav-btn"
                  onClick={() =>
                    setTimelineSlide((prev) => (prev + 1) % timeline.length)
                  }
                >
                  <FiChevronRight />
                </button>
              )}
            </div>
            {timeline.length > 1 && (
              <div className="carousel-indicators">
                {timeline.map((_, i) => (
                  <button
                    key={i}
                    className={`indicator-dot ${i === timelineSlide ? "active" : ""}`}
                    onClick={() => setTimelineSlide(i)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default CareSection;
