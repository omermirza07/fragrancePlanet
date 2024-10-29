const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to get all colognes with sorting
router.get('/', (req, res) => { // Changed '/colognes' to '/'
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

module.exports = router;
