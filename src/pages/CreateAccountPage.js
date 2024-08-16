// src/pages/ManageAccountsPage.js
import React, { useState } from 'react';
import './CreateAccountPage.css';
import AccountCreationForm from '../components/Dashboard/AccountCreationForm';

const CreateAccountPage = ({ isAdmin,handleCreateAccount,onCancel }) => {


  return (
    <div className="create-accounts-page">
      
      {isAdmin && (
        <AccountCreationForm onCreate={handleCreateAccount}
         isAdmin={isAdmin} onCancel={onCancel} />
      )}
     
    </div>
  );
};

export default CreateAccountPage;
