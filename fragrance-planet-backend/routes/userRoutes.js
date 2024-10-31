// /fragrance-planet-backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists based on username or email
    const userExistsQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(userExistsQuery, [username, email], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [username, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const findUserQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(findUserQuery, [username], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (result.length === 0) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      const user = result[0];

      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Verify that JWT_SECRET is accessible
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET missing' });
      }

      // Log the JWT secret for debugging purposes (remove this in production)
      console.log("JWT_SECRET:", process.env.JWT_SECRET);

      // Create and send JWT
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
