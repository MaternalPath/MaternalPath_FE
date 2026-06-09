import React from "react";
import { FiShield, FiCreditCard, FiSmartphone } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import "../AddFundCom/Css/FundWalletForm.css";

const FundWalletForm = ({ amount, setAmount, paymentMethod, setPaymentMethod, walletData, onSubmit }) => {
  const quickAmounts = [5000, 10000, 20000, 50000];
  const progressPercent = Math.round((walletData.currentBalance / walletData.savingsGoal) * 100);

  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  return (
    <section className="fund-wallet-card">
      <h2>Fund Emergency Wallet</h2>
      <p className="subtitle">
        Add money securely through KoraPay to continue building your delivery savings.
      </p>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Enter Amount</label>
          <div className="amount-input-wrapper">
            <span className="currency">₦</span>
            <input
              type="text"
              id="amount"
              value={Number(amount).toLocaleString()}
              onChange={handleAmountChange}
              placeholder="0"
            />
          </div>
        </div>

        <div className="quick-amounts">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              className={`quick-amount-btn ${Number(amount) === amt ? "active" : ""}`}
              onClick={() => setAmount(amt.toString())}
            >
              {formatCurrency(amt)}
            </button>
          ))}
        </div>

        <div className="payment-method-section">
          <div className="section-header">
            <label>Payment Method</label>
            <span className="powered-by">
              <FiShield size={12} /> Powered by KoraPay
            </span>
          </div>

          <div className="payment-methods">
            {[
              { id: "debit", icon: <FiCreditCard />, title: "Debit Card", desc: "Instant payment" },
              { id: "bank", icon: <BsBank />, title: "Bank Transfer", desc: "Direct bank payment" },
              { id: "mobile", icon: <FiSmartphone />, title: "Mobile Banking", desc: "USSD or app payment" },
            ].map((method) => (
              <div
                key={method.id}
                className={`payment-card ${paymentMethod === method.id ? "selected" : ""}`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="payment-icon">{method.icon}</div>
                <div className="payment-info">
                  <h4>{method.title}</h4>
                  <p>{method.desc}</p>
                </div>
                <div className="radio">
                  <div className={`radio-circle ${paymentMethod === method.id ? "checked" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="savings-progress-card">
          <div className="progress-header">
            <span>Savings Progress</span>
            <span className="progress-percent">{progressPercent}%</span>
          </div>
          <div className="progress-amounts">
            <span className="current">
              {formatCurrency(walletData.currentBalance)} / {formatCurrency(walletData.savingsGoal)}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="remaining">
            Remaining: {formatCurrency(walletData.savingsGoal - walletData.currentBalance)}
          </p>
        </div>

        <button type="submit" className="continue-btn">
          Continue to Payment <HiOutlineArrowRight />
        </button>
        <p className="redirect-text">You will be redirected to KoraPay secure payment gateway</p>
      </form>
    </section>
  );
};

export default FundWalletForm;
