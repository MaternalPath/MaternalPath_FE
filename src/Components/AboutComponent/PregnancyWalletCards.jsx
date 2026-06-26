import "./Css/PregnancyWalletCards.css";
import { BsCheckCircle } from "react-icons/bs";

const PregnancyWalletCards = ({
  week = 24,
  totalWeeks = 40,
  balance = 285000,
}) => {
  const percentage = Math.round((week / totalWeeks) * 100);

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(balance);

  return (
    <div className="pwc-wrapper">
      <div className="pwc-card">
        <p className="pwc-label">Pregnancy Week</p>
        <h2 className="pwc-value">Week {week}</h2>
        <div className="pwc-progress-track">
          <div
            className="pwc-progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="pwc-sub">{percentage}% complete</p>
      </div>

      <div className="pwc-card">
        <p className="pwc-label">Emergency Wallet</p>
        <h2 className="pwc-value">{formattedBalance}</h2>
        <p className="pwc-sub">
          <BsCheckCircle className="pwc-check-icon" />
          On track for delivery
        </p>
      </div>
    </div>
  );
};

export default PregnancyWalletCards;
