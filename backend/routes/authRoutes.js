const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const db = require('../utils/db'); // Import database connection
const router = express.Router();
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

// 🟢 Route for User Registration
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const [existingUser] = await db.query('SELECT * FROM Login_Registration WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const [result] = await db.query(
      'INSERT INTO Login_Registration (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });

  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// 🔵 User Login Route
router.post("/login", async (req, res) => {
  const { email, username, password, role } = req.body;

  console.log(`🔹 Login Attempt: email=${email}, username=${username}, role=${role}`);

  // Validate required fields
  if (!email || !username || !password || !role) {
    console.log("❌ Missing Fields: One or more fields are empty.");
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log(`🔹 Checking user in database for email: ${email}, username: ${username}, role: ${role}`);

    // SQL query to check for Username, Email, and Role
    const [userData] = await db.query(
      "SELECT User_Id, Username, Email, Password, Role FROM Login_Registration WHERE Email = ? AND Username = ? AND Role = ?", 
      [email, username, role]
    );

    console.log("🔹 Raw user data from DB:", userData);

    // Check if user exists
    if (!userData || userData.length === 0) {
      console.log(`❌ No user found with email: ${email}, username: ${username}, and role: ${role}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const existingUser = userData[0];

    console.log(`✅ User Found: ${existingUser.Username}, Role: ${existingUser.Role}, User ID: ${existingUser.User_Id}`);

    // Check if password is present
    if (!existingUser.Password) {
      console.log(`🛑 User found but password is missing for email: ${email}`);
      return res.status(500).json({ error: "Password not found for this user" });
    }

    console.log(`🔹 Retrieved password hash from DB: ${existingUser.Password}`);

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, existingUser.Password);
    if (!isMatch) {
      console.log(`❌ Password mismatch for email: ${email}`);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Password matched successfully.");

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser.User_Id, role: existingUser.Role, username: existingUser.Username },
      jwtSecret,
      { expiresIn: "1h" }
    );

    console.log(`✅ Token Generated for User ID: ${existingUser.User_Id}`);

    // Send response including User ID and Username
    res.json({
      success: true,
      token,
      role: existingUser.Role,
      userId: existingUser.User_Id,
      username: existingUser.Username,
      email: existingUser.Email,
    });

  } catch (err) {
    console.error("🚨 Login Error:", err);
    return res.status(500).json({ error: "Server error during login" });
  }
});




module.exports = router;
