import React, { useState } from "react";
import "./Login.css";
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';
import HeaderBar from '../Common/HeaderBar';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Credentials: ", credentials);
    alert("Logged in successfully!");
  };

  return (
    
    <div>
      <HeaderBar />
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
