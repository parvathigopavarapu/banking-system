
import React, { useState } from 'react';
import './AccountCreationForm.css';

const AccountCreationForm = ({ onCreate, isAdmin,onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [currency] = useState('USD'); // Default currency as USD

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) return; // Only allow Admin to create accounts

    const accountNumber = `ACCT-${Date.now()}`; 
    if (!firstName || !lastName || !dob || !address || !accountNumber || !currency) {
        console.error('Missing required fields');
        return;
      }
    
      // Create a new account object
      const newAccount = {
        id: `${Date.now()}`, 
        firstName,
        lastName,
        dob,
        address,
        number: accountNumber, 
        balance: 10000, 
        currency, 
        isActive: true,
        role:'user',
        transactionHistory: [] 
      };
    onCreate(newAccount);

    setFirstName('');
    setLastName('');
    setDob('');
    setAddress('');
  };

  return (
  
    <div className="account-creation-form">
      <h3>Create New Savings Account</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
        <button type="" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  
  );
};

export default AccountCreationForm;
