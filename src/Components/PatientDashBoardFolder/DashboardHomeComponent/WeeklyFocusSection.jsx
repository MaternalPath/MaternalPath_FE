import "./Css/WeeklyFocusSection.css";
import { FiHeart, FiTarget } from "react-icons/fi";

const cardThemes = [
  {
    cardBg: "#F0F6FF",
    cardBorder: "#D6E4FF",
    iconBg: "#E0ECFF",
    iconColor: "#3B82F6",
    textColor: "#3B82F6",
    titleColor: "#3B82F6",
    icon: <FiHeart size={16} />,
  },
  {
    cardBg: "#F0FDF4",
    cardBorder: "#D1FAE5",
    iconBg: "#DCFCE7",
    iconColor: "#10B981",
    textColor: "#10B981",
    titleColor: "#10B981",
    icon: <FiHeart size={16} />,
  },
  {
    cardBg: "#FFFFFF",
    cardBorder: "#E5E7EB",
    iconBg: "#F9FAFB",
    iconColor: "#374151",
    textColor: "#374151",
    titleColor: "#374151",
    icon: <FiTarget size={16} />,
  },
];

const WeeklyFocusSection = ({ dashboardData = [] }) => {
  const weeklyFocus = Array.isArray(dashboardData)
    ? dashboardData.map((item, idx) => {
        const theme = cardThemes[idx % cardThemes.length];
        return {
          id: item?.id ?? idx,
          title: item?.title ?? item?.type ?? "Weekly Focus",
          desc: item?.description ?? item?.message ?? "No details available",
          ...theme,
        };
      })
    : [];

  return (
    <div className="focus-section">
      <h3 className="section-title">This Week's Focus</h3>
      <div className="focus-grid">
        {weeklyFocus.length === 0 && (
          <p className="focus-desc">No focus items available.</p>
        )}
        {weeklyFocus.map((item) => (
          <div
            key={item.id}
            className="focus-card"
            style={{
              background: item.cardBg,
              borderColor: item.cardBorder,
            }}
          >
            <div
              className="focus-icon"
              style={{
                background: item.iconBg,
                color: item.iconColor,
              }}
            >
              {item.icon}
            </div>
            <div className="focus-title" style={{ color: item.titleColor }}>
              {item.title}
            </div>
            <div className="focus-desc" style={{ color: item.textColor }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyFocusSection;