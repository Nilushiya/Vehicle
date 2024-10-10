import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Reservations from './component/ReservationList';
import Profile from './component/Profile';
import ReservationForm from './component/ReservationForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Vehicle Service Reservation</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservations/new" element={<ReservationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

