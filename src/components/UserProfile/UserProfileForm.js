import React, { useState } from 'react';
import { createProfile } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom'; // Import useHistory hook

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    user_id: "", // Add user_id field
    email: 'codecraft@example',
    interests: 'Programming, Reading',
    hobbies: 'Playing guitar, Hiking',
    privacy_setting: 'public',
    username: 'iyke',
    gender: 'female',
    birthdate: '1996-01-01',
    location: 'london',
    bio: "Hello, I'm iyke!",
    profile_picture: null,
  });

  const navigate = useNavigate();
  //const history = useHistory(); // Initialize useHistory hook

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
        if (!formData.username) {
            console.error('Username is required');
            return;
        }
        
        const createResponse = await createProfile(formData);
        if (createResponse.profile_id) { // Check if profile_id exists
            // Redirect to the created profile page
            navigate(`/profile/${createResponse.profile_id}`);
        } else {
            console.error('Profile ID not found in the response');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
 





  return (
    <div>
      <div style={styles.container}>
        <h2 style={styles.title}>DNDTV User Profile Form</h2>
        <div style={styles.previewContainer}>
          {formData.profilePicturePreview && (
            <img src={formData.profilePicturePreview} alt="Profile Preview" style={styles.previewImage} />
          )}
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>User ID:</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
          <div style={styles.field}>
            <label style={styles.label}>Profile Picture:</label>
            <input type="file" name="profile_picture" onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
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
          <div style={styles.field}>
            <label style={styles.label}>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Birthdate:</label>
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Bio:</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>
            Save Profile
          </button>
        </form>
      </div>
      
    </div>
  );
};


const styles = {
  body: {
    backgroundColor: '#0047ab', 
    margin: 0, // Reset default body margin
    padding: 0, // Reset default body padding
  },
 
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
    backgroundColor: '#000080', 
    color: 'white', 
    
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
    color: '#FFD700',
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