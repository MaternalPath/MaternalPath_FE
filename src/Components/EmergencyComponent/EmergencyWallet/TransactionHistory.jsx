import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import "./Css/TransactionHistory.css";

const TransactionHistory = ({ transactions }) => {
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;

  return (
    <section className="transaction-history-card">
      <div className="card-header">
        <h3>Transaction History</h3>
        <button className="view-all-btn">View All</button>
      </div>

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.date}</td>
                <td>
                  <span className="tx-type">
                    <FiArrowUpRight /> {tx.type}
                  </span>
                </td>
                <td>{tx.desc}</td>
                <td className="amount">{formatCurrency(tx.amount)}</td>
                <td>
                  <span className="status-badge">{tx.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionHistory;
