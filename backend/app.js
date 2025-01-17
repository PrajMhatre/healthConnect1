const express = require('express');
const bodyParser = require('body-parser');
const diseasePredictionRoutes = require('./routes/diseasePredictionRoutes');
const pool = require('./utils/db'); // Import the database connection pool

const app = express();
app.use(bodyParser.json());

// Test Database Connection
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.send(`Database Connected! Test Query Result: ${rows[0].solution}`);
  } catch (error) {
    console.error('Database Connection Failed:', error);
    res.status(500).send('Database Connection Failed');
  }
});

// Use the disease prediction route
app.use('/api', diseasePredictionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const diseasePredictionRoutes = require('./routes/diseasePredictionRoutes');

// const app = express();
// app.use(bodyParser.json());

// // Use the disease prediction route
// app.use('/api', diseasePredictionRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
