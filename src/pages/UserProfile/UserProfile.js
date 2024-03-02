import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css'; // Import CSS file for styling

const UserProfile = () => {
    const { profile_id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const baseURL = 'http://localhost:3000/api/user-profile';

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${baseURL}/profile/${profile_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [profile_id]);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile-container">
            <h2 className="profile-heading">{profileData.User.username}'s Profile</h2>
            <div className="profile-details">
                <p><strong>Email:</strong> {profileData.User.email}</p>
                <p><strong>Hobbies:</strong> {profileData.hobbies || 'Not specified'}</p>
                <p><strong>Interests:</strong> {profileData.interests || 'Not specified'}</p>
                <p><strong>Gender:</strong> {profileData.User.gender}</p>
                {/* Add more profile details as needed */}
            </div>
        </div>
    );
};

export default UserProfile;