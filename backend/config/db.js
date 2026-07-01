const mysql = require('mysql2/promise');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  port: process.env.DB_PORT || 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected!');
    console.log(`📁 Database: ${process.env.DB_NAME || 'portfolio_db'}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database Connection Failed:', error.message);
    console.error('Make sure XAMPP MySQL is running!');
    process.exit(1);
  }
};

module.exports = { pool, testConnection };