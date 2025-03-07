import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import HeaderBar from '../Common/HeaderBar';

const DoctorProfile = () => {
    const [doctorData, setDoctorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isStored, setIsStored] = useState(false); // Prevents duplicate API calls

    useEffect(() => {
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        const email = localStorage.getItem("email");

        if (!role || !username || !userId || !email) {
            console.error("Doctor information missing:", { role, username, userId, email });
            setError("Doctor information not found.");
            setLoading(false);
            return;
        }

        if (!isStored) {  // Prevents duplicate API calls
            setIsStored(true);

            axios.post("http://localhost:4000/api/store-doctor-data", { role, username, userId, email })
                .then(() => {
                    return axios.get("http://localhost:4000/api/fetch-doctor-by-username");
                })
                .then(response => {
                    setDoctorData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch doctor data:", error);
                    setError("Failed to fetch doctor data.");
                    setLoading(false);
                });
        }
    }, [isStored]); // Dependency ensures it only runs once

    if (loading) return <p>Loading doctor data...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <HeaderBar />
            <Navbar />
            <div>
                <h2>Doctor Profile</h2>
                <p><strong>Doctor Name:</strong> {doctorData.Dr_Name}</p>
                <p><strong>Experience:</strong> {doctorData.Experience} years</p>
                <p><strong>Location:</strong> {doctorData.Location}</p>
                <p><strong>Speciality:</strong> {doctorData.Speciality}</p>
                <p><strong>Contact Info:</strong> {doctorData.Contact_Info || "N/A"}</p>
                <p><strong>Ratings:</strong> {doctorData.Ratings || "N/A"}</p>
                <p><strong>Consultation Fee:</strong> ₹{doctorData.Consultation_Fee || "N/A"}</p>
                <p><strong>Google Map:</strong> {doctorData.Google_Map || "N/A"}</p>
                <p><strong>Availability 9 AM - 12 PM:</strong> {doctorData.Availability_Status_9_to_12 || "N/A"}</p>
                <p><strong>Availability 2 PM - 5 PM:</strong> {doctorData.Availability_Status_2_to_5 || "N/A"}</p>
                <p><strong>Availability 6 PM - 9 PM:</strong> {doctorData.Availability_Status_6_to_9 || "N/A"}</p>
                <p><strong>Description:</strong> {doctorData.Description || "N/A"}</p>
                <p><strong>Clinic Name:</strong> {doctorData.Clinic_Name || "N/A"}</p>
            </div>
            <Footer />
        </div>
    );
};

export default DoctorProfile;
