import React from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import "../AddFundCom/Css/RecentTransactions.css";

const RecentTransactions = ({ transactions }) => {
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;

  return (
    <section className="transactions-card">
      <h3>Recent Transactions</h3>
      <div className="transactions-list">
        {transactions.length === 0 ? (
          <p style={{ textAlign: "center", padding: "1rem", color: "#6b7280" }}>
            No recent transactions yet.
          </p>
        ) : (
          transactions.map((tx, idx) => (
            <div key={idx} className="transaction-item">
              <div className="tx-icon">
                <BsGraphUpArrow />
              </div>
              <div className="tx-info">
                <h4>{formatCurrency(tx.amount)}</h4>
                <p>{tx.method} • {tx.time}</p>
              </div>
              <div className="tx-status">
                <FiCheck /> {tx.status}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentTransactions;
