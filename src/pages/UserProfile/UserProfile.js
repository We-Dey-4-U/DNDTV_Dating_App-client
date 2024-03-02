import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const { profile_id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = 'http://localhost:3000/api';

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${baseURL}/user-profile/profile/${profile_id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    setError('Failed to fetch profile data');
                }
            } catch (error) {
                setError('Error fetching profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [profile_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profileData) {
        return <div>No profile data found.</div>;
    }

    return (
        <div className="user-profile-container">
            <h2 className="profile-heading">{profileData.username}'s Profile</h2>
            <div className="profile-details">
                <p><strong>Email:</strong> {profileData.email}</p>
                <p><strong>Gender:</strong> {profileData.gender}</p>
                <p><strong>Interests:</strong> {profileData.interests || 'Not specified'}</p>
                <p><strong>Hobbies:</strong> {profileData.hobbies || 'Not specified'}</p>
                <p><strong>Privacy Setting:</strong> {profileData.privacy_setting}</p>
                <p><strong>Birthdate:</strong> {profileData.birthdate}</p>
                <p><strong>Location:</strong> {profileData.location}</p>
                <p><strong>Bio:</strong> {profileData.bio}</p>
            </div>
        </div>
    );
};

export default UserProfile;