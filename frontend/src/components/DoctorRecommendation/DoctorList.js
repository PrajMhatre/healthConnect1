import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import HeaderBar from "../Common/HeaderBar";
import "./DoctorList.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 3;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("http://localhost:4000/api/doctors/filter");

        if (response.status === 200) {
          setDoctors(response.data);
          console.log("Fetched Doctors:", response.data);
        } else {
          setError("Failed to fetch doctors. Please try again.");
        }
      } catch (err) {
        console.error("🚨 Error fetching doctors:", err);
        setError("Error fetching doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Retrieve stored user data
  const userId = localStorage.getItem("userId") || "Unknown";
  const username = localStorage.getItem("username") || "Guest";

  // Calculate the current doctors to show based on pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Function to handle booking
  const handleBooking = async (doctor) => {
    const bookingData = {
      userId,
      username,
      Dr_Id: doctor.Dr_Id || doctor.id,
      Dr_Name: doctor.Dr_Name,
    };
  
    console.log("🔍 Sending Booking Request:", bookingData);
  
    try {
      const response = await axios.put("http://localhost:4000/api/update-doctor", bookingData);
  
      console.log("✅ API Response:", response);
      console.log("📄 API Response Data:", response.data);
  
      if (response.status === 200) {
        alert(`Successfully booked an appointment with Dr. ${doctor.Dr_Name}`);
      } else {
        alert(`Booking failed: ${response.data.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("🚨 Error updating booking:", error);
      alert("Error updating booking. Please try again.");
    }
  };
  
  

  // Function to render "Book" buttons based on availability
  const renderBookButtons = (doctor) => {
    const timeSlots = [
      { key: "Availability_Status_9_to_12", label: "9 AM - 12 PM" },
      { key: "Availability_Status_2_to_5", label: "2 PM - 5 PM" },
      { key: "Availability_Status_6_to_9", label: "6 PM - 9 PM" },
    ];

    return timeSlots.map((slot) => {
      if (doctor[slot.key] === "AVAILABLE") {
        return (
          <button
            key={slot.key}
            className="book-button"
            onClick={() => handleBooking(doctor)}
          >
            Book {slot.label}
          </button>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <HeaderBar />
      <Navbar />
      <div className="doctor-list-container">
        <h2>Doctor List</h2>
        {loading && <p>Loading doctors...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && currentDoctors.length > 0 ? (
          <div className="doctor-cards">
            {currentDoctors.map((doctor, index) => (
              <div key={index} className="doctor-card">
                {Object.entries(doctor).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key.replace(/_/g, " ")}:</strong> {value}
                  </p>
                ))}
                <div className="book-buttons-container">
                  {renderBookButtons(doctor)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && <p>No doctors found.</p>
        )}

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button 
            onClick={() => setCurrentPage(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)} 
            disabled={indexOfLastDoctor >= doctors.length}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorList;
