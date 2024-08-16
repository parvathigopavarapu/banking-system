// src/components/FundTransfer.js
import React, { useState } from 'react';
import '../pages/FundTransfer.css';

const FundTransfer = ({ accounts, onTransfer }) => {
  const [recipientAccount, setRecipientAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!recipientAccount || !amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid recipient account and amount.');
      return;
    }

    setError('');

    onTransfer(recipientAccount, parseFloat(amount), currency);
  };

  return (
    <div className="fund-transfer">
      <h3>Fund Transfer</h3>
      <form onSubmit={handleTransfer}>
        <div className="form-group">
          <label htmlFor="recipient">Recipient Account Number:</label>
          <input
            type="text"
            id="recipient"
            value={recipientAccount}
            onChange={(e) => setRecipientAccount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default FundTransfer;
