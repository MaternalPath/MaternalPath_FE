import { MdErrorOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
// import "./Css/FundsFailed.css";

const formatNaira = (value) => {
  if (typeof value === "string" && value.trim().startsWith("₦")) return value;
  const num = Number(value);
  return Number.isFinite(num) ? `₦${num.toLocaleString()}` : "₦0";
};

const FundsFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const amountLabel = formatNaira(state.amount ?? 0);

  return (
    <div className="funds-failed-overlay">
      <div className="funds-failed-card">
        <div className="failed-icon-wrapper">
          <MdErrorOutline size={34} />
        </div>

        <h2 className="failed-title">Payment Failed</h2>

        <p className="failed-message">
          We could not complete your payment for {amountLabel}. No funds were
          added to your emergency wallet.
        </p>

        <div className="failed-action-buttons">
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate("/dashboard/emergencyWallet")}
          >
            Return to Wallet
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate("/dashboard/addFunds")}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundsFailed;