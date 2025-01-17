import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
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
            <Link to="/disease-prediction" className="navbar-links">Disease Prediction</Link>
          </li>
          <li className="navbar-item">
            <Link to="/doctor-recommendation" className="navbar-links">Doctor Recommendations</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login" className="navbar-links">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
