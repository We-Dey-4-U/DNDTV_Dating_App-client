import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { getAllMatches } from '../../services/apiService'; // Import the updated API service function
import './MatchingDataPage.css';

const MatchingDataPage = () => {
    const [matchingData, setMatchingData] = useState([]);

    useEffect(() => {
        const fetchMatchingData = async () => {
            try {
                const data = await getAllMatches(); // Fetch all matches using the updated API service function
                setMatchingData(data);
            } catch (error) {
                console.error('Error fetching matching data:', error);
            }
        };

        fetchMatchingData();
    }, []);
  
    return (
        <section className="matching-data-section">
            <h2 className="h2-with-background">Matching Data</h2>
            <div className="matching-data-grid">
                {matchingData.map(match => (
                    <div className="match-item" key={match.match_id}>
                        <p>User ID 1: {match.user1_id}</p>
                        <p>User ID 2: {match.user2_id}</p>
                        <p>User 1 Username: {match.user1_username}</p>
                        <p>User 2 Username: {match.user2_username}</p>
                        <p>Matched At: {new Date(match.matched_at).toLocaleString()}</p>
                        <p>Appointment Date: {match.appointment_date ? new Date(match.appointment_date).toLocaleString() : 'Not scheduled'}</p>
                        {/* Add more attributes as needed */}
                    </div>
                ))}
            </div>
            <div className="return-home">
                <Link to="/">Return to Homepage</Link>
            </div>
        </section>
    );
};

export default MatchingDataPage;