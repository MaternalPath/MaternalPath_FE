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
import {
  getPregnancyOverview,
  getWallet,
  getTodaysReminder,
  getRecentNotifications,
} from "../../../api/mothers";

const settledValue = (result) =>
  result?.status === "fulfilled" ? result.value : null;

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [reminder, setReminder] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [overviewRes, walletRes, reminderRes, notificationsRes] =
          await Promise.allSettled([
            getPregnancyOverview(),
            getWallet(),
            getTodaysReminder(),
            getRecentNotifications(),
          ]);

        setOverview(settledValue(overviewRes)?.info ?? null);
        setWallet(settledValue(walletRes)?.info ?? null);
        setReminder(settledValue(reminderRes));
        setNotifications(settledValue(notificationsRes)?.data ?? []);
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
        <PregnancyHeroCard data={overview} />
        <EmergencyWalletCard data={wallet} />
        <TodaysRemindersCard reminder={reminder} />
        <WeeklyFocusSection />
        <RecentNotificationsCard notifications={notifications} />
        <QuickActions />
      </section>
    </main>
  );
};

export default DashboardHome;
