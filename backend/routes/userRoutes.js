//For the Login_Registration table 

const express = require('express');
const db = require('../utils/db'); // Import the database connection
const router = express.Router();

// Example route: Fetch all users
router.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM Login_Registration');
    res.json(rows);  // Send the retrieved data as JSON
  } catch (err) {
    res.status(500).json({ error: err.message });  // Send error message if something goes wrong
  }
});

module.exports = router;
