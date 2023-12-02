import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import CheckoutPage from './CheckoutPage';
import './Design.css';

const ReadBooks = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

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

  const handleAddToCart = (book) => {
    setCart([...cart, { ...book, quantity: 1 }]);
    console.log(`Added ${book.title} to the cart`);
  };

  const updateQuantity = (item, newQuantity) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCart(updatedCart);
  };

  const handleRemoveFromCart = (item) => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
    setCart(updatedCart);
    console.log(`Removed ${item.title} from the cart`);
  };

  const calculateTotalCartPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
  };

  return (
    <div className="page-container">
   
      <div className="content-wrap">
        <div className="book-collection">
          {books.map((book, index) => (
            <div key={book.id} className="book-item">
              <fieldset>
                <legend>
                  <img src="/images/mark.jpg" alt="Mark" />
                </legend>
                <div className="book-info">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  <p>$ {book.price}</p>
                </div>
                <img src={`/images/book${index + 1}.jpg`} alt={book.title} />
                <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
              </fieldset>
            </div>
          ))}
        </div>
        <div className="checkout-container">
          <CheckoutPage
            cartItems={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            totalCartPrice={calculateTotalCartPrice()}
          />
        </div>
      </div>
    
    </div>
  );
};

export default ReadBooks;




