import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import HeaderBar from "../Common/HeaderBar";
import "./UserPreferences.css";

const UserPreferences = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    location: "",
    experience: "",
    speciality: "",
    consultationFee: "",
    availabilityStatus: "",
    ratings: "", // New field for Ratings
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPreferences({
      ...preferences,
      [name]: name === "ratings" ? parseFloat(value) || "" : value, // Ensure ratings is a float
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (Object.values(preferences).some((value) => value === "")) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      console.log("📡 Sending Preferences to Backend:", preferences);
      
      // Send preferences to backend
      await axios.post("http://localhost:4000/api/filter", preferences);  

      // Navigate to DoctorList (DoctorList will fetch from backend)
      navigate("/doctor-list");
    } catch (error) {
      console.error("❌ Error sending preferences:", error);
      alert("Failed to send preferences. Please try again.");
    }
  };

  return (
    <div>
      <HeaderBar />
      <Navbar />

      <div className="user-preferences-container">
        <h2>Select Your Preferences</h2>

        <form onSubmit={handleSubmit} className="preferences-form">
          <label>Location:</label>
          <select name="location" value={preferences.location} onChange={handleChange}>
            <option value="">Select Location</option>
            <option value="pen">Pen</option>
            <option value="kharghar">Kharghar</option>
            <option value="panvel">Panvel</option>
            <option value="chicago">Chicago</option>
            <option value="kalyan">Kalyan</option>
          </select>

          <label>Minimum Experience (Years):</label>
          <input type="number" name="experience" value={preferences.experience} onChange={handleChange} />

          <label>Speciality:</label>
          <select name="speciality" value={preferences.speciality} onChange={handleChange}>
            <option value="">Select Speciality</option>
            <option value="heart">Heart</option>
            <option value="neurologist">Neurologist</option>
            <option value="dermatologist">Dermatologist</option>
          </select>

          <label>Consultation Fee (INR):</label>
          <input type="number" name="consultationFee" value={preferences.consultationFee} onChange={handleChange} />

          <label>Availability Status:</label>
          <select name="availabilityStatus" value={preferences.availabilityStatus} onChange={handleChange}>
            <option value="">Select Availability</option>
            <option value="9_to_12">9 AM - 12 PM</option>
            <option value="2_to_5">2 PM - 5 PM</option>
            <option value="6_to_9">6 PM - 9 PM</option>
          </select>

          {/* 🔹 New Ratings Field (Floating Value) */}
          <label>Minimum Ratings (1.0 - 5.0):</label>
          <input 
            type="number" 
            name="ratings" 
            value={preferences.ratings} 
            step="0.1" // Allows decimal values 
            min="1.0" 
            max="5.0" 
            onChange={handleChange} 
          />

          <button type="submit" className="submit-btn">Find Doctors</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default UserPreferences;
