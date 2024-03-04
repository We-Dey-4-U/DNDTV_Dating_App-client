// components/Footer.js

import React from 'react';
import './Footer.css'; // Import CSS file for styling
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import Font Awesome icons


const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h3>Contact Us</h3>
        <p>Email: example@example.com</p>
        <p>Phone: +1234567890</p>
      </div>
      <div className="social-media">
        <h3>Follow Us</h3>
        <div className="social-icons">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>
      <p>&copy; 2024 Your Company</p>
      </div>
    </footer>
  );
};

export default Footer;