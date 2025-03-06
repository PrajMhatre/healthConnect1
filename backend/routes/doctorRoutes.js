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
  try {
    console.log("🔹 Received request body:", req.body);  // ✅ Log the full request body

    const { 
      dr_name, 
      experience, 
      location, 
      speciality, 
      contact_info, 
      availability_status_9_to_12, 
      availability_status_2_to_5, 
      availability_status_6_to_9, 
      ratings, 
      consultation_fee, 
      email, 
      google_map,      // New Column
      description,     // New Column
      clinic_name      // New Column
    } = req.body;

    // Check if required fields are missing
    if (!dr_name || !email || !speciality) {
      console.log("❌ Missing required fields:", { dr_name, email, speciality });
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("🔹 Dr Name Received:", dr_name);  // ✅ Log dr_name specifically

    // Check if email already exists
    const [existingDoctorRows] = await db.query("SELECT * FROM Doctor_Data WHERE Email = ?", [email]);

    if (existingDoctorRows.length > 0) {
      console.log("❌ Doctor with this email already exists:", email);
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Insert doctor data including the new columns
    const [result] = await db.query(
      `INSERT INTO Doctor_Data 
      (Dr_Name, Experience, Location, Speciality, Contact_Info, 
       Availability_Status_9_to_12, Availability_Status_2_to_5, Availability_Status_6_to_9, 
       Ratings, Consultation_Fee, Email, Google_Map, Description, Clinic_Name) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [dr_name, experience, location, speciality, contact_info, 
       availability_status_9_to_12, availability_status_2_to_5, availability_status_6_to_9, 
       ratings, consultation_fee, email, google_map, description, clinic_name]
    );
    

    console.log("✅ Doctor added successfully with ID:", result.insertId);
    res.status(201).json({ message: "Doctor information added successfully", doctorId: result.insertId });

  } catch (error) {
    console.error("🚨 Error adding doctor data:", error);
    res.status(500).json({ message: "Error saving details", error: error.message });
  }
});


// ✅ Route to fetch doctors based on user preferences
// Route to filter doctors based on user preferences
// Route to fetch filtered doctors based on query parameters
let filterCriteria = {}; // Store filter criteria temporarily in memory

// Route 1: Receive and store filter criteria
router.post("/filter", (req, res) => {
  filterCriteria = req.body; // Store filters for the next request
  console.log("📩 Stored Filters:", filterCriteria);
  res.json({ message: "Filters received successfully" });
});

// Route 2: Fetch and send doctors based on stored filters
// Route to fetch doctors based on filters
// Route to fetch doctors based on filters
router.get("/doctors/filter", async (req, res) => {
  let { location, experience, speciality, consultationFee, availabilityStatus, ratings  } = filterCriteria;

  // Ensure experience and consultationFee are numbers
  experience = parseInt(experience, 10); // Convert experience to an integer
  consultationFee = parseFloat(consultationFee); // Convert consultation fee to a float
  ratings = parseFloat(ratings); // Convert ratings to float

  // Log the filter data after conversion
  console.log("🛠 Filter Data (After Conversion):", {
    location,
    experience,
    speciality,
    consultationFee,
    availabilityStatus,
    ratings,
  });

  try {
    console.log("🛠 Fetching Doctors with Filters:", filterCriteria);
    
    // Log the database connection object to confirm it's properly initialized
    // console.log("🛠 Database Connection Object:", db);

    const queryParts = ["SELECT * FROM Doctor_Data WHERE 1=1"]; // Always return from Doctor_Data
    const values = [];

    // Add filters to query if provided
    if (location && location !== "") {
      queryParts.push("AND location = ?");
      values.push(location);
    }

    if (experience && experience !== "") {
      queryParts.push("AND experience >= ?");
      values.push(experience);
    }

    if (speciality && speciality !== "") {
      queryParts.push("AND speciality = ?");
      values.push(speciality);
    }

    if (consultationFee && consultationFee !== "") {
      queryParts.push("AND consultation_fee <= ?");
      values.push(consultationFee);
    }

    if (ratings && ratings !== "") {
      queryParts.push("AND ratings >= ?");
      values.push(ratings);
    }

    // Handle availability status filter (check each availability period)
    if (availabilityStatus && availabilityStatus !== "") {
      const availabilityQueryParts = [];
      const availabilityValues = [];

      if (availabilityStatus === '9_to_12') {
        availabilityQueryParts.push(
          "Availability_Status_9_to_12 = ? OR Availability_Status_9_to_12 = ?"
        );
        availabilityValues.push('AVAILABLE', 'UNAVAILABLE');
      }
      if (availabilityStatus === '2_to_5') {
        availabilityQueryParts.push(
          "Availability_Status_2_to_5 = ? OR Availability_Status_2_to_5 = ?"
        );
        availabilityValues.push('AVAILABLE', 'UNAVAILABLE');
      }
      if (availabilityStatus === '6_to_9') {
        availabilityQueryParts.push(
          "Availability_Status_6_to_9 = ? OR Availability_Status_6_to_9 = ?"
        );
        availabilityValues.push('AVAILABLE', 'UNAVAILABLE');
      }

      if (availabilityQueryParts.length > 0) {
        queryParts.push("AND (" + availabilityQueryParts.join(' OR ') + ")");
        values.push(...availabilityValues);
      }
    }

    const query = queryParts.join(" ");
    console.log("📜 Final SQL Query:", query);
    console.log("🗒 Values to be passed to query:", values);

    // Query the database with the dynamic query using await
    const [results, fields] = await db.query(query, values);

    console.log("🚨 Inside DB query callback");
    console.log("✅ Doctors Found:", results);

    // Send the results to the client
    res.json(results);
  } catch (error) {
    console.error("🚨 Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});







module.exports = router;
