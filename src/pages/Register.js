import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import AuthForm from '../components/AuthForm';
import { registerUser } from '../services/apiService';
import './Register.css';

const Register = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to access navigation functionality

  const handleRegister = async (formData) => {
    try {
      const newUser = await registerUser(formData);
      console.log('User registered successfully:', newUser);
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/'); // Redirect to the homepage after successful registration
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <AuthForm onSubmit={handleRegister} isRegister={true} />
      <p className="login-link-container">Already registered? <Link to="/login" className="login-link">Login here</Link></p>
    </div>
  );
};

export default Register;


