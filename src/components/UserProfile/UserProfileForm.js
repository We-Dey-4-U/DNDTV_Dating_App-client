import React, { useState, useEffect } from 'react';
import { createProfile, getUserProfile, updateProfile } from '../../services/apiService';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const UserProfileForm = ({ authenticatedUser, profileOwner }) => {
  const [formData, setFormData] = useState({
    email: authenticatedUser ? authenticatedUser.email : '',
    profile_picture: null,
    interests: '',
    hobbies: '',
    privacy_setting: 'public',
    profilePicturePreview: localStorage.getItem('profile_picture') || null,
  });
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const socket = io('http://localhost:3001');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (profileOwner && profileOwner.email) {
          const profileData = await getUserProfile(profileOwner.email);
          setFormData(profileData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();

    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [profileOwner, socket]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      const profilePicture = files ? files[0] : null;
      setFormData((prevData) => ({
        ...prevData,
        [name]: profilePicture,
        profilePicturePreview: profilePicture ? URL.createObjectURL(profilePicture) : null,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchProfile(formData.email);
      if (response.ok) {
        const profileExists = await response.json();
        if (profileExists) {
          setWarningMessage('A profile with this email already exists');
          setSuccessMessage('');
          return;
        }
      } else {
        console.error('Failed to check profile existence');
      }

      const createResponse = await createProfile(formData);
      if (createResponse.status === 'success') {
        setSuccessMessage('Profile created successfully');
        setWarningMessage('');
        navigate('/user-profiles'); // Ensure that navigate is imported correctly and used within a Router component
      } else {
        console.error('Failed to create profile:', createResponse.error);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const fetchProfile = async (email) => {
    try {
      return await fetch(`http://https://dndtv-dating-app-api-jig4.vercel.app//api/user-profile/${email}`);
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };







  return (
    <div>
      {warningMessage && <div className="warning-message">{warningMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div style={styles.container}>
        <h2 style={styles.title}>User Profile Form</h2>
        <div style={styles.previewContainer}>
          {formData.profilePicturePreview && (
            <img src={formData.profilePicturePreview} alt="Profile Preview" style={styles.previewImage} />
          )}
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Profile Picture:</label>
            <input
              type="file"
              name="profile_picture"
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange} // Add onChange handler to make email field editable
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Interests:</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Hobbies:</label>
            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Save Profile
          </button>
        </form>
      </div>
      <div style={styles.userDetailsContainer}>
        <h2 style={styles.title}>User Details</h2>
        <div style={styles.userDetails}>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Interests:</strong> {formData.interests}</p>
          <p><strong>Hobbies:</strong> {formData.hobbies}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  userDetailsContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  previewContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  previewImage: {
    maxWidth: '200px',
    height: 'auto',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  field: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  userDetails: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

export default UserProfileForm;