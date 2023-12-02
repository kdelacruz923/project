import React from 'react';
import './Design.css';
import Footer from './Footer';

const CartPage = ({ cartItems, onRemoveFromCart, onUpdateQuantity, totalCartPrice }) => {
  const calculateTotalPrice = (item) => {
    return (item.price || 0) * (item.quantity || 0);
  };

  const handleRemoveFromCart = (item) => {
    onRemoveFromCart(item);
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 align="center" style={{fontSize: '40px'}}>Cart</h1>
        {cartItems.length > 0 ? (
          <div>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="checkout-item">
                    <div>
                      <span className="item-title">Title: {item.title}</span><br />
                      <span className="item-price">Price: ${formatPrice(item.price)}</span>
                    </div>
                    <div className="item-details">
                      <button onClick={() => onUpdateQuantity(item, item.quantity + 1)}>
                        +   
                      </button>
                      <span style={{ marginRight: '30px', marginLeft: '30px'}}>{item.quantity}</span>
                      <button style={{ marginRight: '10px'}} onClick={() => onUpdateQuantity(item, Math.max(1, item.quantity - 1))}>
                        -
                      </button>
                      <br />
                      <button onClick={() => handleRemoveFromCart(item)}>Remove Book</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total-cart-price">
              <h2>Total Price: ${formatPrice(totalCartPrice)}</h2>
            </div>
          </div>
        ) : (
          <div className="empty-cart-message">
            <p align="center" style={{fontSize: '23px'}}>No items added.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
