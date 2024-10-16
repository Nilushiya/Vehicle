import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    vehicle_registration: '',
    current_mileage: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await axios.post('/reservations', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.href = '/reservations'; 
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Reservation</h2>
      <label>Date:</label>
      <input type="date" name="date" onChange={handleChange} required />
      <label>Time:</label>
      <select name="time" onChange={handleChange} required>
        <option value="10 AM">10 AM</option>
        <option value="11 AM">11 AM</option>
        <option value="12 PM">12 PM</option>
      </select>
      <label>Location:</label>
      <input type="text" name="location" onChange={handleChange} required />
      <label>Vehicle Registration:</label>
      <input type="text" name="vehicle_registration" onChange={handleChange} required />
      <label>Current Mileage:</label>
      <input type="number" name="current_mileage" onChange={handleChange} required />
      <label>Message:</label>
      <textarea name="message" onChange={handleChange} />
      <button type="submit">Submit Reservation</button>
    </form>
  );
};

export default ReservationForm;
