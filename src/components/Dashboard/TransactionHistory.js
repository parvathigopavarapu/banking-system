// src/components/TransactionHistory.js
import React from 'react';
import './TransactionHistory.css';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-history">
      <h3>Transaction History</h3>
     {transactions?.length > 0 ? <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Balance</th>
           
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleString()}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount.toFixed(2)}</td>
              <td>{transaction.currency}</td>
              <td>{transaction?.balance?.toFixed(2)}</td>
             
            </tr>
          ))}
        </tbody>
      </table> : <div>No transaction History found</div>}
    </div>
  );
};

export default TransactionHistory;
