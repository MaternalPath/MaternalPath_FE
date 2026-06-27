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
        {transactions.length === 0 ? (
          <p
            style={{ padding: "1.5rem", textAlign: "center", color: "#6b7280" }}
          >
            No transactions yet.
          </p>
        ) : (
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
                  <td data-label="Date">{tx.date}</td>
                  <td data-label="Type">
                    <span className="tx-type">
                      <FiArrowUpRight /> {tx.type}
                    </span>
                  </td>
                  <td data-label="Description">{tx.desc}</td>
                  <td data-label="Amount" className="amount">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td data-label="Status">
                    <span className="status-badge">{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default TransactionHistory;
