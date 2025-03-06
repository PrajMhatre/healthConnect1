const bcrypt = require("bcryptjs");
const db = require("../utils/db"); // Ensure database connection
const jwt = require("jsonwebtoken");

// User Registration
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if email already exists
    const [existingUser] = await db.promise().query("SELECT * FROM Login_Registration WHERE Email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    await db.promise().query(
      "INSERT INTO Login_Registration (Username, Email, Password, Role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // Check if user exists
    const [user] = await db.promise().query("SELECT * FROM Login_Registration WHERE Email = ?", [email]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user[0].Password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user[0].User_Id, role: user[0].Role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { registerUser, loginUser };
