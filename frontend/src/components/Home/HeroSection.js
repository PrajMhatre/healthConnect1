import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token"); // Check if the user is logged in
    if (token) {
      navigate("/disease-prediction"); // Redirect to disease form if logged in
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h4 className="tagline">YOUR HEALTH, OUR PRIORITY</h4>
        <h1 className="title">PREDICT DISEASES. FIND DOCTORS.</h1>
        <p className="description">
          HealthConnect empowers you to take charge of your health by predicting potential diseases and connecting you with trusted doctors near you.
        </p>
        {/* Button calls the function instead of using Link */}
        <button className="contact-btn" onClick={handleGetStarted}>GET STARTED</button>
      </div>
    </div>
  );
};

export default HeroSection;
