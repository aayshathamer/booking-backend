// config/db.js
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// ✅ Use a connection pool instead of a single connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,   // up to 10 concurrent connections
  queueLimit: 0
});

// ✅ Test pool connection when starting
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
    connection.release(); // release after test
  }
});

module.exports = db;
