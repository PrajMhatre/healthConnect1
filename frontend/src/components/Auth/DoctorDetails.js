import React, { useState, useEffect } from "react";
import { useNavigate , useLocation  } from "react-router-dom";
import "./DoctorDetails.css";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import HeaderBar from "../Common/HeaderBar";

const DoctorDetails = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // Retrieve stored email and username from localStorage
  // const storedEmail = localStorage.getItem("email") || "";
  // const storedUsername = localStorage.getItem("username") || "";
  const { username, email } = location.state || {};

  const [doctorData, setDoctorData] = useState({
    dr_name: username, 
    email: email, 
    experience: "",
    location: "",
    speciality: "",
    contact_info: "",
    consultation_fee: "",
    ratings: 4, // Default rating
    availability_status_9_to_12: "",
    availability_status_2_to_5: "",
    availability_status_6_to_9: "",
    google_map: "", // NEW FIELD
    description: "", // NEW FIELD
    clinic_name: "", // NEW FIELD
  });

  useEffect(() => {
    setDoctorData((prev) => ({
      ...prev,
      dr_name: username,
      email: email,
    }));
  }, [username, email]);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorData.dr_name || !doctorData.email || !doctorData.experience || 
        !doctorData.location || !doctorData.speciality || !doctorData.contact_info || 
        !doctorData.consultation_fee || !doctorData.availability_status_9_to_12 || 
        !doctorData.availability_status_2_to_5 || !doctorData.availability_status_6_to_9 ||
        !doctorData.google_map || !doctorData.description || !doctorData.clinic_name) {
      alert("All fields are required!");
      return;
    }

    console.log("Submitting Doctor Data:", doctorData);

    try {
      const response = await fetch("http://localhost:4000/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        console.error("Server error:", data);
        alert(data.message || "Error saving details.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <HeaderBar />
      <Navbar />
      <div className="doctor-details-container">
        <h2>Complete Your Doctor Profile</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="dr_name" value={doctorData.dr_name} placeholder="Doctor Name" readOnly />
          <input type="email" name="email" value={doctorData.email} placeholder="Email" readOnly />
          <input type="text" name="experience" placeholder="Experience (years)" value={doctorData.experience} onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" value={doctorData.location} onChange={handleChange} required />
          <input type="text" name="speciality" placeholder="Speciality" value={doctorData.speciality} onChange={handleChange} required />
          <input type="text" name="contact_info" placeholder="Contact Info" value={doctorData.contact_info} onChange={handleChange} required />
          
          {/* Availability Fields */}
          <input type="text" name="availability_status_9_to_12" placeholder="Availability (9 AM - 12 PM)" value={doctorData.availability_status_9_to_12} onChange={handleChange} required />
          <input type="text" name="availability_status_2_to_5" placeholder="Availability (2 PM - 5 PM)" value={doctorData.availability_status_2_to_5} onChange={handleChange} required />
          <input type="text" name="availability_status_6_to_9" placeholder="Availability (6 PM - 9 PM)" value={doctorData.availability_status_6_to_9} onChange={handleChange} required />

          <input type="number" name="consultation_fee" placeholder="Consultation Fee ($)" value={doctorData.consultation_fee} onChange={handleChange} required />

          {/* NEW FIELDS */}
          <input type="text" name="google_map" placeholder="Google Map Link" value={doctorData.google_map} onChange={handleChange} required />
          <input type="text" name="clinic_name" placeholder="Clinic Name" value={doctorData.clinic_name} onChange={handleChange} required />
          <textarea name="description" placeholder="Doctor's Description" value={doctorData.description} onChange={handleChange} required></textarea>

          <button type="submit">Submit Details</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDetails;
