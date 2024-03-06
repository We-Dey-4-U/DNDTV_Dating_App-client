import React, { useState } from 'react';

const AuthForm = ({ onSubmit, isRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    birthdate: '',
    location: '',
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await onSubmit(formData); // Submit registration data to backend
    if (response && response.token) {
      // If token is received in response, store it in local storage
      localStorage.setItem('token', response.token);
      // Redirect the user to the profile page or any other desired page
      // Example: window.location.href = '/profile';
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {isRegister && (
        <>
          <label style={styles.label}>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} />
        </>
      )}
      <label style={styles.label}>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
      <label style={styles.label}>Password:</label>
      <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} />
      {isRegister && (
        <>
          <label style={styles.label}>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label style={styles.label}>Birthdate:</label>
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} style={styles.input} />
          <label style={styles.label}>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} style={styles.input} />
          <label style={styles.label}>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} style={styles.input}></textarea>
        </>
      )}
      <button type="submit" style={styles.button}>{isRegister ? 'Register' : 'Login'}</button>
    </form>
  );
};

export default AuthForm;

const styles = {
  form: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};