import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import Reservations from './component/ReservationList';
import Profile from './component/Profile';
import ReservationForm from './component/ReservationForm';
import Logout from './component/Logout';
import {gapi} from 'gapi-script';

const clientId = "809188169045-fk7d1hqogk3fbm3692fpognmj967171p. apps.googleusercontent.com";

const App = () => {

  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId:clientId,
        scope:""
      })
    };
    gapi.load('client:auth2',start);
  })

  return (
    <Router>
      <div className="App">
        <h1>Vehicle Service Reservation</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservations/new" element={<ReservationForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

