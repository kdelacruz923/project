import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Design.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/', {
        name: formData.username, // Make sure the field names match with your backend
        email: formData.email,
        password: formData.password
      });
      if (response.status === 201) {
        setMessage('Registration successful!');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input 
              type="text" 
              name="username"
              value={formData.username} 
              onChange={handleChange} 
              required
            />
            <label>Email:</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required
            />
            <label>Password:</label>
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              required
            />
            <label>Confirm Password:</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
            <p className="signin-link">
              Already have an account? <Link to="/signin">Login</Link>
            </p>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUpPage;