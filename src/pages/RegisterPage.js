import React, { useState } from 'react';
import './RegisterPage.css'; // Assuming you have specific styles for the register page
import Register from '../components/Authentication/Register';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (userExists) {
      toast.error('Email already exists');
      return;
    }

    const newUser = {
      id: Date.now(),
      username: name,
      email,
      password,
      balance:10000,
      currency: 'USD',
      isActive:true,
      transactionHistory:[],
      role:users?.length > 0 ? 'user' : 'admin',
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('Registration successful! Please log in.');
    navigate('/');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <Register 
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword} 
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleSubmit}/>
        <p>
          Already have an account? <a href="/">Login here</a>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
