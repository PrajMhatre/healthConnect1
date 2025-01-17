import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="overlay"></div>
      <div className="hero-content">
        <h4 className="tagline">YOUR HEALTH, OUR PRIORITY</h4>
        <h1 className="title">PREDICT DISEASES. FIND DOCTORS.</h1>
        <p className="description">
          HealthConnect empowers you to take charge of your health by predicting potential diseases and connecting you with trusted doctors near you.
        </p>
        {/* Link component wrapping the button */}
        <Link to="/disease-prediction">
          <button className="contact-btn">GET STARTED</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
