import React, { useState } from 'react';
import axios from 'axios';

function RecommendationPage() {
  const [notes, setNotes] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setError('You are not logged in.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Update recommendations
      setRecommendations(response.data.recommendations); // Extract recommendations
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recommendations.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>AI Fragrance Recommendations</h1>
      <p>Click below to get AI-powered fragrance recommendations based on your favorite colognes.</p>
      <button
        onClick={fetchRecommendations}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4A148C',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        Get Recommendations
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recommendations.length > 0 && (
        <div>
          <h2>Your Recommendations</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecommendationPage;
