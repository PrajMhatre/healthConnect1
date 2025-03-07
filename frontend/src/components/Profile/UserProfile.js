import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import HeaderBar from '../Common/HeaderBar';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");
        const email = localStorage.getItem("email"); // Check if email is null or undefined
    
        if (!role || !username || !userId || !email) {
            console.error("User information missing:", { role, username, userId, email });
            setError("User information not found.");
            setLoading(false);
            return;
        }
    
        // Step 1: Send user data first
        axios.post("http://localhost:4000/api/store-user-data", { role, username, userId, email })
            .then(() => {
                // Step 2: Fetch patient history after storing user data
                return axios.get("http://localhost:4000/api/fetch-patient-history");
            })
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch user data:", error);
                setError("Failed to fetch user data.");
                setLoading(false);
            });
    }, []);
    
    
    if (loading) return <p>Loading user data...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
      <div>
        <HeaderBar/>
        <Navbar />
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>User ID:</strong> {userData.userId}</p>

            <h3>Medical History</h3>
            <p><strong>Previous Diseases:</strong> {userData.Previous_Diseases || "N/A"}</p>
            <p><strong>Previous Symptoms:</strong> {userData.Previous_Symptoms || "N/A"}</p>
            <p><strong>Date of Record:</strong> {userData.Date_Of_Record || "N/A"}</p>
            <p><strong>Doctor ID:</strong> {userData.Doctor_Id || "N/A"}</p>
            <p><strong>Doctor Name:</strong> {userData.Dr_Name || "N/A"}</p>
        </div>
        <Footer/>
        </div>
    );
};

export default UserProfile;
