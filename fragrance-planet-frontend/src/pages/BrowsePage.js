import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import axios from 'axios';

function BrowsePage() {
  const [colognes, setColognes] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [favorites, setFavorites] = useState([]);

  const userId = window.localStorage.getItem('userID');
  const token = window.localStorage.getItem('token'); // Retrieve JWT token

  useEffect(() => {
    async function fetchColognes() {
      try {
        let url = `http://localhost:5000/api/colognes`;
        if (sortBy) {
          url += `?sortBy=${sortBy}`;
        }
        const response = await axios.get(url);
        setColognes(response.data);
      } catch (error) {
        console.error('Error fetching colognes:', error);
      }
    }

    async function fetchFavorites() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/favorites/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites(response.data.map((fav) => fav.cologneId)); // Get an array of favorite cologne IDs
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }

    fetchColognes();
    if (userId) {
      fetchFavorites();
    }
  }, [sortBy, userId, token]);

  const handleFavorite = async (cologneId) => {
    try {
      if (favorites.includes(cologneId)) {
        // Remove from favorites
        await axios.delete('http://localhost:5000/api/favorites/remove', {
          data: { cologneId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favorites.filter((id) => id !== cologneId));
      } else {
        // Add to favorites
        await axios.post(
          'http://localhost:5000/api/favorites/add',
          { cologneId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFavorites([...favorites, cologneId]);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: '100vh', // Full viewport height
        // background: 'linear-gradient(to bottom, white, black)', // Gradient background
        background: 'linear-gradient(to bottom, #FFFACD, black)'

      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Browse Our Colognes
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 4 }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Sort by...</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="brand">Brand</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {colognes.map((cologne) => (
          <Grid item xs={12} sm={6} md={3} key={cologne.id}>
            <Card
              sx={{
                height: '100%',
                border: '2px solid black', // Add a black border around the card
                borderRadius: '8px', // Optional: Slightly round the card corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for a polished look
              }}
            >
              <CardMedia
                component="img"
                alt={cologne.name}
                height="250"
                image={`http://localhost:5000${cologne.imagePath}`}
                sx={{
                  objectFit: 'contain',
                  maxHeight: 250,
                }}
              />
              <CardContent>
                <Typography variant="h6">{cologne.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {cologne.description}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  ${cologne.price}
                </Typography>
                <IconButton
                  onClick={() => handleFavorite(cologne.id)}
                  sx={{ color: favorites.includes(cologne.id) ? 'red' : 'default' }}
                >
                  {favorites.includes(cologne.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BrowsePage;
