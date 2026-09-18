const { pool } = require("./config/db");

const test = async () => {
  console.log("=== Testing Contact Form Backend ===\n");

  // Step 1: Check DB connection
  try {
    const conn = await pool.getConnection();
    console.log("✅ Database connected");
    conn.release();
  } catch (err) {
    console.log("❌ Database connection failed:", err.message);
    return;
  }

  // Step 2: Check messages table exists
  try {
    const [tables] = await pool.execute("SHOW TABLES LIKE 'messages'");
    if (tables.length === 0) {
      console.log("❌ Table 'messages' does NOT exist");
      console.log("   Run the SQL to create it in phpMyAdmin");
      return;
    }
    console.log("✅ Table 'messages' exists");
  } catch (err) {
    console.log("❌ Table check failed:", err.message);
    return;
  }

  // Step 3: Insert a test message
  try {
    const [result] = await pool.execute(
      "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      ["Test User", "test@test.com", "Test Subject", "This is a test message"],
    );
    console.log(`✅ Test message inserted (ID: ${result.insertId})`);
  } catch (err) {
    console.log("❌ Insert failed:", err.message);
    console.log("   Code:", err.code);
    return;
  }

  // Step 4: Read it back
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM messages ORDER BY id DESC LIMIT 1",
    );
    console.log("\n📧 Latest message:");
    console.log(rows[0]);
  } catch (err) {
    console.log("❌ Read failed:", err.message);
  }

  console.log("\n=== DONE ===");
  process.exit();
};

test();
