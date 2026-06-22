import React, { useEffect, useState } from "react";
import "./DashboardHome.css";
import WelcomeHeader from "../../../Components/PatientDashBoardFolder/DashboardHomeComponent/WelcomeHeader";
import PregnancyHeroCard from "../../../Components/PatientDashBoardFolder/DashboardHomeComponent/PregnancyHeroCard";
import EmergencyWalletCard from "../../../Components/PatientDashBoardFolder/DashboardHomeComponent/EmergencyWalletCard";
import TodaysRemindersCard from "../../../Components/PatientDashBoardFolder/DashboardHomeComponent/TodaysRemindersCard";
import WeeklyFocusSection from "../../../Components/PatientDashBoardFolder/DashboardHomeComponent/WeeklyFocusSection";
import RecentNotificationsCard from "../../../Components/PatientDashBoardFolder/DashboardHomeComponent/RecentNotificationsCard";
import QuickActions from "../../../Components/PatientDashBoardFolder/NotifyComponent/QuickActions";
import DashboardSkeleton from "../../../Components/PatientDashBoardFolder/DashboardHomeComponent/DashboardSkeleton";
import { getDashboardOverview } from "../../../api/mothers";

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardOverview();
        setDashboardData(res);
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="dashboard">
        <section className="dashboard-container">
          <DashboardSkeleton />
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <section className="dashboard-container">
        <WelcomeHeader />
        <PregnancyHeroCard dashboardData={dashboardData?.info} />
        <EmergencyWalletCard dashboardData={dashboardData?.data} />
        <TodaysRemindersCard dashboardData={dashboardData?.reminder} />
        <WeeklyFocusSection dashboardData={dashboardData?.theWeeksFocus} />
        <RecentNotificationsCard dashboardData={dashboardData?.theWeeksFocus} />
        <QuickActions />
      </section>
    </main>
  );
};

export default DashboardHome;