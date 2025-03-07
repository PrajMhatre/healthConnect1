const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// Store temp doctor data per userId to avoid overwrites
let tempDoctorData = {}; // Store data per userId

// Route to store doctor data temporarily
router.post('/store-doctor-data', async (req, res) => {
    console.log("Store Doctor Data route hit!");
    const { role, username, userId, email } = req.body;

    // Validate data
    if (!role || !username || !userId || !email) {
        return res.status(400).json({ error: "Incomplete data sent." });
    }

    // Store doctor data in-memory per userId
    tempDoctorData[userId] = { role, username, userId, email };

    console.log(`Doctor data stored temporarily for userId ${userId}:`, tempDoctorData[userId]);

    res.status(200).json({ message: "Doctor data stored successfully." });
});

// Route to fetch doctor data using the stored username
router.get('/fetch-doctor-by-username', async (req, res) => {
    console.log("Fetch Doctor Data by Username route hit!");

    // Retrieve the username from the stored tempDoctorData
    const storedDoctor = Object.values(tempDoctorData)[0]; // Get the first stored doctor (assuming single session)

    if (!storedDoctor || !storedDoctor.username) {
        return res.status(400).json({ error: "No stored doctor data found." });
    }

    const drName = storedDoctor.username;
    console.log("Doctor name retrieved from stored data:", drName);

    try {
        // Query the Doctor_Data table based on Dr_Name
        const sql = `SELECT * FROM Doctor_Data WHERE Dr_Name = ?`;
        
        // Execute the query
        const [rows] = await db.query(sql, [drName]);

        // Check if the doctor exists
        if (rows.length === 0) {
            console.log("No doctor found with Dr_Name:", drName);
            return res.status(404).json({ error: "No doctor found with the given name." });
        }

        // Send the doctor data as the response
        console.log("Doctor data found:", rows[0]);
        res.json(rows[0]);  // Return the first doctor record
    } catch (error) {
        console.error("Database query failed:", error);
        res.status(500).json({ error: "Database query failed." });
    }
});

module.exports = router;
