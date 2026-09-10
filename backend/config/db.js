const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portfolio_db",
  port: process.env.DB_PORT || 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected!");
    console.log(`📁 Database: ${process.env.DB_NAME}`);
    console.log(`🔌 Port: ${process.env.DB_PORT}`);
    connection.release();
  } catch (error) {
    console.warn("⚠️  MySQL not connected:", error.message);
  }
};

module.exports = { pool, testConnection };
