const mysql = require('mysql2/promise');

const test = async () => {
  console.log('Testing MySQL connection...\n');
  
  // Try with empty password
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',  // No password
      port: 3307
    });
    
    console.log('✅ SUCCESS! Connected to MySQL!');
    
    // Check if our database exists
    const [databases] = await conn.query('SHOW DATABASES');
    console.log('\n📁 Databases found:');
    databases.forEach(db => console.log(`  - ${db.Database}`));
    
    // Try to use portfolio_db
    try {
      await conn.query('USE portfolio_db');
      console.log('\n✅ portfolio_db exists!');
      
      // Show tables
      const [tables] = await conn.query('SHOW TABLES');
      console.log('\n📋 Tables in portfolio_db:');
      tables.forEach(table => {
        const tableName = Object.values(table)[0];
        console.log(`  - ${tableName}`);
      });
    } catch (err) {
      console.log('\n⚠️  portfolio_db does not exist yet');
      console.log('Create it in phpMyAdmin: http://localhost/phpmyadmin');
    }
    
    await conn.end();
  } catch (err) {
    console.log('❌ Empty password failed');
    console.log('Error:', err.message);
    
    // Try with 'root' as password
    try {
      const conn2 = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3307
      });
      console.log('\n✅ Password is: root');
      await conn2.end();
    } catch (err2) {
      console.log('\n❌ Password "root" also failed');
      console.log('\n🔧 How to reset MySQL password:');
      console.log('1. Stop MySQL in XAMPP');
      console.log('2. Click Shell button in XAMPP');
      console.log('3. Run: mysqladmin -u root password newpassword');
      console.log('4. Start MySQL again');
    }
  }
};

test();