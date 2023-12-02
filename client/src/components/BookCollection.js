import React from 'react';
import './Design.css';

const BookCollection = ({ isAuthenticated, onAddToCart, books = [] }) => {
  // Create an array from 1 to 6
  const imageNumbers = [1, 2, 3, 4, 5, 6];

  return (
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
              <img src={`/images/book${imageNumbers[index]}.jpg`} alt={book.title} />
              {isAuthenticated && (
                <div className="item-details">
                  <p>$ {book.price}</p>
                  <button onClick={() => onAddToCart(book)}>Add to Cart</button>
                </div>
              )}
            </div>
          </fieldset>
        </div>
      ))}
    </div>
  );
};

export default BookCollection;
