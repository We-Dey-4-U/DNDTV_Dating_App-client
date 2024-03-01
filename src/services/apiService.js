// /frontend/src/services/apiService.js

import axios from 'axios';

const baseURL = 'http://localhost:3000/api'; // Assuming your backend API is running on port 3000

const apiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await apiService.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    const response = await apiService.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Function to handle user profile creation
export const createProfile = async (profileData) => {
    try {
      const response = await apiService.post('/user-profile/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };






  export const getUserProfile = async (userId) => {
    try {
      const response = await axios.get(`${baseURL}/user-profile/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };


// Function to upload profile picture
export const uploadProfilePicture = async (email, formData) => {
    try {
      const response = await fetch(`/api/user-profile/upload-picture/${email}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error uploading profile picture');
    }
  };
  
 

// Function to handle user profile update
  export const updateProfile = async (profile_id, profileData) => {
    try {
      const response = await apiService.put(`/user-profile/${profile_id}`, profileData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  

// Function to handle retrieving user profile by profile_id
export const getProfileById = async (profile_id) => {
    try {
      const response = await apiService.get(`/user-profile/profile/${profile_id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Function to handle deleting user profile by profile_id
  export const deleteProfileById = async (profile_id) => {
    try {
      const response = await apiService.delete(`/user-profile/profile/${profile_id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };


// Function to fetch all users
export const getAllUsers = async () => {
  try {
    const response = await apiService.get('/users');
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Function to fetch user by ID
export const getUserById = async (userId) => {
  try {
    const response = await apiService.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Function to update user by ID
export const updateUserById = async (userId, userData) => {
  try {
    const response = await apiService.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Function to delete user by ID
export const deleteUserById = async (userId) => {
  try {
    const response = await apiService.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};


// Function to send a private message
export const sendMessage = async (messageData) => {
    try {
      const response = await apiService.post('/messages/send', messageData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Function to mark a message as read
  export const handleMarkAsRead = async (messageId) => {
    try {
      const response = await apiService.put(`/messages/mark-read/${messageId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Function to forward a message
  export const handleForwardMessage = async (forwardData) => {
    try {
      const response = await apiService.post('/messages/forward', forwardData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Function to delete a message
  export const handleDeleteMessage = async (messageId) => {
    try {
      const response = await apiService.delete(`/messages/delete/${messageId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  // Function to create a match
  export const createMatch = async (matchData) => {
    try {
      const response = await apiService.post('/matches/create', matchData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  //For fetching all matches for a user by their ID:
  // For fetching all matches:
export const getAllMatches = async () => {
  try {
    const response = await apiService.get('/matches');
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

  export const getMatchById = async (matchId) => {
    try {
      const response = await apiService.get(`/matches/${matchId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };
  
  export const deleteMatch = async (matchId) => {
    try {
      const response = await apiService.delete(`/matches/${matchId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };



  // Add this function to your apiService.js file
export const fetchNews = async () => {
    try {
      const response = await apiService.get('/news'); // Replace '/news' with your actual endpoint
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };












export default apiService;