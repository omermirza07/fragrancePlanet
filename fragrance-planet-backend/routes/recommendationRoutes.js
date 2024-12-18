const express = require('express'); // import express library
const axios = require('axios'); // import axios for making API requests
const db = require('../config/db'); // import database connection (non-promise version of mysql2)
const authenticateToken = require('../middleware/authMiddleware'); // middleware to authenticate users using JWT

const router = express.Router(); // create a router instance for handling routes

// OpenAI API Key for making requests to the OpenAI API
const OPENAI_API_KEY = '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';

// route to generate fragrance recommendations
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id; // extract user ID from the JWT

  console.log('Step 1: User ID from Token:', userId); // log user ID for debugging

  try {
    console.log('Step 2: Fetching favorites for user...'); // log the action of fetching favorites

    // query to fetch the descriptions of user's favorite colognes
    db.query(
      `SELECT c.description FROM favorites f
       JOIN colognes c ON f.cologneId = c.id
       WHERE f.userId = ?`,
      [userId],
      (err, favorites) => {
        if (err) {
          console.error('Error fetching favorites:', err); // log error if the query fails
          return res.status(500).json({ message: 'Failed to fetch favorites.' }); // send error response
        }

        console.log('Step 3: Favorites fetched from database:', favorites); // log the fetched favorites

        if (favorites.length === 0) {
          console.log('Step 4: No favorites found for the user.'); // log when no favorites are found
          return res.status(400).json({ message: 'No favorites found to base recommendations on.' }); // send a 400 error response
        }

        // combine all favorite descriptions into a single string
        const favoriteNotes = favorites.map((fav) => fav.description).join(', ');

        console.log('Step 5: Favorite notes for OpenAI:', favoriteNotes); // log the favorite notes being sent to OpenAI

        // send a request to the OpenAI API with favorite notes
        axios
          .post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-4', // specify the OpenAI model
              messages: [
                { role: 'system', content: 'You are an expert fragrance advisor.' }, // system prompt for the AI
                { role: 'user', content: `Based on these fragrance notes: ${favoriteNotes}, recommend 3 similar colognes.` }, // user prompt with favorite notes
              ],
              max_tokens: 300, // set maximum token limit for the response
            },
            {
              headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`, // include API key in the request header
                'Content-Type': 'application/json', // specify content type
              },
            }
          )
          .then((response) => {
            console.log('Step 6: OpenAI API Response:', response.data); // log the response from the OpenAI API

            // parse recommendations from the API response
            const recommendations = response.data.choices[0].message.content
              .split('\n')
              .filter((line) => line.trim() !== ''); // filter out empty lines

            console.log('Step 7: Recommendations:', recommendations); // log the parsed recommendations
            return res.json({ recommendations }); // send the recommendations as a JSON response
          })
          .catch((apiError) => {
            console.error('Step 8: OpenAI API Error:', apiError.message); // log any errors from the OpenAI API
            return res.status(500).json({ message: 'Failed to generate recommendations.', error: apiError.message }); // send a 500 error response
          });
      }
    );
  } catch (error) {
    console.error('Step 9: General Error:', error.message); // log general errors
    return res.status(500).json({ message: 'Unexpected error occurred.', error: error.message }); // send a 500 error response
  }
});

module.exports = router; // export the router to use it in other parts of the app
