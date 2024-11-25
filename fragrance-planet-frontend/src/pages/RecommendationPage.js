import React, { useState } from 'react';
import axios from 'axios';
import './RecommendationPage.css';

function RecommendationPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
      setError('You are not logged in.');
      return;
    }

    setLoading(true); // Show loading animation
    setError('');

    try {
      const response = await axios.get('http://localhost:5000/api/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Update recommendations
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recommendations.');
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  return (
    <div className="recommendation-container">
      <h1>AI Fragrance Recommendations</h1>
      <p>Click below to get AI-powered fragrance recommendations based on your favorite colognes.</p>

      <button className="get-recommendations-btn" onClick={fetchRecommendations}>
        Get Recommendations
      </button>

      {loading && <div className="loading-animation"></div>}

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {recommendations.length > 0 && (
        <div>
          <h2>Your Recommendations</h2>
          <ul className="recommendation-list">
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
