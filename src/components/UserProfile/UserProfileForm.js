import React, { useState } from 'react';
import { createProfile } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const UserProfileForm = ({ authenticatedUser }) => {
  const [formData, setFormData] = useState({
    email: authenticatedUser ? authenticatedUser.email : '',
    profile_picture: null,
    interests: '',
    hobbies: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture') {
      const profilePicture = files ? files[0] : null;
      setFormData((prevData) => ({
        ...prevData,
        [name]: profilePicture,
      }));
      // Preview profile picture
      if (profilePicture) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevData) => ({
            ...prevData,
            profilePicturePreview: reader.result,
          }));
        };
        reader.readAsDataURL(profilePicture);
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createResponse = await createProfile(formData);
      if (createResponse.status === 'success') {
        // Redirect to the unique profile page upon successful profile creation
        navigate(`/profile/${createResponse.profile_id}`);
      } else {
        console.error('Failed to create profile:', createResponse.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
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
            <input type="file" name="profile_picture" onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
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