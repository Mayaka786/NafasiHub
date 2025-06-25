// utils/dbUtils.js
import { pool } from "../config/db.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const postTableQuery = `CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} table was created or already exists`);
  } catch (error) {
    console.error(`Error creating ${tableName}:`, error);
    throw error; 
  }
};

const createAllTable = async () => {
  try {
    await createTable("Users", userTableQuery);
    await createTable("Posts", postTableQuery);
    console.log("All tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

export { createAllTable }; 