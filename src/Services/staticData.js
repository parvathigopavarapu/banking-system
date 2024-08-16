import { toast } from "react-toastify";
import axios from 'axios';

const API_KEY = 'ab47f8bb85436367e4ff9f0d417b6a61';
const EXCHANGE_API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

// Fetch accounts from local storage
const fetchAccountsFromStorage = () => {
  return JSON.parse(localStorage.getItem('users')) || [];
};

// Function to add a new account and update local storage
export const addStaticAccount = async (newAccount) => {
  return new Promise((resolve, reject) => {
    try {
      const accounts = fetchAccountsFromStorage();
      accounts.push(newAccount);
      localStorage.setItem('users', JSON.stringify(accounts));
      toast.success('Account added successfully');
      resolve(accounts);
    } catch (error) {
      toast.error('Failed to add account, Please check the logs for more info');
      reject(error);
    }
  });
};

// Function to update account balances and transaction history
export const updateAccountBalances = async (recipientAccountNumber, amount, currency) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(EXCHANGE_API_URL);
      const rates = response.data.rates;
      
      const accounts = fetchAccountsFromStorage();
      const recipientIndex = accounts.findIndex(account => account.number === recipientAccountNumber);

      if (recipientIndex === -1) {
        toast.error('Recipient account not found');
        reject(new Error('Recipient account not found'));
        return;
      }

      const recipient = accounts[recipientIndex];
      let convertedAmount = amount;

      if (recipient.currency !== currency) {
        const conversionRate = rates[currency] / rates[recipient.currency];
        convertedAmount = amount * conversionRate * 0.99; // Apply spread
      }

      recipient.balance += convertedAmount;
      recipient.transactionHistory.push({
        id: Date.now(),
        date: new Date().toISOString(),
        type: 'credit',
        amount: convertedAmount,
        originalAmount: amount,
        currency: recipient.currency,
        balance: recipient.balance,
        description: 'Transfer received',
      });

      localStorage.setItem('users', JSON.stringify(accounts));
      // toast.success('Transfer successful');
      resolve({ success: true, message: 'Transfer successful' });
    } catch (error) {
      // toast.error('Failed to perform currency conversion');
      reject(new Error('Failed to perform currency conversion'));
    }
  });
};

// Function to fetch accounts
export const fetchAccounts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fetchAccountsFromStorage());
    }, 500);
  });
};

export const getStaticAccounts = () => fetchAccountsFromStorage();
