import React, { useState, useEffect } from 'react';
import { fetchAuthenticatedUser } from '../../services/authService'; // Import function to fetch authenticated user data
import UserProfileForm from './UserProfileForm';

const ParentComponent = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [profileOwner, setProfileOwner] = useState(null);

  useEffect(() => {
    // Fetch authenticated user data when component mounts
    const fetchUser = async () => {
      try {
        const user = await fetchAuthenticatedUser(); // Fetch authenticated user data from API or localStorage
        setAuthenticatedUser(user);
      } catch (error) {
        console.error('Error fetching authenticated user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    // Fetch profile owner data when authenticated user is available
    if (authenticatedUser) {
      // Assuming you have logic to fetch profile owner data based on the authenticated user
      // For example purposes, setting dummy data here
      setProfileOwner({ email: authenticatedUser.email });
    }
  }, [authenticatedUser]);

  return (
    <div>
      {profileOwner ? (
        <UserProfileForm authenticatedUser={authenticatedUser} profileOwner={profileOwner} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ParentComponent;