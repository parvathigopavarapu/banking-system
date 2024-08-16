// src/components/Header.js

import React from 'react';
import './Header.css';

const Header = ({ bankName, bankAddress }) => {

    const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return (
    <header className="header">
      <div className="header-left">
        <h1>{bankName}</h1>
        <p>{bankAddress}</p>
      </div>
      <div className="header-right">
        <p>Welcome, {user.name}</p>
        <p>{user.role}</p>
      </div>
    </header>
  );
};

export default Header;
