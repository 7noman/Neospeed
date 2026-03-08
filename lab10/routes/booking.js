const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/bookings', (req, res) => {
  const { passenger_name, train_name, source, destination, travel_date } = req.body;

  const sql = `INSERT INTO bookings 
  (passenger_name, train_name, source, destination, travel_date)
  VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [passenger_name, train_name, source, destination, travel_date],
  (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Booking failed" });
    }

    res.json({ message: "Booking Successful" });
  });
});

router.get('/bookings', (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});

module.exports = router;