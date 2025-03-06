const express = require('express');
const router = express.Router();
const db = require('../utils/db'); // Import the database connection


// Fetch all users (for admin or similar purposes)
router.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM Login_Registration');
    res.json(rows); // Send the retrieved data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Error fetching users from DB
  }
});

// Fetch user profile including patient history
router.post('/profile', async (req, res) => {
  console.log("Profile route hit!"); // This should log every time

  const { role, username, userId, email } = req.body;
  console.log("Received user data:", req.body); // Print entire request body

  if (!role || !username || !userId || !email) {
    return res.status(400).json({ error: "Missing user information." });
  }

  try {
    const sql = `
      SELECT ph.Previous_Diseases, ph.Previous_Symptoms, ph.Date_Of_Record, ph.Doctor_Id, ph.Dr_Name 
      FROM Patient_History ph
      WHERE ph.User_Id = ? 
      ORDER BY ph.Date_Of_Record DESC 
      LIMIT 1;
    `;

    const [rows] = await db.query(sql, [userId]);

    if (rows.length === 0) {
      console.log("No patient history found for userId:", userId);
      return res.status(404).json({ error: "No patient history found." });
    }

    const userProfile = {
      role, username, userId, email,
      Previous_Diseases: rows[0].Previous_Diseases,
      Previous_Symptoms: rows[0].Previous_Symptoms,
      Date_Of_Record: rows[0].Date_Of_Record,
      Doctor_Id: rows[0].Doctor_Id,
      Dr_Name: rows[0].Dr_Name
    };

    console.log("Sending user profile response:", userProfile);
    res.json(userProfile);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed." });
  }
});

// router.post('/profile', async (req, res) => {
//   const { role, username, userId, email } = req.body;
//   console.log("Received user data:", { role, username, userId, email });

//   if (!role || !username || !userId || !email) {
//     return res.status(400).json({ error: "Missing user information." });
//   }

//   try {
//     // Query database for patient history using userId
//     const sql = `
//       SELECT 
//         ph.Previous_Diseases, 
//         ph.Previous_Symptoms, 
//         ph.Date_Of_Record, 
//         ph.Doctor_Id, 
//         ph.Dr_Name 
//       FROM Patient_History ph
//       WHERE ph.User_Id = ? 
//       ORDER BY ph.Date_Of_Record DESC 
//       LIMIT 1;  -- Get the most recent record
//     `;

//     const [rows] = await db.query(sql, [userId]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "No patient history found." });
//     }

//     // Construct user profile response
//     const userProfile = {
//       role,
//       username,
//       userId,
//       email,
//       Previous_Diseases: rows[0].Previous_Diseases,
//       Previous_Symptoms: rows[0].Previous_Symptoms,
//       Date_Of_Record: rows[0].Date_Of_Record,
//       Doctor_Id: rows[0].Doctor_Id,
//       Dr_Name: rows[0].Dr_Name
//     };

//     res.json(userProfile);
//   } catch (error) {
//     res.status(500).json({ error: "Database query failed." });
//   }
// });

module.exports = router;



