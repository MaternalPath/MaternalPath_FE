import React from "react";
import "./DashboardHome.css";
import WelcomeHeader from "../../Components/DashboardHomeComponent/WelcomeHeader";
import PregnancyHeroCard from "../../Components/DashboardHomeComponent/PregnancyHeroCard";
import EmergencyWalletCard from "../../Components/DashboardHomeComponent/EmergencyWalletCard";
import TodaysRemindersCard from "../../Components/DashboardHomeComponent/TodaysRemindersCard";
import WeeklyFocusSection from "../../Components/DashboardHomeComponent/WeeklyFocusSection";
import RecentNotificationsCard from "../../Components/DashboardHomeComponent/RecentNotificationsCard";
import QuickActions from "../../Components/NotifyComponent/QuickActions";

const DashboardHome = ({ data }) => {
  const userData = data || {
    name: "Adaeze Nnamdi",
    week: 24,
    trimester: "Second Trimester",
    dueDate: "September 18, 2026",
    daysUntilDue: 128,
    hospital: "Lagos General Hospital",
    pregnancyProgress: 60,
    walletBalance: 285000,
    savingsGoal: 400000,
    savingsProgress: 71,
    readinessStatus: "Moderate Preparedness",
  };

  return (
    <main className="dashboard">
      <section className="dashboard-container">
        <WelcomeHeader name={userData.name} />
        <PregnancyHeroCard data={userData} />
        <EmergencyWalletCard data={userData} />
        <TodaysRemindersCard />
        <WeeklyFocusSection />
        <RecentNotificationsCard />
        <QuickActions />
      </section>
    </main>
  );
};

export default DashboardHome;
