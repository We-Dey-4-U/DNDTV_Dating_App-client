import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/apiService';
import './Login.css';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await loginUser(formData); // Pass email and password directly
      console.log('Login successful:', response);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <AuthForm onSubmit={handleLogin} isRegister={false} />
      <p className="link-container">Not registered yet? <Link to="/register" className="register-link">Register here</Link></p>
    </div>
  );
};

export default Login;