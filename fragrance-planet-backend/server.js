require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cologneRoutes = require('./routes/cologneRoutes');
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoritesRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes'); // Import recommendation routes
const errorHandler = require('./middleware/errorHandler');
const authenticateToken = require('./middleware/authMiddleware');

dotenv.config();
const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
}));

app.use(express.json()); // Middleware to parse JSON requests

// Serve static images (for colognes)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Use cologne routes
app.use('/api/colognes', cologneRoutes);

// Use user routes for signup and login
app.use('/api/users', userRoutes);

// Use favorite routes for adding/removing favorites (Protected routes with JWT)
app.use('/api/favorites', authenticateToken, favoriteRoutes);

// Use recommendation routes (Protected with JWT)
app.use('/api/recommendations', authenticateToken, recommendationRoutes);

// Default route to handle root requests
app.get('/', (req, res) => {
  res.send('Welcome to Fragrance Planet API');
});

// Error handler middleware (always add as the last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
