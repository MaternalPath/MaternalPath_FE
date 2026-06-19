import React, { useState, useEffect } from "react";
import NotifHeader from "../../../Components/PatientDashBoardFolder/NotifyComponent/NotifHeader";
import FilterSection from "../../../Components/PatientDashBoardFolder/NotifyComponent/FilterSection";
import PriorityAlert from "../../../Components/PatientDashBoardFolder/NotifyComponent/PriorityAlert";
import NotificationList from "../../../Components/PatientDashBoardFolder/NotifyComponent/NotificationList/NotificationList";
import SavingsAlerts from "../../../Components/PatientDashBoardFolder/NotifyComponent/SavingsAlerts";
import HealthReminders from "../../../Components/PatientDashBoardFolder/NotifyComponent/HealthReminders";
import QuickActions from "../../../Components/PatientDashBoardFolder/NotifyComponent/QuickActions";
import "./Notifications.css";
import { getMotherNotifications } from "../../../api/mothers";

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState("All Notifications");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    getMotherNotifications()
  },[])

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
