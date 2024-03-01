// /frontend/src/components/UserProfile/UserInfo.js
import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div>
      <h3>User Information</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Add more user information as needed */}
    </div>
  );
};

export default UserInfo;