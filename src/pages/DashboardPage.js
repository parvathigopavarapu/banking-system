import React, { useState,useEffect } from 'react';
import AccountList from '../components/Dashboard/AccountList';
// import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import CreateAccountPage from './CreateAccountPage';
import FundTransfer from './FundTransferPage';
import { addStaticAccount, fetchAccounts, updateAccountBalances } from '../Services/staticData';
// import { fetchAccounts, updateAccountBalances } from '../services/accountService'; 

const DashboardPage = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const isAdmin = user.role === 'admin';
  const [isCreateAccount,setIsCreateForm] =useState(false)
  const [fundTransfer,setFundTransfer] =useState(false)
  const [accounts, setAccounts] = useState([]
   );
  useEffect(() => {
    const loadAccounts = async () => {
      const data = await fetchAccounts(); // Fetch accounts from API or service
      setAccounts(data);
    };

    loadAccounts();
  }, []);


  const handleOpenAccount =()=>{
    setIsCreateForm(true)
  }
  const handleCreateAccount = async (newAccount)=>{
   await addStaticAccount(newAccount)
    try {
       
        const updatedAccounts = await fetchAccounts(); // Re-fetch accounts to update the UI
      
        setAccounts(updatedAccounts);
      } catch (error) {
        console.error('Error creating account:', error);
      }
      setIsCreateForm(false);
  }


  const handleCloseAccount =() =>{
    setIsCreateForm(false);
  }
  return (
    <div className="dashboard-page">
      <h2>Welcome to Your Dashboard</h2>

      {isAdmin  ? (
        <>
                    
         {!isCreateAccount ? 
         <div className="account-section">
          {accounts?.length > 0 ?
          <>
            <h3>Existing User Accounts</h3>
            <AccountList accounts={accounts} />
            </>
            : <div>No accounts found</div>}

            <button 
            className="open-account-button"
            onClick={() => handleOpenAccount()}
          >
            Open New User Account
          </button>
          </div> :
          <CreateAccountPage 
          isAdmin={isAdmin} 
          handleCreateAccount={handleCreateAccount} 
         onCancel={() => handleCloseAccount()} />}

        
        </>
      ) : (
       null
      )}
      {/* {!fundTransfer ? <button 
            className="open-account-button"
            onClick={()=>setFundTransfer(true)}
          >
            Fund Transfer
          </button> :

    <FundTransfer accounts={accounts} onTransfer={handleTransfer}/> } */}

    </div>
  );
};

export default DashboardPage;
