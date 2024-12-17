// import necessary dependencies for the recommendation page
import React, { useState, useEffect } from 'react'; // react hooks for state management and side effects
import axios from 'axios'; // library for making http requests
import { DotLottie } from '@lottiefiles/dotlottie-web'; // library for displaying lottie animations
import './RecommendationPage.css'; // import css for styling the component

function RecommendationPage() {
  // state to store the recommendations
  const [recommendations, setRecommendations] = useState([]);
  // state to manage loading status
  const [loading, setLoading] = useState(false);
  // state to store error messages
  const [error, setError] = useState('');

  // useEffect to initialize the lottie animation when loading is true
  useEffect(() => {
    if (loading) {
      const canvas = document.querySelector('#dotlottie-canvas'); // select the canvas element
      const dotLottie = new DotLottie({
        autoplay: true, // start animation automatically
        loop: true, // repeat the animation in a loop
        canvas,
        src: 'https://lottie.host/a57f3a81-65d7-4fef-a793-e8ce4b498399/GWa2CFJ84f.lottie', // lottie animation source url
      });
    }
  }, [loading]); // re-run the effect whenever the loading state changes

  // function to fetch recommendations from the backend
  const fetchRecommendations = async () => {
    const token = localStorage.getItem('token'); // retrieve the jwt token from local storage

    if (!token) {
      setError('You are not logged in.'); // set error if token is missing
      return;
    }

    setLoading(true); // set loading state to true to show loading animation
    setError(''); // clear any previous errors

    try {
      // make a get request to the recommendations api with the token
      const response = await axios.get('http://localhost:5000/api/recommendations', {
        headers: {
          Authorization: `Bearer ${token}`, // include jwt token in the request header
        },
      });

      // update the recommendations state with the response data
      setRecommendations(response.data.recommendations);
    } catch (err) {
      console.error(err); // log the error to the console
      setError('Failed to fetch recommendations.'); // set an error message
    } finally {
      setLoading(false); // set loading state to false to hide loading animation
    }
  };

  return (
    <div className="recommendation-container">
      <h1>AI Fragrance Recommendations</h1>
      <p>Click below to get AI-powered fragrance recommendations based on your favorite colognes.</p>

      <button className="get-recommendations-btn" onClick={fetchRecommendations}>
        Get Recommendations
      </button>

      {loading && ( // show loading animation when loading is true
        <canvas
          id="dotlottie-canvas"
          style={{ width: '150px', height: '150px', margin: '20px auto', display: 'block', backgroundColor: 'transparent' }}
        ></canvas>
      )}

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>} {/* display error message if any */}

      {recommendations.length > 0 && ( // display recommendations if the array is not empty
        <div>
          <h2>Your Recommendations</h2>
          <ul className="recommendation-list">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li> // display each recommendation in a list item
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecommendationPage; // export the recommendation page component
