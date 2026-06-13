import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmergencyWallet.css";
import WalletHeader from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/WalletHeader";
import WalletSummaryCard from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/WalletSummaryCard";
import SavingsInsights from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/SavingsInsights";
import TransactionHistory from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/TransactionHistory";
import QuickActions from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/QuickActions";
import HospitalReadiness from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/HospitalReadiness";
import ReminderCards from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/ReminderCards";

const EmergencyWallet = () => {
  const navigate = useNavigate();

  const walletData = {
    currentBalance: 285000,
    savingsGoal: 400000,
    remainingAmount: 115000,
    estimatedDueDate: "September 18, 2026",
    daysUntilDue: 128,
    monthlyDeposit: 60000,
    lastDeposit: "May 14, 2026",
    nextScheduled: "June 1, 2026",
    weeklyContribution: 10000,
    weeksRemaining: 19,
  };

  const monthlyData = [
    { month: "January", amount: 50000, status: "done" },
    { month: "February", amount: 45000, status: "done" },
    { month: "March", amount: 50000, status: "done" },
    { month: "April", amount: 55000, status: "done" },
    { month: "May", amount: 75000, status: "active" },
    { month: "June", amount: 40000, status: "pending", isTarget: true },
  ];

  const transactions = [
    {
      date: "May 12, 2026",
      type: "Contribution",
      desc: "Monthly savings deposit",
      amount: 25000,
      status: "Completed",
    },
    {
      date: "May 05, 2026",
      type: "Contribution",
      desc: "Weekly savings deposit",
      amount: 10000,
      status: "Completed",
    },
    {
      date: "April 28, 2026",
      type: "Contribution",
      desc: "Monthly savings deposit",
      amount: 30000,
      status: "Completed",
    },
    {
      date: "April 20, 2026",
      type: "Contribution",
      desc: "Weekly savings deposit",
      amount: 10000,
      status: "Completed",
    },
    {
      date: "April 12, 2026",
      type: "Contribution",
      desc: "Family contribution",
      amount: 15000,
      status: "Completed",
    },
  ];

  const handleAddFunds = () => {
    navigate("/dashboard/addFunds");
  };

  return (
    <main className="emergency-wallet-page">
      <WalletHeader onAddFunds={handleAddFunds} />

      <div className="wallet-content">
        <WalletSummaryCard data={walletData} onAddFunds={handleAddFunds} />

        <SavingsInsights monthlyData={monthlyData} data={walletData} />

        <TransactionHistory transactions={transactions} />

        <QuickActions onAddFunds={handleAddFunds} />

        <HospitalReadiness data={walletData} />

        <ReminderCards data={walletData} />
      </div>
    </main>
  );
};

export default EmergencyWallet;
