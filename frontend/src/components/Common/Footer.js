import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ABOUT HEALTHCONNECT</h4>
          <p>Connecting patients with healthcare providers for better care and well-being.</p>
        </div>

        {/* CONTACT INFORMATION Section */}
        <div className="footer-section">
          <h4>CONTACT INFORMATION</h4>
          <p>Phone: +91-9876543210</p>
          <hr className="thin-line" />
          <p>Mail: <a href="mailto:support@healthconnect.com">support@healthconnect.com</a></p>
          <hr className="thin-line" />
          <p>Address: 123 Wellness Street, HealthCity, India</p>
        </div>

        {/* USEFUL LINKS Section */}
        <div className="footer-section">
          <h4>USEFUL LINKS</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <hr className="thin-line" />
            <li><a href="#services">Our Services</a></li>
            <hr className="thin-line" />
            <li><a href="#blog">Health Blog</a></li>
            <hr className="thin-line" />
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* QUICK LINKS Section */}
        <div className="footer-section">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="#appointments">Book Appointment</a></li>
            <hr className="thin-line" />
            <li><a href="#consultation">Online Consultation</a></li>
            <hr className="thin-line" />
            <li><a href="#doctors">Find Doctors</a></li>
            <hr className="thin-line" />
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">

        <div className="copyright">
          <p>Copyright © 2024 HealthConnect. All rights reserved.</p>
        </div>

        <div className="footer-logo">
          <img src={require("../../assets/logo.jpg")} alt="Logo" className="logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
