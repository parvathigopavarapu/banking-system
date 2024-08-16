// src/components/Sidebar.js

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('loggedInUser');
      navigate('/');
    };
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/fund-transfer" activeClassName="active">
              Fund Transfer
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active">
              Settings
            </NavLink>
          </li>

          <li>
            <NavLink to="/" onClick={handleLogout}  activeClassName="active">
             Log Out
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
