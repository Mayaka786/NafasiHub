// app.js
import express from "express";
import { createAllTable } from "./utils/dbUtils.js";
import cors from "cors";
import bcrypt from "bcrypt";
import { pool } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend origin (Vite default port)
  methods: ["GET", "POST"],
  credentials: true,
}));

// Initialize database tables
const initDB = async () => {
  try {
    await createAllTable();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
};

// Call initDB and start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Register user
const saltRounds = 10; // Use 10 for better security
app.post("/api/register", async (req, res) => {
  const { username, email, mobile, password } = req.body;

  // Validate request body
  if (!username || !email || !mobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash password
    const hash = await bcrypt.hash(password, saltRounds);

    // Insert into database
    const sql = "INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)";
    const values = [username, email, mobile, hash];
    await pool.query(sql, values);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

//Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful", user: { id: rows[0].id, username: rows[0].username } });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to NafasiHub Backend");
});