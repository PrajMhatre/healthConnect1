const express = require('express');
const router = express.Router();
const connection = require('../utils/db');

// Route to fetch all doctors
router.get('/doctors', (req, res) => {
  connection.query('SELECT * FROM doctors', (err, results) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return res.status(500).json({ error: 'Failed to fetch doctors' });
    }
    res.json(results);
  });
});

// Route to add a new doctor
router.post('/doctors', (req, res) => {
  const { name, specialty, contact } = req.body;
  const query = 'INSERT INTO doctors (name, specialty, contact) VALUES (?, ?, ?)';
  
  connection.query(query, [name, specialty, contact], (err, results) => {
    if (err) {
      console.error('Error adding doctor:', err);
      return res.status(500).json({ error: 'Failed to add doctor' });
    }
    res.status(201).json({ message: 'Doctor added successfully' });
  });
});

module.exports = router;
