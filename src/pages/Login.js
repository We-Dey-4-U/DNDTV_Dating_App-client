import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/apiService';
import './Login.css';

const Login = ({ setAuthenticated }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { email, password } = formData;
      const token = await loginUser(email, password);
      if (token) {
        localStorage.setItem('token', token); // Store token in local storage
        setAuthenticated(true); // Update authentication state
        navigate('/'); // Redirect to homepage
      } else {
        setErrorMessage('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Failed to login. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2>DNDTV Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <AuthForm onSubmit={handleLogin} isRegister={false} />
      <p className="link-container">Not registered yet? <Link to="/register" className="register-link">Register here</Link></p>
    </div>
  );
};



export default Login;