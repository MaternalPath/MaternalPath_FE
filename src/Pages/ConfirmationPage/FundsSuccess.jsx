import { GoCheck } from "react-icons/go";
import "./Css/FundsSuccess.css";

const FundsSuccess = ({ 
  amountAdded = "₦10,000", 
  newBalance = "₦55,000",
  onViewTransactions,
  onReturnToWallet 
}) => {
  return (
    <div className="funds-success-overlay">
      <div className="funds-success-card">
        <div className="success-icon-wrapper">
          <GoCheck size={32} />
        </div>

        <h2 className="success-title">Funds Successfully Added</h2>
        
        <p className="success-message">
          You've successfully added {amountAdded} to your emergency wallet.
          <br />
          You're one step closer to your delivery readiness goal!
        </p>

        <div className="balance-box">
          <span className="balance-label">New Wallet Balance</span>
          <strong className="balance-amount">{newBalance}</strong>
        </div>

        <div className="action-buttons">
          <button 
            className="btn-outline" 
            onClick={onViewTransactions}
          >
            View Transactions
          </button>
          <button 
            className="btn-primary" 
            onClick={onReturnToWallet}
          >
            Return to Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundsSuccess;
