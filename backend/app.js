const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const diseasePredictionRoutes = require('./routes/diseasePredictionRoutes');
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const doctorRoutes = require('./routes/doctorRoutes'); // Import doctor routes
const patientRoutes = require('./routes/patientRoutes');  // Import patient routes
const authRoutes = require('./routes/authRoutes');  // Import patient routes
const pool = require('./utils/db'); // Import the database connection pool

dotenv.config(); // Load environment variables from .env
const jwtSecret = process.env.JWT_SECRET;
const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Use express.json() to parse incoming requests with JSON payloads
app.use(express.json());

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
// Use the user routes
app.use('/api', userRoutes); // Add user-specific routes
// Use the doctor routes
app.use('/api', doctorRoutes);  //http://localhost:4000/api/doctors

// Use the patient routes
app.use('/api', patientRoutes);  // Use patient routes
// Use the patient routes
app.use('/api', authRoutes);  // Use patient routes
// Fallback for unmatched routes (404 error)
app.use((req, res) => {
  res.status(404).send('Route not found');
});

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
