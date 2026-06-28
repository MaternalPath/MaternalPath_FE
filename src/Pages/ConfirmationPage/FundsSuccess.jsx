// import { GoCheck } from "react-icons/go";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Css/FundsSuccess.css";

// const formatNaira = (value) => {
//   if (typeof value === "string" && value.trim().startsWith("₦")) return value;
//   const num = Number(value);
//   return Number.isFinite(num) ? `₦${num.toLocaleString()}` : "₦0";
// };

// const FundsSuccess = ({
//   amountAdded,
//   newBalance,
//   onViewTransactions,
//   onReturnToWallet,
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const state = location.state || {};

//   const amountLabel = formatNaira(amountAdded ?? state.amount ?? 0);
//   const balanceLabel = formatNaira(newBalance ?? state.newBalance ?? 0);

//   // const handleViewTransactions =
//   //   onViewTransactions || (() => navigate("/dashboard/emergencyWallet"));
//   const handleReturnToWallet =
//     onReturnToWallet || (() => navigate("/dashboard/emergencyWallet"));

//   return (
//     <div className="funds-success-overlay">
//       <div className="funds-success-card">
//         <div className="success-icon-wrapper">
//           <GoCheck size={30} />
//         </div>

//         <h2 className="success-title">Funds Successfully Added</h2>

//         {/* <p className="success-message">
//           You've successfully added {amountLabel} to your emergency wallet.
//           <br />
//           You're one step closer to your delivery readiness goal!
//         </p> */}

//         {/* <div className="balance-box">
//           <span className="balance-label">New Wallet Balance</span>
//           <strong className="balance-amount">{balanceLabel}</strong>
//         </div> */}

//         <div className="action-buttons">
//           {/* <button
//             className="btn-outline"
//             onClick={handleViewTransactions}
//           >
//             View Transactions
//           </button> */}
//           <button
//             className="btn-primary"
//             onClick={handleReturnToWallet}
//           >
//             Return to Wallet
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FundsSuccess;


import { GoCheck } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
import { toast } from "react-toastify";
import "./Css/FundsSuccess.css";

const formatNaira = (value) => {
  if (typeof value === "string" && value.trim().startsWith("₦")) return value;
  const num = Number(value);
  return Number.isFinite(num) ? `₦${num.toLocaleString()}` : "₦0";
};

const FundsSuccess = ({
  amountAdded,
  newBalance,
  onViewTransactions,
  onReturnToWallet,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const amountLabel = formatNaira(amountAdded ?? state.amount ?? 0);
  const balanceLabel = formatNaira(newBalance ?? state.newBalance ?? 0);

  const handleReturnToWallet = () => {
    // Show toast when button is clicked
    toast.success(
      `✅ Transaction successful! ${amountLabel} added to your wallet.`,
      {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
          padding: "16px 24px",
          borderRadius: "12px",
          fontWeight: "500",
          fontSize: "16px",
        },
        icon: "💰",
      }
    );
    
    // Navigate after a short delay
    setTimeout(() => {
      if (onReturnToWallet) {
        onReturnToWallet();
      } else {
        navigate("/dashboard/emergencyWallet");
      }
    }, 500);
  };

  return (
    <>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
      <div className="funds-success-overlay">
        <div className="funds-success-card">
          <div className="success-icon-wrapper">
            <GoCheck size={30} />
          </div>

          <h2 className="success-title">Funds Successfully Added</h2>

          <div className="action-buttons">
            <button
              className="btn-primary"
              onClick={handleReturnToWallet}
            >
              Return to Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundsSuccess;
