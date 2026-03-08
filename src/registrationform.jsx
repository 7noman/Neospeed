import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      <label>Full Name</label>
      <input
        type="text"
        name="fullname"
        placeholder="Enter your full name"
        value={formData.fullname}
        onChange={handleChange}
        required
      />

      <label>Email Address</label>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Create password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button className="btn-primary" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
