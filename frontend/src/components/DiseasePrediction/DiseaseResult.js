import React from 'react';
import { useLocation, Link } from "react-router-dom";  // Import Link for routing
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import HeaderBar from "../Common/HeaderBar";
import './DiseaseResult.css';

const DiseaseResult = () => {
  const location = useLocation();
  const { diseaseName } = location.state || { diseaseName: "Unknown Disease" }; // Default value if no state is passed

  return (
    <div>
      <HeaderBar/>
      <Navbar/>
    <div className="disease-result-container">
      <h2 className="result-title">Disease Prediction Result</h2>
      <div className="result-content">
        <p className="result-text">
          Based on the analysis, the patient is diagnosed with <strong>{diseaseName}</strong>.
        </p>
      </div>
      {/* Link component wrapping the button */}
      <Link to="/userPreferences">
      <button className="doctor-search-btn" >
        Search Doctors
      </button>
      </Link>
    </div>
    <Footer/>
    </div>
  );
};

export default DiseaseResult;
