const express = require('express'); // import the express library
const db = require('../config/db'); // import the database connection
const authenticateToken = require('../middleware/authMiddleware'); // middleware to authenticate users using JWT

const router = express.Router(); // create a router instance for handling routes

// endpoint to add a favorite cologne
router.post('/add', authenticateToken, (req, res) => {
  const { cologneId } = req.body; // get the cologne ID from the request body
  const userId = req.user.id; // get the authenticated user's ID from the token

  // insert a new favorite into the favorites table
  const query = 'INSERT INTO favorites (userId, cologneId) VALUES (?, ?)';
  db.query(query, [userId, cologneId], (err, results) => {
    if (err) {
      console.error('Error adding favorite:', err); // log the error if the query fails
      return res.status(500).json({ error: 'Failed to add favorite' }); // send a 500 error response
    }

    res.status(201).json({ message: 'Favorite added successfully' }); // send a success response
  });
});

// endpoint to remove a favorite cologne
router.delete('/remove', authenticateToken, (req, res) => {
  const { cologneId } = req.body; // get the cologne ID from the request body
  const userId = req.user.id; // get the authenticated user's ID from the token

  // delete the favorite entry from the favorites table
  const query = 'DELETE FROM favorites WHERE userId = ? AND cologneId = ?';
  db.query(query, [userId, cologneId], (err, results) => {
    if (err) {
      console.error('Error removing favorite:', err); // log the error if the query fails
      return res.status(500).json({ error: 'Failed to remove favorite' }); // send a 500 error response
    }

    res.status(200).json({ message: 'Favorite removed successfully' }); // send a success response
  });
});

// endpoint to get all favorite colognes of a user
router.get('/:userId', authenticateToken, (req, res) => {
  const userId = req.user.id; // get the authenticated user's ID from the token

  // select all cologne IDs from the favorites table for the user
  const query = 'SELECT cologneId FROM favorites WHERE userId = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching favorites:', err); // log the error if the query fails
      return res.status(500).json({ error: 'Failed to fetch favorites' }); // send a 500 error response
    }

    res.status(200).json(results); // send the list of favorite colognes as a response
  });
});

module.exports = router; // export the router to use it in other parts of the app
