import React, { useState } from 'react';
import useSignup from '../hooks/useSignup.js';
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const containerStyles = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    width: '360px',
    margin: '100px auto',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  const inputStyles = {
    margin: '10px 0',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s'
  };

  const inputFocusStyles = {
    ...inputStyles,
    borderColor: '#007BFF'
  };

  const buttonStyles = {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '20px',
    transition: 'background-color 0.3s'
  };

  const buttonHoverStyles = {
    ...buttonStyles,
    backgroundColor: '#0056b3'
  };

  const linkStyles = {
    color: '#007BFF',
    marginTop: '20px',
    textDecoration: 'none',
    fontSize: '14px'
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useSignup();
  const [inputFocused, setInputFocused] = useState(null);
  const [buttonHovered, setButtonHovered] = useState(false);

  const handleSubmit = () => {
    const validation = true;
    if (validation) {
      signup({ name, email, password });
      navigate(`/login?email=${email}`);
    } else {
      console.log('Signup failed');
    }
  };

  return (
    <div style={containerStyles}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter username"
        style={inputFocused === 'name' ? inputFocusStyles : inputStyles}
        value={name}
        onFocus={() => setInputFocused('name')}
        onBlur={() => setInputFocused(null)}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter email"
        style={inputFocused === 'email' ? inputFocusStyles : inputStyles}
        value={email}
        onFocus={() => setInputFocused('email')}
        onBlur={() => setInputFocused(null)}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        style={inputFocused === 'password' ? inputFocusStyles : inputStyles}
        value={password}
        onFocus={() => setInputFocused('password')}
        onBlur={() => setInputFocused(null)}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        style={buttonHovered ? buttonHoverStyles : buttonStyles}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      >
        Sign Up
      </button>
      <Link to="/login" style={linkStyles}>
        Already have an account? Sign In
      </Link>
    </div>
  );
};

export default SignupPage;
