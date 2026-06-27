
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import "./Css/TransactionHistory.css";

const TransactionHistory = ({ transactions }) => {
  const formatCurrency = (num) => `₦${Number(num).toLocaleString()}`;


  const getStatusStyle = (status) => {
    const statusLower = status?.toLowerCase();
    
    if (statusLower === 'failed') {
      return {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block',
        textTransform: 'capitalize'
      };
    }
    
    if (statusLower === 'processing' || statusLower === 'pending') {
      return {
        backgroundColor: '#fef9c3',
        color: '#854d0e',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block',
        textTransform: 'capitalize'
      };
    }
    
    if (statusLower === 'successful' || statusLower === 'success' || statusLower === 'completed') {
      return {
        backgroundColor: '#dcfce7',
        color: '#166534',
        padding: '0.25rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block',
        textTransform: 'capitalize'
      };
    }
    
  
    return {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500',
      display: 'inline-block',
      textTransform: 'capitalize'
    };
  };

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
                    <span style={getStatusStyle(tx.status)}>
                      {tx.status}
                    </span>
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