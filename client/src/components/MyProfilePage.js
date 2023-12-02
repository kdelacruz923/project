import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './Design.css';

const MyProfilePage = ({ onAccountDeletion }) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [originalUser, setOriginalUser] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUser(response.data);
        setOriginalUser(response.data); // Store the original data for comparison
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedData = {};

    // Check what has changed and only send those fields
    if (user.name !== originalUser.name) {
      updatedData.name = user.name;
    }
    if (user.email !== originalUser.email) {
      updatedData.email = user.email;
    }
    if (user.password) { // Assuming empty password won't be sent
      updatedData.password = user.password;
    }

    try {
      await axios.put(`http://localhost:3000/api/users/${userId}`, updatedData);
      alert('User was updated successfully.');
      setOriginalUser({ ...originalUser, ...updatedData }); // Update original user data
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${userId}`);
        alert('User was deleted successfully!');
        onAccountDeletion(); // Call the function passed as prop
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="auth-form">
          <h1 align='center'>My Profile</h1>
          <form onSubmit={handleUpdate}>
            <label>Name:</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} />
            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} />
            <label>New Password:</label>
            <input type="password" name="password" value={user.password} onChange={handleChange} />
            <button type="submit" className="form-button">Update Profile</button>
          </form>
          <hr className="form-divider" />
          <button onClick={handleDelete} className="form-button delete-button">Delete Account</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfilePage; 