require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// Create MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL Database (Train Booking)");
    connection.release();
  }
});

// ================= ROUTES =================

// Home Route
app.get('/', (req, res) => {
  res.send('Train Booking Server is running successfully');
});

// Add Booking
app.post('/bookings', (req, res) => {
  const { passenger_name, train_name, source, destination, travel_date } = req.body;

  if (!passenger_name || !train_name || !source || !destination || !travel_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO bookings 
  (passenger_name, train_name, source, destination, travel_date) 
  VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [passenger_name, train_name, source, destination, travel_date], 
  (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Booking added successfully",
      bookingId: result.insertId
    });
  });
});

// Get All Bookings
app.get('/bookings', (req, res) => {
  const sql = "SELECT * FROM bookings";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json(results);
  });
});

// Delete Booking
app.delete('/bookings/:id', (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});