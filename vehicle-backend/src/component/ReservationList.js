import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/reservations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(response.data);
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setReservations(reservations.filter(reservation => reservation.id !== id));
  };

  return (
    <div>
      <h2>Your Reservations</h2>
      <Link to="/reservations/new">Create New Reservation</Link>
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            {reservation.date} at {reservation.time} - {reservation.location}
            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
