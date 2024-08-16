// src/components/Layout.js

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css'; 

const Layout = ({ children, user }) => {
  return (
    <div className="layout-container">
      <Header bankName="MyBank" bankAddress="#204/5, Bank Street, Bangalore, India" user={user} />
      <div className="layout-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
