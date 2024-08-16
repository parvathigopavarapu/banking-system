import React, { useState } from 'react';
import './AccountList.css';
import TransactionHistory from './TransactionHistory'; 

const AccountList = ({ accounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null); 

  const filteredAccounts = accounts.filter(account => {
    const term = searchTerm.trim();
    const balance = parseFloat(account.balance);

    const termIsNumber = !isNaN(term) && !isNaN(balance);

    return (
      (account?.firstName?.toLowerCase()?.includes(term.toLowerCase()) ||
      account?.lastName?.toLowerCase()?.includes(term.toLowerCase()) ||
      account?.number?.toLowerCase()?.includes(term.toLowerCase()) || 
      (termIsNumber && balance === term))
    );
  });

  const handleRowClick = (account) => {
    setSelectedAccount(account === selectedAccount ? null : account);
  };

  return (
   
    <div className="account-summary">
      
     
      <div className="account-search-filter">
        <input 
          type="text" 
          placeholder="Search accounts..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredAccounts?.length > 0 ? 
     <table className="account-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>DOB</th>
            <th>Account Number</th>
            <th>Balance</th>
            <th>Currency</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map(account => (
            <React.Fragment key={account.id}>
              <tr onClick={() => handleRowClick(account)}>
                <td>{account.firstName} {account.lastName}</td>
                <td>{account.dob}</td>
                <td>{account.number}</td>
                <td>{account.balance}</td>
                <td>{account.currency}</td>
                <td>{account.address}</td>
              </tr>
              {selectedAccount === account && (
                <tr>
                  <td colSpan="6">
                    <TransactionHistory transactions={account.transactionHistory} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
     : <div>No accounts found</div>}
    </div> 
  );
};

export default AccountList;
