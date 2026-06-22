import { useState, useEffect } from "react";
import NotifHeader from "../../../Components/PatientDashBoardFolder/NotifyComponent/NotifHeader";
import FilterSection from "../../../Components/PatientDashBoardFolder/NotifyComponent/FilterSection";
import PriorityAlert from "../../../Components/PatientDashBoardFolder/NotifyComponent/PriorityAlert";
import NotificationList from "../../../Components/PatientDashBoardFolder/NotifyComponent/NotificationList/NotificationList";
import SavingsAlerts from "../../../Components/PatientDashBoardFolder/NotifyComponent/SavingsAlerts";
import HealthReminders from "../../../Components/PatientDashBoardFolder/NotifyComponent/HealthReminders";
import QuickActions from "../../../Components/PatientDashBoardFolder/NotifyComponent/QuickActions";
import "./Notifications.css";
import { getMotherNotifications } from "../../../api/mothers";

const stripWrappingQuotes = (value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const normalizeDescription = (rawDescription) => {
  if (!rawDescription) return "";
  if (typeof rawDescription !== "string") return String(rawDescription);

  const trimmed = rawDescription.trim();
  const cleaned = stripWrappingQuotes(trimmed);

  if (!(cleaned.startsWith("[") || cleaned.startsWith("{"))) {
    return cleaned;
  }

  try {
    const parsed = JSON.parse(cleaned);

    if (Array.isArray(parsed)) {
      const textParts = parsed.flatMap((entry) => {
        if (!entry || typeof entry !== "object") return [];

        if (entry.detail) {
          const label = entry.category ? `${entry.category}: ` : "";
          const when = entry.time ? ` (${entry.time})` : "";
          return [`${label}${entry.detail}${when}`];
        }

        const bucket = [
          entry.wellnessTip,
          entry.nutritionTip,
          entry.mentalHealthTip,
          entry.tip,
          entry.description,
        ].filter(Boolean);
        return bucket;
      });

      return textParts.join(" • ");
    }

    if (parsed && typeof parsed === "object") {
      return parsed.detail || parsed.description || parsed.message || cleaned;
    }

    return String(parsed);
  } catch {
    return cleaned;
  }
};

const normalizeNotificationItem = (item, idx) => {
  const title = stripWrappingQuotes(
    item?.title || item?.message || "Notification",
  );
  const description = normalizeDescription(item?.description);

  return {
    ...item,
    id: item?.id ?? idx,
    title,
    description,
    message: stripWrappingQuotes(item?.message || ""),
    type: item?.type || "general",
    time: item?.time || item?.createdAt || item?.updatedAt || "",
    unread:
      typeof item?.isRead === "boolean" ? !item.isRead : Boolean(item?.unread),
  };
};

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("All Notifications");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getMotherNotifications()
      .then((res) => {
        const incoming = Array.isArray(res?.data) ? res.data : [];
        setNotifications(incoming.map(normalizeNotificationItem));
      })
      .catch((error) => {
        console.error("Failed to load notifications:", error);
        setNotifications([]);
      });
  }, []);

  return (
    <div className="notifications-page">
      <NotifHeader />
      <FilterSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMobile={isMobile}
      />
      <PriorityAlert isMobile={isMobile} data={notifications} />
      <NotificationList isMobile={isMobile} data={notifications} />
      <SavingsAlerts isMobile={isMobile} data={notifications} />
      <HealthReminders isMobile={isMobile} data={notifications} />
      {!isMobile && <QuickActions />}
    </div>
  );
};

export default Notifications;