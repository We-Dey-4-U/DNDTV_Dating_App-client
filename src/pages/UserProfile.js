// pages/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileForm from '../components/UserProfile/UserProfileForm';
import UserInfo from '../components/UserProfile/UserInfo';
import UserActivity from '../components/UserProfile/UserActivity'; // Import UserActivity component
import UserChart from '../components/UserProfile/UserChart';
import { getProfileById } from '../services/apiService'; // Corrected import statement

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data when component mounts
    const fetchUserProfile = async () => {
      try {
        const userProfileData = await getProfileById(userId); // Corrected function call
        setUserData(userProfileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [userId]);

  return (
    <div>
      <h2>User Profile Page</h2>
      {/* Display user information */}
      {userData && <UserInfo userData={userData} />}
      
      {/* Display user chart for interactions */}
      {userData && <UserChart userId={userId} />}

       {/* Display user chart for interactions */}
       {userData && <UserActivity userId={userId} />}
      
      {/* Display user profile form (if needed) */}
      <UserProfileForm />
    </div>
  );
};

export default UserProfile;