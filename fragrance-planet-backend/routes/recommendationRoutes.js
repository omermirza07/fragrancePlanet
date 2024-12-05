const express = require('express');
const axios = require('axios');
const db = require('../config/db'); // Non-promise version of mysql2
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// OpenAI API Key
const OPENAI_API_KEY = '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';

// Route to generate recommendations
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id; // Extract user ID from the JWT

  console.log('Step 1: User ID from Token:', userId);

  try {
    console.log('Step 2: Fetching favorites for user...');

    // Callback-based query to fetch user favorites
    db.query(
      `SELECT c.description FROM favorites f
       JOIN colognes c ON f.cologneId = c.id
       WHERE f.userId = ?`,
      [userId],
      (err, favorites) => {
        if (err) {
          console.error('Error fetching favorites:', err);
          return res.status(500).json({ message: 'Failed to fetch favorites.' });
        }

        console.log('Step 3: Favorites fetched from database:', favorites);

        if (favorites.length === 0) {
          console.log('Step 4: No favorites found for the user.');
          return res.status(400).json({ message: 'No favorites found to base recommendations on.' });
        }

        const favoriteNotes = favorites.map((fav) => fav.description).join(', ');

        console.log('Step 5: Favorite notes for OpenAI:', favoriteNotes);

        // Send request to OpenAI API
        axios
          .post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-4',
              messages: [
                { role: 'system', content: 'You are an expert fragrance advisor.' },
                { role: 'user', content: `Based on these fragrance notes: ${favoriteNotes}, recommend 3 similar colognes.` },
              ],
              max_tokens: 300,
            },
            {
              headers: {
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            console.log('Step 6: OpenAI API Response:', response.data);

            // Parse recommendations from OpenAI response
            const recommendations = response.data.choices[0].message.content
              .split('\n')
              .filter((line) => line.trim() !== ''); // Remove empty lines

            console.log('Step 7: Recommendations:', recommendations);
            return res.json({ recommendations });
          })
          .catch((apiError) => {
            console.error('Step 8: OpenAI API Error:', apiError.message);
            return res.status(500).json({ message: 'Failed to generate recommendations.', error: apiError.message });
          });
      }
    );
  } catch (error) {
    console.error('Step 9: General Error:', error.message);
    return res.status(500).json({ message: 'Unexpected error occurred.', error: error.message });
  }
});

module.exports = router;
