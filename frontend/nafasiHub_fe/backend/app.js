// app.js
import express from "express";
import { createAllTable } from "./utils/dbUtils.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize database tables
const initDB = async () => {
  try {
    await createAllTable();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1); // Exit on failure
  }
};

// Call initDB and start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to NafasiHub Backend");
});