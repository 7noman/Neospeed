import React from "react";
import { BrowserRouter } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import RegistrationForm from "./RegistrationForm";
import BookingForm from "./bookingform";
import "./SPA.css";
import trainImg from "./assets/futuristic.jpg";
import traingif from "./assets/tt.gif";
import screenImg from "../screen.jpg";

export default function SPA() {
  return (
    <BrowserRouter>
      <div className="spa-container">

        {/* NAVBAR */}
        <nav className="navbar">
          <h2 className="logo">NeoSpeed</h2>
          <ul className="nav-links">
            <li><Link smooth to="#home">Home</Link></li>
            <li><Link smooth to="#traininfo">Train Info</Link></li>
            <li><Link smooth to="#status">Live Status</Link></li>
            <li><Link smooth to="#register">Register</Link></li>
            <li><Link smooth to="#booking">Booking</Link></li>
            <li><Link smooth to="#manage">Manage Booking</Link></li>
            <li><Link smooth to="#contact">Contact</Link></li>
          </ul>
        </nav>

        {/* SECTIONS */}
        <section id="home" className="section">
          <h1>NeoSpeed – Train Booking System</h1>
           <img src={trainImg} alt="Train" className="section-image" />
          <p>
            NeoSpeed is a single-page train booking web application developed
            using React. It allows users to register, book tickets, and track
            trains efficiently without page reloads.
          </p>
        </section>

        <section id="traininfo" className="section light">
          <h1>Train Information</h1>
          <p>
            This module provides details about available trains, routes,
            schedules, and seat availability between selected stations.
          </p>
          <img src={screenImg} alt="Screen" className="section-image" />
        </section>

        <section id="status" className="section">
          <h1>Live Train Status</h1>
           <img src={traingif} alt="Train" className="section-image" />
          <p>
            Users can check real-time train running status, delays, and expected
            arrival times using the live status feature.
          </p>
        </section>

        <section id="register" className="section light">
          <h1>User Registration</h1>
          <RegistrationForm />
        </section>

        <section id="booking" className="section">
          <h1>Train Booking</h1>
          <BookingForm />
        </section>

        <section id="manage" className="section light">
          <h1>Manage Booking</h1>
          <p>
            Users can view booking details, cancel tickets, and check booking
            history using the manage booking module.
          </p>
        </section>

        <section id="contact" className="section">
          <h1>Contact Us</h1>
          <p>
            For queries and support, users can reach NeoSpeed through email or
            customer care services.
          </p>
        </section>

        <footer className="footer">
          © 2025 NeoSpeed – Single Page Application using React
        </footer>

      </div>
    </BrowserRouter>
  );
}
