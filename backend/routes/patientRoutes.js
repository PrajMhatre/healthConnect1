//For the Patient_History table 


const express = require('express');
const router = express.Router();
const db = require('../utils/db'); // Import the database connection pool

// Route to fetch all patient history records
router.get('/patient-history', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Patient_History');
    res.json(rows);  // Send the retrieved data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Send error message if something goes wrong
  }
});

// Route to save patient history
router.post("/save-patient-history", async (req, res) => {
  console.log("Received request to save patient history:", req.body);

  const { userId, username, symptoms, disease, date } = req.body;

  if (!userId) {
    console.error("🚨 Error: userId is missing in request!", req.body);
  }
  // Check for missing fields
  if (!userId || !username || !symptoms || !disease || !date) {
      console.error("Error: Missing required fields", { userId, username, symptoms, disease, date });
      return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
      INSERT INTO Patient_History (User_Id, Username, Previous_Symptoms, Previous_Diseases, Date_Of_Record)
      VALUES (?, ?, ?, ?, ?)
  `;

  console.log("Executing SQL Query:", sql);
  console.log("With values:", [userId, username, symptoms, disease, date]);

  db.query(sql, [userId, username, JSON.stringify(symptoms), disease, date], (err, result) => {
      if (err) {
          console.error("Error saving patient history:", err);
          return res.status(500).json({ message: "Database error", error: err });
      }
      console.log("Patient history saved successfully!", result);
      res.status(200).json({ message: "Patient history saved successfully!" });
  });
});

// Route to update Doctor_Id and Dr_Name in Patient_History based on User_Id


// Update Doctor Details in Patient History
router.put("/update-doctor", async (req, res) => {
  try {
    console.log("🛠 Incoming request data:", req.body);

    const { userId, Dr_Id, Dr_Name } = req.body;

    // Validate required fields
    if (!userId || !Dr_Id || !Dr_Name) {
      console.error("❌ Error: Missing required fields", { userId, Dr_Id, Dr_Name });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Step 1: Get the latest History_Id for this User_Id
    const [historyResult] = await db.query(
      `SELECT History_Id FROM Patient_History WHERE User_Id = ? ORDER BY History_Id DESC LIMIT 1`,
      [userId]
    );

    if (historyResult.length === 0) {
      console.warn("⚠️ No matching appointment found.");
      return res.status(404).json({ message: "No appointment found" });
    }

    const historyId = historyResult[0].History_Id;
    console.log("🆔 Latest History_Id:", historyId);

    // Step 2: Update only the most recent record
    const query = `
      UPDATE Patient_History
      SET Doctor_Id = ?, Dr_Name = ?
      WHERE History_Id = ?
    `;
    
    const values = [Dr_Id, Dr_Name, historyId];

    console.log("📜 Final SQL Query:", query);
    console.log("🗒 Values to be passed to query:", values);

    // Execute Query
    const [results] = await db.query(query, values);

    console.log("🚨 Inside DB query execution");
    console.log("✅ Query Results:", results);

    // Check if any record was updated
    if (results.affectedRows === 0) {
      console.warn("⚠️ No matching record found for the given History_Id.");
      return res.status(404).json({ message: "Record not found" });
    }

    console.log("✅ Doctor details updated successfully!");
    res.status(200).json({ message: "Doctor details updated successfully!" });

  } catch (error) {
    console.error("🚨 Server Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});







module.exports = router;
