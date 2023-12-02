import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import BookCollection from './BookCollection';
import Footer from './Footer';
import './Design.css';

const UserHomePage = ({ isAuthenticated, setCartItems }) => {
  const [userData, setUserData] = useState({});
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId'); 
  
      if (!token || !userId) {
        console.log('No token or user ID found');
        // Redirect to login page or handle appropriately
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        setUserData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error appropriately
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };
  
    fetchUserData();
    fetchBooks();
  }, []);
  
  const handleAddToCart = (book) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.id === book.id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...book, quantity: 1 }];
      }
    });
    alert(`Added ${book.title} to the cart`);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h2 className="welcome-message">Welcome, {userData.name || 'User'}!</h2>
        <h3 className="collection-title">Our Collection</h3>
        <BookCollection isAuthenticated={isAuthenticated} onAddToCart={handleAddToCart} books={books} />
      </div>
      <Footer />
    </div>
  );
};

export default UserHomePage;
