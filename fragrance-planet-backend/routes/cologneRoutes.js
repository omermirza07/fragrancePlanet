const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to get all colognes
router.get('/colognes', (req, res) => {
  const query = 'SELECT * FROM colognes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching colognes:', err);
      res.status(500).json({ error: 'Failed to fetch colognes' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
