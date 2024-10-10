const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cologneRoutes = require('./routes/cologneRoutes');
const sequelize = require('./config/db');

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
app.use('/api', cologneRoutes);

// Default route to handle root requests
app.get('/', (req, res) => {
  res.send('Welcome to Fragrance Planet API');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
