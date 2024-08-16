// src/pages/FundTransferPage.js
import React, { useState, useEffect } from 'react';
// import FundTransfer from '../components/FundTransfer';
// import { fetchAccounts, updateAccountBalances } from '../Services/AccountSercive';
import FundTransfer from '../components/FundTransfer';
import { fetchAccounts, updateAccountBalances } from '../Services/staticData';
import './FundTransfer.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { fetchAccounts, updateAccountBalances } from '../services/accountService'; // Mock functions

const FundTransferPage = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const loadAccounts = async () => {
      const data = await fetchAccounts(); // Fetch accounts from API or service
      setAccounts(data);
    };

    loadAccounts();
  }, []);

  const handleTransfer = async (recipientAccountNumber, amount, currency) => {
    try {
        await updateAccountBalances(recipientAccountNumber, amount, currency);
        const updatedAccounts = await fetchAccounts(); // Re-fetch accounts to update the UI
        setAccounts(updatedAccounts);
        toast.success('Transfer successful');
        navigate('/dashboard')
      } catch (error) {
        toast.error('Failed to perform currency conversion');
        console.error('Transfer failed:', error);
      }
      
  };

  return (
    <div className="fund-transfer-page">
      <h1>Fund Transfer</h1>
      <FundTransfer accounts={accounts} onTransfer={handleTransfer} />
    </div>
  );
};

export default FundTransferPage;
