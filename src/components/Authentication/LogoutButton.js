// src/components/LogoutButton.js
import React from 'react';
import '../../pages/DashboardPage.css';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/';
  };

  return (
    <div className="logout-button">
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default LogoutButton;
