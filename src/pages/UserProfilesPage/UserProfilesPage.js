// UserProfilesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const UserProfilesPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseURL = 'http://localhost:3000/api';

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch(`${baseURL}/user-profile/profiles`);
                if (response.ok) {
                    const profilesData = await response.json();
                    setProfiles(profilesData);
                } else {
                    console.error('Failed to fetch profiles');
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <section className="user-profiles-section">
            <h2>Meet Our Users Looking For Soulmate</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="user-profiles-grid">
                    {profiles.map(profile => (
                        <div className="user-profile" key={profile.profile_id}>
                            {profile.profile_picture && (
                                <img src={profile.profile_picture} alt={profile.User.username} />
                            )}
                            <div className="user-details">
                                <h3>{profile.User.username}</h3>
                                <p>Email: {profile.User.email}</p>
                                <p>Hobbies: {profile.hobbies || 'Not specified'}</p>
                                <p>Interests: {profile.interests || 'Not specified'}</p>
                                <p>Gender: {profile.User.gender}</p>
                                <Link to={`/profile/${profile.profile_id}`} className="profile-link">View Profile</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="return-home">
                <Link to="/">Return to Homepage</Link>
            </div>
        </section>
    );
};

export default UserProfilesPage;