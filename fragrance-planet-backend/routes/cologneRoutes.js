const express = require('express'); // import the express library
const router = express.Router(); // create a router instance for handling routes
const db = require('../config/db'); // import the database connection

// route to get all colognes with sorting options
router.get('/', (req, res) => {
  let query = 'SELECT DISTINCT * FROM colognes'; // base query to get all colognes
  const { sortBy } = req.query; // get the 'sortBy' query parameter from the request

  // add sorting based on the 'sortBy' parameter
  if (sortBy === 'price-asc') {
    query += ' ORDER BY price ASC'; // sort colognes by price in ascending order
  } else if (sortBy === 'price-desc') {
    query += ' ORDER BY price DESC'; // sort colognes by price in descending order
  } else if (sortBy === 'brand') {
    query += ' ORDER BY brand ASC'; // sort colognes by brand in ascending order
  }

  // execute the query to fetch colognes from the database
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching colognes:', err); // log the error if the query fails
      res.status(500).json({ error: 'Failed to fetch colognes' }); // send a 500 error response
    } else {
      res.json(results); // send the results as a json response
    }
  });
});

// route to get a single cologne by its ID
router.get('/:id', (req, res) => {
  const cologneId = req.params.id; // get the cologne ID from the route parameter
  const query = 'SELECT * FROM colognes WHERE id = ?'; // query to fetch a specific cologne by ID

  // execute the query with the cologne ID as a parameter
  db.query(query, [cologneId], (err, results) => {
    if (err) {
      console.error('Error fetching cologne by ID:', err); // log the error if the query fails
      res.status(500).json({ error: 'Failed to fetch cologne' }); // send a 500 error response
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Cologne not found' }); // send a 404 response if no cologne is found
    } else {
      res.json(results[0]); // send the first result as a json response
    }
  });
});

module.exports = router; // export the router to use it in other parts of the app
