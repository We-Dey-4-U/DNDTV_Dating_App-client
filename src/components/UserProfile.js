// /frontend/src/pages/UserProfile.js

import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../services/apiService'; // Assuming you have a function to fetch user profile data

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data when component mounts
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(); // Implement this function to fetch user profile data from the backend
        setUserData(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();

    // Cleanup function
    return () => {
      setUserData(null); // Reset user data when component unmounts
    };
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Gender: {userData.gender}</p>
          <p>Birthdate: {userData.birthdate}</p>
          <p>Location: {userData.location}</p>
          <p>Bio: {userData.bio}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;