import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../AddFundCom/Css/AddFunds.css";
import FundWalletForm from "../AddFundCom/FundWalletForm";
import WalletBalanceCard from "../AddFundCom/WalletBalanceCard";
import PaymentSecurityCard from "../AddFundCom/PaymentSecurityCard";
import SavingsSupportCard from "../AddFundCom/SavingsSupportCard";
import RecentTransactions from "../AddFundCom/RecentTransactions";
import {
  fundWallet,
  getEmergencyWalletInfo,
} from "../../../../api/mothers";

const AddFunds = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("10000");
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [walletData, setWalletData] = useState({
    currentBalance: 0,
    savingsGoal: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await getEmergencyWalletInfo();
        if (cancelled) return;
        const info = resp?.info || {};
        setWalletData({
          currentBalance: Number(info.currentBalance) || 0,
          savingsGoal: Number(info.savingsGoal) || 0,
        });
      } catch (err) {
        console.error("Failed to load wallet for AddFunds:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      toast.error("Enter a valid amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fundWallet({ amount: numericAmount });

      const newBalance =
        Number(response?.info?.currentBalance) ||
        Number(response?.currentBalance) ||
        walletData.currentBalance + numericAmount;

      toast.success("Funds added successfully");
      navigate("/fundsSuccess", {
        state: {
          amount: numericAmount,
          newBalance,
          paymentMethod,
        },
      });
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Could not add funds.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="add-funds-page">
      <div className="add-funds-container">
        <header className="page-header">
          <h1>Add Funds</h1>
          <p>
            Securely save towards your delivery and emergency healthcare needs.
          </p>
        </header>

        <div className="add-funds-grid">
          <div className="main-content">
            <FundWalletForm
              amount={amount}
              setAmount={setAmount}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              walletData={walletData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>

          <aside className="sidebar">
            <PaymentSecurityCard />
            <SavingsSupportCard />
            <WalletBalanceCard walletData={walletData} />
          </aside>
        </div>
        <RecentTransactions transactions={[]} />
      </div>
    </main>
  );
};

export default AddFunds;
