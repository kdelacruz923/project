import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import BookCollection from './BookCollection';
import Footer from './Footer';
import './Design.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="slogan-container">
          <img src="/images/bookshelve.jpg" alt="Background" className="background-image"/>
          <div className="slogan-text">
            <p>"In the end,</p>
            <p>we'll all become stories."</p>
            <p>- Margaret Atwood</p>
          </div>
        </div>
        <h3 className="collection-title" id="our-collection">Our Collection</h3>
        <BookCollection isAuthenticated={false} books={books} />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
