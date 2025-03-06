import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./Register.css";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import HeaderBar from "../Common/HeaderBar";
import HomePage from '../Home/HomePage';
import Login from './Login';

const Register = () => {
  const navigate = useNavigate(); // Initialize navigation

  const [formData, setFormData] = useState({
    username: "", 
    email: "",
    password: "",
    confirmPassword: "",
    role: "", 
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required!";
    if (!formData.email.trim()) newErrors.email = "Email is required!";
    if (!formData.password.trim()) newErrors.password = "Password is required!";
    if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required!";
    if (!formData.role) newErrors.role = "Please select a role!";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setServerMessage(""); // Clear previous messages

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setServerMessage("Registered successfully!");
        // ✅ Store Doctor's Name and Email in Local Storage
        
        setFormData({ username: "", email: "", password: "", confirmPassword: "", role: "" });
        
        // ✅ Redirect based on user role
        if (formData.role === "doctor") {
        // localStorage.setItem("email", formData.email);
        // localStorage.setItem("username", formData.username);
        navigate("/doctor-details", { 
          state: { username: formData.username, email: formData.email } 
        }); // Redirect to doctor details page
        }
        else if (formData.role === "patient") {
          navigate("/login");  // 🚀 Redirect to Login Page for Patients
        }
      } else {
        setServerMessage(data.message || "Registration failed!");
      }
    } catch (error) {
      setServerMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <HeaderBar />
      <Navbar />
      <div className="register-container">
        <h2>Register</h2>
        {serverMessage && <p className="server-message">{serverMessage}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="" disabled>Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}

          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
