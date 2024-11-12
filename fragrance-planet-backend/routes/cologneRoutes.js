const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to get all colognes with sorting
router.get('/', (req, res) => {
  let query = 'SELECT DISTINCT * FROM colognes';
  const { sortBy } = req.query;

  // Append appropriate ORDER BY clause based on the sortBy query parameter
  if (sortBy === 'price-asc') {
    query += ' ORDER BY price ASC';
  } else if (sortBy === 'price-desc') {
    query += ' ORDER BY price DESC';
  } else if (sortBy === 'brand') {
    query += ' ORDER BY brand ASC';
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching colognes:', err);
      res.status(500).json({ error: 'Failed to fetch colognes' });
    } else {
      res.json(results);
    }
  });
});

// Route to get a single cologne by ID
router.get('/:id', (req, res) => {
  const cologneId = req.params.id;
  const query = 'SELECT * FROM colognes WHERE id = ?';

  db.query(query, [cologneId], (err, results) => {
    if (err) {
      console.error('Error fetching cologne by ID:', err);
      res.status(500).json({ error: 'Failed to fetch cologne' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Cologne not found' });
    } else {
      res.json(results[0]);
    }
  });
});

module.exports = router;
