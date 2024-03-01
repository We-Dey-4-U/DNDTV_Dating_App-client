import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfilesPage = () => {
    const [users, setUsers] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const baseURL = 'http://localhost:3000/api';
    
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${baseURL}/users`);
            if (response.ok) {
                const userData = await response.json();
                const usersWithProfilePictures = await Promise.all(userData.map(async user => {
                    const profilePicture = await fetchProfilePicture(user.email);
                    return { ...user, profilePicture };
                }));
                setUsers(usersWithProfilePictures);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProfilePicture = async (email) => {
        try {
            const response = await fetch(`${baseURL}/upload-picture/${email}`);
            if (response.ok) {
                const imageData = await response.blob();
                return URL.createObjectURL(imageData);
            } else {
                console.error('Failed to fetch profile picture');
                return null;
            }
        } catch (error) {
            console.error('Error fetching profile picture:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


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
          }
        };
        
        fetchProfiles();
      }, []);

      return (
        <section className="user-profiles-section">
            <h2>Meet Our Users Looking For Soulmate</h2>
            <div className="user-profiles-grid">
                {profiles.map(profile => (
                    <div className="user-profile" key={profile.profile_id}>
                        <img src={profile.profile_picture} alt={profile.User.username} />
                        <div className="user-details">
                            <h3>{profile.User.username}</h3>
                            <p>Email: {profile.User.email}</p>
                            <p>Hobbies: {profile.hobbies || 'Not specified'}</p>
                            <p>Interests: {profile.interests || 'Not specified'}</p>
                            <p>Gender: {profile.User.gender}</p>
                            <Link to={`/profile/${profile.User.email}`} className="profile-link">View Profile</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="return-home">
                <Link to="/">Return to Homepage</Link>
            </div>
        </section>
    );
};

export default UserProfilesPage;