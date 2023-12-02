import React from 'react';
import './Design.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <img src="/images/team.jpg" alt="Your Image" className="footer-image" />
      <p><b>Web Wonders</b></p>
      <Link to="/about-us" className="about-us-link">Explore more About Us</Link>
      <p>&#169; 2023 Web Wonders - Centennial College - COMP 229 - Sec. 012 - Group Project - Book Store Website</p>
    </footer>
  );
};

export default Footer;