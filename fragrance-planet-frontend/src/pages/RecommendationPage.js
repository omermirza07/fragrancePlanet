import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DotLottie } from '@lottiefiles/dotlottie-web';
import './RecommendationPage.css';

function RecommendationPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (loading) {
      const canvas = document.querySelector('#dotlottie-canvas');
      const dotLottie = new DotLottie({
        autoplay: true,
        loop: true,
        canvas,
        // src: 'https://lottie.host/d531d86b-2843-4c15-95c5-9c9d3e2a1071/xvW8QCqTxk.lottie', // infinite white bakcground
        // src: 'https://lottie.host/2adde7df-7daa-4666-873f-6b29377f5df1/Xtm29XTEDs.lottie' // among us
        src: 'https://lottie.host/8202f33e-6e36-4ae7-8cd3-3800879f53ca/yP9yEL9C5Z.lottie'// ball going into big ball
      });
    }
  }, [loading]);

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

      {loading && (
        <canvas
          id="dotlottie-canvas"
          style={{ width: '300px', height: '300px', margin: '20px auto', display: 'block', backgroundColor: 'transparent'}}
        ></canvas>
      )}

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
