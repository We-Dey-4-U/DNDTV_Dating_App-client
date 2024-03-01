// src/components/UserProfile/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileForm from './UserProfileForm';
import UserActivity from './UserActivity';
import Chart from './Chart';
import { getUserProfile } from '../../services/apiService';

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile(userId);
        setUserProfile(profileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <div>
      {userProfile ? (
        <>
          <UserProfileForm userProfile={userProfile} />
          <UserActivity userId={userId} />
          <Chart userId={userId} />
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;