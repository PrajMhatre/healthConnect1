const express = require('express');
const axios = require('axios');

const router = express.Router();

// Route to get disease prediction from Flask API
router.post('/predict', async (req, res) => {
  try {
    // Extract the symptoms object from the request body
    const { formData } = req.body;

    // Validate input
    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({ error: 'Invalid symptoms data provided.' });
    }

    // Send the symptoms to the Flask API for prediction
    const response = await axios.post('http://localhost:5000/predict', formData);

    // Check if the response contains prediction data
    if (response.data && response.data.disease) {
      // Send the prediction result back to the client
      res.status(200).json({ disease: response.data.disease });
    } else {
      res.status(500).json({ error: 'No disease prediction returned from the API.' });
    }
  } catch (error) {
    console.error('Error predicting disease:', error);

    // Handle specific axios errors if needed
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Prediction failed due to server error.' });
    }
  }
});

module.exports = router;
