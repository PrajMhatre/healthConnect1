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

// Route to add a new patient history record
router.post('/patient-history', async (req, res) => {
  const { user_id, disease, treatment, date } = req.body;
  const query = 'INSERT INTO Patient_History (user_id, disease, treatment, date) VALUES (?, ?, ?, ?)';

  try {
    await db.query(query, [user_id, disease, treatment, date]);
    res.status(201).json({ message: 'Patient history added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });  // Send error message if something goes wrong
  }
});

module.exports = router;
