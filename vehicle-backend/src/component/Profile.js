import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(response.data);
    };

    fetchProfile();
  }, []);

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userProfile.username}</p>
      <p>Name: {userProfile.name}</p>
      <p>Email: {userProfile.email}</p>
      <p>Contact: {userProfile.contact}</p>
      <p>Country: {userProfile.country}</p>
      <a href="/reservations">View Reservations</a>
    </div>
  );
};

export default Profile;
