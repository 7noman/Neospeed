import React, { useState } from "react";

export default function BookingForm() {

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    destination: "",
    date: "",
    train: "Neospeed Express"
  });

  const [ticket, setTicket] = useState(null);
  const [delayMsg, setDelayMsg] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Booking Function
  const handleBooking = async () => {

    const { name, age, destination, date, train } = formData;

    if (!name || !age || !destination || !date || !train) {
      alert("Please fill all fields");
      return;
    }

    const response = await fetch(
      `http://localhost:3000/book?name=${name}&age=${age}&destination=${destination}&date=${date}&train=${train}`
    );

    const data = await response.json();
    setTicket({ ...data, age, destination, date });
    setDelayMsg("");
  };

  // Delay Check Function
  const checkDelay = async () => {
    const response = await fetch(`http://localhost:3000/delay`);
    const data = await response.json();
    setDelayMsg(data.alert);
  };

  return (
    <div className="booking-container">

      <input
        type="text"
        name="name"
        placeholder="Passenger Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      {/* Train Dropdown */}
      <select
        name="train"
        value={formData.train}
        onChange={handleChange}
      >
        <option>Neospeed Express</option>
        <option>Neospeed Superfast</option>
        <option>Neo Rajdhani</option>
        <option>Neo Shatabdi</option>
      </select>

      <div className="btn-group">
        <button onClick={handleBooking}>Book Ticket</button>
        <button onClick={checkDelay} className="delay-btn">
          Check Train Delay
        </button>
      </div>

      {ticket && (
        <div className="ticket-card">
          <h3>🎟 Ticket Confirmed</h3>
          <p><b>Name:</b> {ticket.passenger}</p>
          <p><b>Age:</b> {ticket.age}</p>
          <p><b>Destination:</b> {ticket.destination}</p>
          <p><b>Date:</b> {ticket.date}</p>
          <p><b>Train:</b> {ticket.train}</p>
          <p><b>Ticket ID:</b> {ticket.ticketID}</p>
          <p><b>Seat No:</b> {ticket.seat}</p>
          <p><b>Total Bookings:</b> {ticket.totalBookings}</p>
        </div>
      )}

      {delayMsg && (
        <div className="delay-alert">
          {delayMsg}
        </div>
      )}

    </div>
  );
}
