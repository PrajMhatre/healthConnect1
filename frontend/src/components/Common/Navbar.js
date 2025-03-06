import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [user, setUser] = useState(null); // Stores user details
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('username'); // Assuming 'username' is stored in localStorage
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove auth token
    localStorage.removeItem('username'); // Remove username
    localStorage.removeItem('role'); // Remove role
    setUser(null);
    navigate('/'); // Redirect to home page
  };

  const handleDiseasePrediction = () => {
    const token = localStorage.getItem("token"); // Check if the user is logged in
    if (token) {
      navigate("/disease-prediction"); // Navigate to Disease Prediction if logged in
    } else {
      navigate("/login"); // Navigate to Login if not logged in
    }
  };

  const handleUserPreferences = () => {
    const token = localStorage.getItem("token"); // Check if the user is logged in
    if (token) {
      navigate("/userPreferences"); // Navigate to User Preferences if logged in
    } else {
      navigate("/login"); // Navigate to Login if not logged in
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">HealthConnect</Link>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </div>
        <ul className={`navbar-menu ${isMenuActive ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-links">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/about-us" className="navbar-links">About Us</Link>
          </li>
          <li className="navbar-item">
            <Link to="/blogs" className="navbar-links">Blogs</Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-links">Contact</Link>
          </li>
          <li className="navbar-item">
            <span className="navbar-links" onClick={handleDiseasePrediction} style={{ cursor: "pointer" }}>
              Disease Prediction
            </span>
          </li>
          <li className="navbar-item">
            <span className="navbar-links" onClick={handleUserPreferences} style={{ cursor: "pointer" }}>
              Doctor Recommendations
            </span>
          </li>

          {/* Show Login if no user is logged in */}
          {!user ? (
            <li className="navbar-item">
              <Link to="/login" className="navbar-links">Login</Link>
            </li>
          ) : (
            // Show username, user profile link, and logout button if logged in
            <li className="navbar-item dropdown">
              <span className="navbar-links profile-name">👤 {user}</span>
              <Link to="/user-profile" className="navbar-links">
                <button className="profile-button">Profile</button>
              </Link>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
