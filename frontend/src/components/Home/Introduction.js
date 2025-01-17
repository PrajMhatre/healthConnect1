import React from "react";
import "./Introduction.css"; // Import CSS for styling
import constructionImage from "../../assets/logo.jpg"; // Import the image

const Introduction = () => {
  return (
    <div className="introduction-container">
      <div className="introduction-content">
        {/* Left side: Image */}
        <div className="introduction-image">
          <img
            src={constructionImage}
            alt="Healthcare professionals at work"
          />
        </div>

        {/* Right side: Text Content */}
        <div className="introduction-text">
          <h2>WELCOME TO HEALTHCONNECT</h2>
          <h3>Connecting You to Better Health, Anytime, Anywhere!</h3>
          <p>
            At HealthConnect, we are dedicated to revolutionizing the healthcare experience by providing seamless connections between patients and healthcare professionals. Our platform offers a variety of services, including expert consultations, personalized health plans, and predictive health insights, all at your fingertips.
          </p>
          <p>
            With years of experience in the healthcare industry, our mission is to empower individuals to take control of their health and well-being with the help of our innovative and user-friendly platform.
          </p>

          {/* Boxed list with tick mark icon */}
          <div className="quality-list-container">
            <ul className="quality-list">
              <li><span className="tick-icon">✔</span>Access to Expert Healthcare Professionals</li>
              <li><span className="tick-icon">✔</span>Personalized Health Plans Based on Your Needs</li>
              <li><span className="tick-icon">✔</span>Advanced Predictive Health Insights</li>
              <li><span className="tick-icon">✔</span>24/7 Access to Healthcare Resources</li>
            </ul>
          </div>

          {/* Action Button */}
          <button className="more-btn">LEARN MORE ABOUT US</button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
