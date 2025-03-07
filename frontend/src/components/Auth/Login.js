import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect user after login
import axios from "axios"; // For API request
import "./Login.css";
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import HeaderBar from '../Common/HeaderBar';

const Login = () => {
  const [credentials, setCredentials] = useState({ 
    username: "", // Added username field
    email: "", 
    password: "", 
    role: "" 
  });

  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.role) {
      setError("Please select a role.");
      return;
    }

    try {
      // Send request to backend
      const response = await axios.post("http://localhost:4000/api/login", credentials);

      if (response.data.success) {
        const { token, role, username, userId, email } = response.data; // Get userId from response

        alert(`Logged in as ${username} successfully!`);

        // Set session expiration time (e.g., 1 hour from now)
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour in milliseconds

        // Store user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId); // Store userId
        localStorage.setItem("email", email);
        localStorage.setItem("expirationTime", expirationTime);

        // Set auto logout timer
        setTimeout(() => {
          logoutUser();
        }, 60 * 60 * 1000); // 1 hour

        // Redirect based on role
        if (role === "patient") {
          navigate("/");
        } else if (role === "doctor") {
          navigate("/");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Check your credentials and try again.");
    }
  };
  // Logout function
  const logoutUser = () => {
    alert("Your session has expired. Please log in again.");
    localStorage.clear();
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <HeaderBar />
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={credentials.role} onChange={handleChange} required>
            <option value="" disabled>Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
