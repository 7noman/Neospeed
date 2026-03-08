require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));   // serve frontend

app.use('/api', authRoutes);
app.use('/api', bookingRoutes);

app.get('/', (req, res) => {
  res.send("LAB 10 - Modular Train Booking System Running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});