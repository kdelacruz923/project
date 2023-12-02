import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import AboutUs from "./components/AboutUs";
import UserHomePage from "./components/UserHomePage";
import MyProfilePage from "./components/MyProfilePage";
import CartPage from "./components/CartPage";
import './components/Design.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/signout');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAccountDeletion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  const onUpdateQuantity = (item, newQuantity) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);
  };

  const onRemoveFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
  };

  const totalCartPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/userhomepage" element={<UserHomePage isAuthenticated={isAuthenticated} setCartItems={setCartItems} />} />
        <Route path="/my-profile" element={isAuthenticated ? <MyProfilePage onAccountDeletion={handleAccountDeletion} /> : <HomePage />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={onUpdateQuantity} onRemoveFromCart={onRemoveFromCart} totalCartPrice={totalCartPrice}/>} />
      </Routes>
    </Router>
  );
}

export default App;
