const express = require('express');
const db = require('../config/db');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware to authenticate users using JWT

const router = express.Router();

// Endpoint to add a favorite cologne
router.post('/add', authenticateToken, (req, res) => {
  const { cologneId } = req.body;
  const userId = req.user.id; // The authenticated user's ID from the token

  const query = 'INSERT INTO favorites (userId, cologneId) VALUES (?, ?)';
  db.query(query, [userId, cologneId], (err, results) => {
    if (err) {
      console.error('Error adding favorite:', err);
      return res.status(500).json({ error: 'Failed to add favorite' });
    }

    res.status(201).json({ message: 'Favorite added successfully' });
  });
});

// Endpoint to remove a favorite cologne
router.delete('/remove', authenticateToken, (req, res) => {
  const { cologneId } = req.body;
  const userId = req.user.id;

  const query = 'DELETE FROM favorites WHERE userId = ? AND cologneId = ?';
  db.query(query, [userId, cologneId], (err, results) => {
    if (err) {
      console.error('Error removing favorite:', err);
      return res.status(500).json({ error: 'Failed to remove favorite' });
    }

    res.status(200).json({ message: 'Favorite removed successfully' });
  });
});

module.exports = router;
