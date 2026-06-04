import React, { useState, useEffect } from "react";
import NotifHeader from "../../Components/NotifyComponent/NotifHeader";
import FilterSection from "../../Components/NotifyComponent/FilterSection";
import PriorityAlert from "../../Components/NotifyComponent/PriorityAlert";
import NotificationList from "../../Components/NotifyComponent/NotificationList/NotificationList";
import SavingsAlerts from "../../Components/NotifyComponent/SavingsAlerts";
import HealthReminders from "../../Components/NotifyComponent/HealthReminders";
import QuickActions from "../../Components/NotifyComponent/QuickActions";
import "./Notifications.css";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("All Notifications");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      <PriorityAlert isMobile={isMobile} />
      <NotificationList isMobile={isMobile} />
      <SavingsAlerts isMobile={isMobile} />
      <HealthReminders isMobile={isMobile} />
      {!isMobile && <QuickActions />}
    </div>
  );
};

export default Notifications;
