const mysql = require("mysql2/promise");
require("dotenv").config();

const test = async () => {
  console.log("=== ENV VALUES ===");
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_PASSWORD length:", (process.env.DB_PASSWORD || "").length);
  console.log("DB_NAME:", process.env.DB_NAME);
  console.log("DB_PORT:", process.env.DB_PORT);
  console.log("==================\n");

  try {
    // Step 1: Connect to MySQL server (no database)
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: parseInt(process.env.DB_PORT) || 3306,
    });
    console.log("✅ Step 1: MySQL server connected");

    // Step 2: List databases
    const [dbs] = await conn.query("SHOW DATABASES");
    console.log("\n📁 Databases found:");
    dbs.forEach((d) => console.log("  -", d.Database));

    // Step 3: Check if portfolio DB exists
    const dbExists = dbs.some((d) => d.Database === process.env.DB_NAME);
    if (!dbExists) {
      console.log(`\n❌ Database '${process.env.DB_NAME}' does NOT exist!`);
      console.log("Create it in phpMyAdmin: http://localhost/phpmyadmin");
      await conn.end();
      return;
    }
    console.log(`\n✅ Step 2: Database '${process.env.DB_NAME}' exists`);

    // Step 4: Use database and list tables
    await conn.query(`USE \`${process.env.DB_NAME}\``);
    const [tables] = await conn.query("SHOW TABLES");
    console.log("\n📋 Tables found:");
    if (tables.length === 0) {
      console.log("  (no tables - you need to run the SQL)");
    } else {
      tables.forEach((t) => console.log("  -", Object.values(t)[0]));
    }

    // Step 5: Test the projects table
    try {
      const [rows] = await conn.query("SELECT COUNT(*) as count FROM projects");
      console.log(`\n✅ Step 3: projects table has ${rows[0].count} rows`);
    } catch (err) {
      console.log("\n❌ Step 3: 'projects' table missing or broken");
      console.log("Error:", err.message);
    }

    // Step 6: Test the messages table
    try {
      const [rows] = await conn.query("SELECT COUNT(*) as count FROM messages");
      console.log(`✅ Step 4: messages table has ${rows[0].count} rows`);
    } catch (err) {
      console.log("❌ Step 4: 'messages' table missing or broken");
      console.log("Error:", err.message);
    }

    await conn.end();
    console.log("\n=== DONE ===");
  } catch (err) {
    console.error("\n❌ MySQL server connection FAILED");
    console.error("Error:", err.message);
    console.error("Code:", err.code);
  }
};

test();
