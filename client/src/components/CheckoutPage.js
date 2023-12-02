import React from 'react';
import './Design.css';

const CheckoutPage = ({ cartItems, onRemoveFromCart, onUpdateQuantity, totalCartPrice }) => {
  const calculateTotalPrice = (item) => {
    return (item.price || 0) * (item.quantity || 0);
  };

  const handleRemoveFromCart = (item) => {
    onRemoveFromCart(item);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <div className="checkout-item">
              <div>
                <span className="item-title">Title: {item.title}</span><br />
                <span className="item-price">Price: ${item.price.toFixed(2)}</span>
              </div>
              <div className="item-details">
                <span>Quantity: {item.quantity}</span> <br />
                <button onClick={() => onUpdateQuantity(item, item.quantity + 1)}>
                  +   
                </button>
                <button
                  onClick={() => {
                    const newQuantity = Math.max(0, item.quantity - 1);
                    onUpdateQuantity(item, newQuantity);
                  }}
                >
                  -
                </button>
                <br />
                <button onClick={() => handleRemoveFromCart(item)}>Remove from Cart</button>
              </div>
              <div className="total-price">
                <span>Total: ${calculateTotalPrice(item).toFixed(2)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-cart-price">
        <h3>Total Cart Price: ${totalCartPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CheckoutPage;
