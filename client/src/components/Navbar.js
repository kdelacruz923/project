import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Design.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [isAtCollection, setIsAtCollection] = useState(false);

  const handleLogout = async () => {
    await onLogout();
    navigate('/');
  };

  const scrollToCollection = () => {
    navigate('/');
    setTimeout(() => {
      const collectionElement = document.getElementById('our-collection');
      if (collectionElement) {
        collectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const checkIfAtCollection = () => {
    const collectionElement = document.getElementById('our-collection');
    if (collectionElement) {
      const rect = collectionElement.getBoundingClientRect();
      setIsAtCollection(rect.top >= 0 && rect.bottom <= window.innerHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkIfAtCollection);
    return () => window.removeEventListener('scroll', checkIfAtCollection);
  }, []);

  useEffect(() => {
    if (window.location.pathname === '/' && window.location.hash === '#our-collection') {
      scrollToCollection();
    }
  }, []);

  return (
    <nav className="navbar">
      <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <NavLink to="/userhomepage" className={({ isActive }) => isActive ? "active-link" : ""}>Books</NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? "active-link" : ""}>Cart</NavLink>
            <NavLink to="/my-profile" className={({ isActive }) => isActive ? "active-link" : ""}>My Profile</NavLink>
            <button onClick={handleLogout} className="logout-button">Sign Out</button>
          </>
        ) : (
          <>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
            <div onClick={scrollToCollection} className={`navbar-link ${isAtCollection ? 'active-link' : ''}`}>Books</div>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "active-link" : ""}>Register</NavLink>
            <NavLink to="/signin" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;