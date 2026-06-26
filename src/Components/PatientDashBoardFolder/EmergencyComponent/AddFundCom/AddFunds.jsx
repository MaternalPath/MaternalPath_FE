// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "../AddFundCom/Css/AddFunds.css";
// import FundWalletForm from "../AddFundCom/FundWalletForm";
// import WalletBalanceCard from "../AddFundCom/WalletBalanceCard";
// import PaymentSecurityCard from "../AddFundCom/PaymentSecurityCard";
// import SavingsSupportCard from "../AddFundCom/SavingsSupportCard";
// import RecentTransactions from "../AddFundCom/RecentTransactions";
// import {
//   fundWallet,
//   getEmergencyWalletInfo,
// } from "../../../../api/mothers";

// const AddFunds = () => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState("10000");
//   const [paymentMethod, setPaymentMethod] = useState("debit");
//   const [walletData, setWalletData] = useState({
//     currentBalance: 0,
//     savingsGoal: 0,
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         const resp = await getEmergencyWalletInfo();
//         if (cancelled) return;
//         const info = resp?.info || {};
//         setWalletData({
//           currentBalance: Number(info.currentBalance) || 0,
//           savingsGoal: Number(info.savingsGoal) || 0,
//         });
//       } catch (err) {
//         console.error("Failed to load wallet for AddFunds:", err);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const numericAmount = Number(amount);
//     if (!numericAmount || numericAmount <= 0) {
//       toast.error("Enter a valid amount.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await fundWallet({ amount: numericAmount });

//       const newBalance =
//         Number(response?.info?.currentBalance) ||
//         Number(response?.currentBalance) ||
//         walletData.currentBalance + numericAmount;

//       toast.success("Funds added successfully");
//       navigate("/fundsSuccess", {
//         state: {
//           amount: numericAmount,
//           newBalance,
//           paymentMethod,
//         },
//       });
//     } catch (err) {
//       toast.error(typeof err === "string" ? err : "Could not add funds.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="add-funds-page">
//       <div className="add-funds-container">
//         <header className="page-header">
//           <h1>Add Funds</h1>
//           <p>
//             Securely save towards your delivery and emergency healthcare needs.
//           </p>
//         </header>

//         <div className="add-funds-grid">
//           <div className="main-content">
//             <FundWalletForm
//               amount={amount}
//               setAmount={setAmount}
//               paymentMethod={paymentMethod}
//               setPaymentMethod={setPaymentMethod}
//               walletData={walletData}
//               onSubmit={handleSubmit}
//               isSubmitting={isSubmitting}
//             />
//           </div>

//           <aside className="sidebar">
//             <PaymentSecurityCard />
//             <SavingsSupportCard />
//             <WalletBalanceCard walletData={walletData} />
//           </aside>
//         </div>
//         <RecentTransactions transactions={[]} />
//       </div>
//     </main>
//   );
// };

// export default AddFunds;

import { useEffect, useState } from "react";
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
  getPaymentHistory,
} from "../../../../api/mothers";

const getPaymentStatusFromUrl = (rawUrl) => {
  if (!rawUrl) return null;

  try {
    const parsed = new URL(rawUrl, window.location.origin);
    const params = parsed.searchParams;
    const statusValue = (
      params.get("status") ||
      params.get("payment_status") ||
      params.get("tx_status") ||
      params.get("transaction_status") ||
      ""
    ).toLowerCase();

    if (
      statusValue.includes("success") ||
      statusValue.includes("successful") ||
      statusValue.includes("completed") ||
      statusValue.includes("paid")
    ) {
      return "success";
    }

    if (
      statusValue.includes("fail") ||
      statusValue.includes("failed") ||
      statusValue.includes("error") ||
      statusValue.includes("cancel") ||
      statusValue.includes("declined")
    ) {
      return "failed";
    }

    const normalizedUrl = `${parsed.pathname}${parsed.search}`.toLowerCase();
    if (normalizedUrl.includes("success")) return "success";
    if (
      normalizedUrl.includes("fail") ||
      normalizedUrl.includes("cancel") ||
      normalizedUrl.includes("error")
    ) {
      return "failed";
    }
  } catch {
    const normalizedUrl = String(rawUrl).toLowerCase();
    if (normalizedUrl.includes("success")) return "success";
    if (
      normalizedUrl.includes("fail") ||
      normalizedUrl.includes("cancel") ||
      normalizedUrl.includes("error")
    ) {
      return "failed";
    }
  }

  return null;
};

const isAlreadyCompletedPayment = (message) =>
  String(message || "")
    .toLowerCase()
    .includes("payment has already been completed");

const formatTransactionTime = (value) => {
  if (!value) return "Just now";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);

  return parsed.toLocaleString();
};

const normalizeTransactionStatus = (status) => {
  const normalized = String(status || "pending").toLowerCase();
  if (normalized.includes("success") || normalized.includes("complete")) {
    return "Successful";
  }
  if (normalized.includes("fail") || normalized.includes("cancel")) {
    return "Failed";
  }
  return "Pending";
};

const normalizePaymentHistory = (response) => {
  const candidates = [
    response?.data?.data,
    response?.data?.transactions,
    response?.data,
    response?.transactions,
    response?.info,
    response,
  ];

  const records = candidates.find((item) => Array.isArray(item)) || [];

  return records.map((tx) => ({
    amount: Number(tx?.amount ?? tx?.transactionAmount ?? tx?.total ?? 0),
    method:
      tx?.method ||
      tx?.paymentMethod ||
      tx?.channel ||
      tx?.provider ||
      "Payment",
    time: formatTransactionTime(
      tx?.createdAt || tx?.created_at || tx?.updatedAt || tx?.date || tx?.time,
    ),
    status: normalizeTransactionStatus(
      tx?.status || tx?.paymentStatus || tx?.transactionStatus,
    ),
  }));
};

const AddFunds = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("10000");
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [walletData, setWalletData] = useState({
    currentBalance: 0,
    savingsGoal: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [pendingPayment, setPendingPayment] = useState(null);
  const [paymentHandled, setPaymentHandled] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const completePaymentSuccess = (paymentState) => {
    setPaymentHandled(true);
    setPaymentUrl("");
    toast.success("Payment completed successfully.");
    navigate("/fundsSuccess", {
      state: {
        amount: paymentState?.amount,
        newBalance: paymentState?.newBalance,
        paymentMethod: paymentState?.paymentMethod,
      },
    });
  };

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await getPaymentHistory();
        if (cancelled) return;
        setTransactions(normalizePaymentHistory(resp));
      } catch (err) {
        console.error("Failed to load payment history:", err);
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
      const redirectUrl = response?.data?.data?.checkout_url;
      const apiMessage = response?.data?.message || response?.message || "";
      const paymentState = {
        amount: numericAmount,
        newBalance,
        paymentMethod,
      };

      if (isAlreadyCompletedPayment(apiMessage)) {
        completePaymentSuccess(paymentState);
        return;
      }

      if (redirectUrl) {
        setPaymentHandled(false);
        setPendingPayment(paymentState);
        setPaymentUrl(redirectUrl);
        toast.info("Complete your payment to finish adding funds.");
      } else {
        toast.error("Payment link not available. Please try again.");
      }
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : err?.message;
      if (isAlreadyCompletedPayment(errorMessage)) {
        completePaymentSuccess({
          amount: numericAmount,
          newBalance: walletData.currentBalance + numericAmount,
          paymentMethod,
        });
        return;
      }

      toast.error(errorMessage || "Could not add funds.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentIframeLoad = (event) => {
    if (paymentHandled) return;

    const iframe = event.currentTarget;
    const currentUrl = (() => {
      try {
        return iframe?.contentWindow?.location?.href || iframe?.src || "";
      } catch {
        return iframe?.src || "";
      }
    })();

    const status = getPaymentStatusFromUrl(currentUrl);
    if (!status) return;

    setPaymentHandled(true);
    setPaymentUrl("");

    if (status === "success") {
      navigate("/fundsSuccess", {
        state: {
          amount: pendingPayment?.amount,
          newBalance: pendingPayment?.newBalance,
          paymentMethod: pendingPayment?.paymentMethod,
        },
      });
      return;
    }
    setPaymentUrl("");
    navigate("/fundsFailed", {
      state: {
        amount: pendingPayment?.amount,
        paymentMethod: pendingPayment?.paymentMethod,
      },
    });
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
        <RecentTransactions transactions={transactions} />
      </div>
      {paymentUrl && (
        <div
          className="payment-iframe-wrapper"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPaymentUrl("");
          }}
        >
          <div>
            <div className="payment-iframe-header">
              <h3>Complete Payment</h3>
              <button type="button" onClick={() => setPaymentUrl("")}>
                Close
              </button>
            </div>

            <iframe
              src={paymentUrl}
              title="KoraPay Payment"
              className="payment-iframe"
              allow="payment *"
              onLoad={handlePaymentIframeLoad}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default AddFunds;
