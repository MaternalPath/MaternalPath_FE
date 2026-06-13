import React, { useState } from "react";
import "../AddFundCom/Css/AddFunds.css";
import FundWalletForm from "../AddFundCom/FundWalletForm";
import WalletBalanceCard from "../AddFundCom/WalletBalanceCard";
import PaymentSecurityCard from "../AddFundCom/PaymentSecurityCard";
import SavingsSupportCard from "../AddFundCom/SavingsSupportCard";
import RecentTransactions from "../AddFundCom/RecentTransactions";

const AddFunds = () => {
  const [amount, setAmount] = useState("10000");
  const [paymentMethod, setPaymentMethod] = useState("debit");

  const walletData = {
    currentBalance: 285000,
    savingsGoal: 400000,
  };

  const transactions = [
    {
      amount: 10000,
      method: "Debit Card",
      time: "2 hours ago",
      status: "Successful",
    },
    {
      amount: 5000,
      method: "Bank Transfer",
      time: "1 day ago",
      status: "Successful",
    },
    {
      amount: 20000,
      method: "Mobile Banking",
      time: "3 days ago",
      status: "Successful",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Processing payment:", { amount, paymentMethod });
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
            />
          </div>

          <aside className="sidebar">
            <PaymentSecurityCard />
            <SavingsSupportCard />
            <WalletBalanceCard walletData={walletData} />
          </aside>
        </div>
        <RecentTransactions transactions={transactions} />
      </div>
    </main>
  );
};

export default AddFunds;
