// UserProfilesPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../services/apiService'; // Import the function to fetch users

const UserProfilesPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users when the component mounts
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    getUsers();
  }, []);

  return (
    <section className="user-profiles-section">
      <h2>Meet Our Users</h2>
      <div className="user-profiles-grid">
        {users.map(user => (
          <div className="user-profile" key={user.id}>
            <img src={user.profilePicture} alt={user.username} />
            <div className="user-details">
              <h3>{user.username}</h3>
              <p>Hobbies: {user.hobbies}</p>
              <p>Relationship Interest: {user.relationshipInterest}</p>
              <Link to={`/profile/${user.id}`} className="profile-link">View Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfilesPage;