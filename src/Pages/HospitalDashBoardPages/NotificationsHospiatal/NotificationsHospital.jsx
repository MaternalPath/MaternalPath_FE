import React, { useState } from "react";
import NotificationsHeader from "../../../Components/HospitalDashBoardFolder/NotifyHosComponent/NotificationsHeader";
import NotificationsFeed from "../../../Components/HospitalDashBoardFolder/NotifyHosComponent/NotificationsFeed";
import ActivityStatus from "../../../Components/HospitalDashBoardFolder/NotifyHosComponent/ActivityStatus";
import "./NotificationsHospital.css";

const NotificationsHospital = () => {
  const [activeTab, setActiveTab] = useState("All Notifications");
  const [refreshFeed, setRefreshFeed] = useState(0);

  return (
    <div className="notif-page">
      <div className="notif-page-content">
        <NotificationsHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMarkAllRead={() => setRefreshFeed((prev) => prev + 1)}
        />
        <div className="notif-main-grid">
          <NotificationsFeed
            activeTab={activeTab}
            refreshTrigger={refreshFeed}
          />
          <ActivityStatus />
        </div>
      </div>
    </div>
  );
};

export default NotificationsHospital;
