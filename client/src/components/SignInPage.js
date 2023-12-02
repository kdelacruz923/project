import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Design.css';

const SignInPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      onLoginSuccess(); // Set the authentication state
      navigate('/UserHomePage');
    } catch (error) {
      if (error.response) {
        alert('Login failed: ' + error.response.data.error); // Display an alert or set an error state
      } else {
        alert('Login failed: ' + error.message);
      }
      // Error handling logic
      if (error.response) {
        console.error('Error response', error.response.data);
      } else if (error.request) {
        console.error('Error request', error.request);
      } else {
        console.error('Error', error.message);
      } 
    }
  };
  
  

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="auth-form">
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Login</button>
            <p className="signup-link">
              Do not have an account? <Link to="/signup">Register</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;