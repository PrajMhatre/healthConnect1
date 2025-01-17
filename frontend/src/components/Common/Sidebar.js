import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <button className="close-btn" onClick={toggleSidebar}>✖</button>
      <ul className="sidebar-links">
        <li><a href="#home" onClick={toggleSidebar}>Home</a></li>
        <li><a href="#diseasePrediction" onClick={toggleSidebar}>Disease Prediction</a></li>
        <li><a href="#doctorRecommendation" onClick={toggleSidebar}>Doctor Recommendations</a></li>
        <li><a href="#appointments" onClick={toggleSidebar}>Appointments</a></li>
        <li><a href="#contact" onClick={toggleSidebar}>Contact</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
