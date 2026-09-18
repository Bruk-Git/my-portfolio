const mysql = require("mysql2/promise");

const testConnection = async () => {
  console.log("Testing connection on port 3307...");

  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      port: 3307, // Try this port
    });

    console.log("✅ Connected to MySQL on port 3307!");

    // Check if database exists
    const [databases] = await connection.query("SHOW DATABASES");
    console.log("\n📁 Available databases:");
    databases.forEach((db) => {
      console.log(`  - ${db.Database}`);
    });

    await connection.end();
  } catch (error) {
    console.error("❌ Failed on port 3307:", error.message);

    // Try port 3306
    console.log("\nTrying port 3306...");
    try {
      const connection2 = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        port: 3306,
      });
      console.log("✅ Connected on port 3307!");
      await connection2.end();
    } catch (err) {
      console.error("❌ Failed on port 3307 too:", err.message);
    }
  }
};

testConnection();
