import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';

const UserProfilesPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state for authentication
    const [hasProfile, setHasProfile] = useState(false); // Add state for profile creation
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

         // Simulate authentication and profile creation status
         setIsAuthenticated(true); // Set to true if user is authenticated
         setHasProfile(true); // Set to true if user has created their profile

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
                            {/* Check if profile.User exists before accessing its properties */}
                            {profile.profile_picture && (
                                <img src={profile.profile_picture} alt={profile.User && profile.User.username} />
                            )}
                            <div className="user-details">
                                {/* Display username if available, otherwise show "Not specified" */}
                                <h3>{profile.User && profile.User.username || 'Not specified'}</h3>
                                <p>Email: {profile.User && profile.User.email}</p>
                                {/* Display gender if available, otherwise show "Not specified" */}
                                <p>Gender: {profile.User && profile.User.gender || 'Not specified'}</p>
                                {/* Display hobbies and interests */}
                                <p>Hobbies: {profile.hobbies || 'Not specified'}</p>
                                <p>Interests: {profile.interests || 'Not specified'}</p>
                                {isAuthenticated && hasProfile ? (
                                    <Link to={`/profile/${profile.profile_id}`} className="profile-link">View Profile</Link>
                                ) : (
                                    <p>You need to be authenticated and have a profile to view this profile.</p>
                                )}
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