import React, { useState } from 'react';
import './HeaderBar.css';
import Sidebar from '../Common/Sidebar';
import logo from '../../assets/logo.jpg'; // Adjust the path to your logo file
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

const HeaderBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className="header-bar">
        <img src={logo} alt="HealthConnect Logo" className="logo" />
        <span className="contact-email">📧 support@healthconnect.com</span>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook-f"></i> {/* Facebook icon */}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter"></i> {/* Twitter icon */}
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i> {/* Instagram icon */}
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-youtube"></i> {/* YouTube icon */}
          </a>
          
        </div>
        <button className="appointment-btn">Book an Appointment</button>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default HeaderBar;
