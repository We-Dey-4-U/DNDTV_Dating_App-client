import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import './UserProfile.css';
import io from 'socket.io-client';

const UserProfile = ({ isAuthenticated, authenticatedUserId }) => {
  const { profile_id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
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

    const initSocket = () => {
      const newSocket = io('http://localhost:8080');
      newSocket.on('connect', () => {
        console.log('Connected to socket server');
        // Join room corresponding to the authenticated user
        newSocket.emit('join', authenticatedUserId);
      });
      setSocket(newSocket);
    };

    if (isAuthenticated) {
      fetchProfileData();
      initSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [profile_id, isAuthenticated, authenticatedUserId]);


  useEffect(() => {
    if (socket) {
      socket.on('private_message', newMessage => {
        // Check if the message is intended for the current user
        if (newMessage.receiver_id === authenticatedUserId || newMessage.sender_id === authenticatedUserId) {
          setMessages(prevMessages => [...prevMessages, newMessage]);
          updateChatHistory(prevMessages => [...prevMessages, newMessage]);
        }
      });
    }
  }, [socket, authenticatedUserId]);
 
 
 
  useEffect(() => {
    // Load chat history from localStorage when component mounts
    const storedChatHistory = localStorage.getItem('chatHistory');
    if (storedChatHistory) {
      setMessages(JSON.parse(storedChatHistory));
    }
  }, []);

  const updateChatHistory = chatHistory => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSend = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        sender_id: authenticatedUserId,
        receiver_id: profile_id,
        message_text: messageInput.trim(),
        sent_at: new Date().toISOString(),
        is_read: false,
        is_deleted: false,
        reply_to: replyToMessage ? replyToMessage.message_id : null,
        forwarded_from: null,
      };

      // Emit the message to the server
      socket.emit('private_message', newMessage);

      // Add the message to the local state for immediate display
      setMessages(prevMessages => [...prevMessages, newMessage]);
      updateChatHistory([...messages, newMessage]);

      // Clear the message input field and reply target
      setMessageInput('');
      setReplyToMessage(null);
    }
  };

  const handleReply = message => {
    setReplyToMessage(message);
    setMessageInput(`@${message.sender_id} `); // Pre-fill message input with reply target
  };

  const handleDelete = message_id => {
    // Filter out the message to be deleted
    const updatedMessages = messages.filter(message => message.message_id !== message_id);
    setMessages(updatedMessages);
    updateChatHistory(updatedMessages);
    // You might want to implement server-side logic to delete the message permanently
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
      <div className="messages-container">
        <h3>Messages</h3>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <p>{message.message_text}</p>
              <p>Sender: {message.sender_id}</p>
              {message.reply_to && (
                <button onClick={() => handleReply(message)}>Reply</button>
              )}
              {message.sender_id === authenticatedUserId && (
                <button onClick={() => handleDelete(message.message_id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <input
          type="text"
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
      <div className="return-home">
        <Link to="/">Return to Homepage</Link>
      </div>
    </div>
  );
};

export default UserProfile;