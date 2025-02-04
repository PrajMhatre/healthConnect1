//For the Doctor_Data table 

const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// Route to fetch all doctors
router.get('/doctors', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM Doctor_Data');
    res.json(rows);  // Send the retrieved data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Send error message if something goes wrong
  }
});

// Route to add a new doctor
router.post('/doctors', async (req, res) => {
  const { name, specialty, contact, email } = req.body;
  const query = 'INSERT INTO doctors (name, specialty, contact, email) VALUES (?, ?, ?, ?)';

  try {
    const [result] = await db.query(query, [name, specialty, contact, email]);
    res.status(201).json({ message: 'Doctor added successfully', doctorId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add doctor', details: err.message });
  }
});

module.exports = router;
