import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmergencyWallet.css";
import WalletHeader from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/WalletHeader";
import WalletSummaryCard from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/WalletSummaryCard";
import SavingsInsights from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/SavingsInsights";
import TransactionHistory from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/TransactionHistory";
import QuickActions from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/QuickActions";
import HospitalReadiness from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/HospitalReadiness";
import ReminderCards from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/ReminderCards";
import EmergencyWalletSkeleton from "../../../Components/PatientDashBoardFolder/EmergencyComponent/EmergencyWallet/EmergencyWalletSkeleton";
import { getEmergencyWalletInfo } from "../../../api/mothers";

const MONTH_ORDER = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatDueDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const parseNumberFromString = (str) => {
  if (str === null || str === undefined) return 0;
  const match = String(str).match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
};

const buildMonthlyData = (monthlySavings) => {
  if (!monthlySavings || typeof monthlySavings !== "object") return [];
  const now = new Date();
  const currentMonth = now.toLocaleString("en-US", { month: "long" });
  const currentIdx = Math.max(0, MONTH_ORDER.indexOf(currentMonth));

  const months = MONTH_ORDER.map((month, idx) => {
    const amount = Number(monthlySavings[month]) || 0;
    let status = "pending";
    if (idx < currentIdx) status = amount > 0 ? "done" : "pending";
    else if (idx === currentIdx) status = "active";
    return { month, amount, status };
  });

  const start = Math.max(0, currentIdx - 3);
  const end = Math.min(MONTH_ORDER.length, start + 6);
  return months.slice(start, end);
};

const buildTransactions = (history) => {
  if (!Array.isArray(history)) return [];
  return history.map((item) => ({
    date: item.date || item.createdAt || "—",
    type: item.type || "Contribution",
    desc: item.description || item.desc || "",
    amount: Number(item.amount) || 0,
    status: item.status || "Completed",
  }));
};

const EmergencyWallet = () => {
  const navigate = useNavigate();
  const [walletResp, setWalletResp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await getEmergencyWalletInfo();
        if (!cancelled) setWalletResp(resp);
      } catch (err) {
        console.error("Failed to load emergency wallet:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const walletData = useMemo(() => {
    const info = walletResp?.info || {};
    const insights = walletResp?.data || {};
    return {
      currentBalance: Number(info.currentBalance) || 0,
      savingsGoal: Number(info.savingsGoal) || 0,
      remainingAmount: Number(info.remainingAmountNeeded) || 0,
      estimatedDueDate: formatDueDate(info.estimatedDueDate),
      daysUntilDue: Number(info.daysUntilDueDate) || 0,
      savingsProgress: Number(info.savingsProgress) || 0,
      preferredHospital: info.preferredHospital || "—",
      preparedness: info.preparedness || "",
      weeksRemaining: parseNumberFromString(
        insights["Weeks Remaining until Due Date"],
      ),
      weeklyContribution: parseNumberFromString(
        insights["Current weekly contribution"],
      ),
      weeklyRecommendationText:
        insights["WeeklyContributionRecommendation"] || "",
      onTrackText: insights["On Track"] || "",
    };
  }, [walletResp]);

  const monthlyData = useMemo(
    () => buildMonthlyData(walletResp?.monthlySavings),
    [walletResp],
  );

  const transactions = useMemo(
    () => buildTransactions(walletResp?.history),
    [walletResp],
  );

  const handleAddFunds = () => {
    navigate("/dashboard/addFunds");
  };

  if (loading) {
    return (
      <main className="emergency-wallet-page">
        <EmergencyWalletSkeleton />
      </main>
    );
  }

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
