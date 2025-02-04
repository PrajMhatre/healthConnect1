const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a pool of connections for better performance and manageability
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // Default to 3306 if DB_PORT is not defined
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// A function to check if the database connection is working
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit if the database connection fails
  }
};

// Call the testConnection function to verify the connection
testConnection();

module.exports = pool;
