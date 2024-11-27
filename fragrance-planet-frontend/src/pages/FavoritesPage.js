import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [gradient, setGradient] = useState('');
  const userId = window.localStorage.getItem("userID");
  const token = window.localStorage.getItem("token"); // Retrieve JWT token

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch details of favorite colognes by their IDs
        const cologneIds = response.data.map((fav) => fav.cologneId);
        const cologneResponses = await Promise.all(
          cologneIds.map((id) => axios.get(`http://localhost:5000/api/colognes/${id}`))
        );

        const colognes = cologneResponses.map((response) => response.data);
        setFavorites(colognes);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }

    if (userId) {
      fetchFavorites();
    }
  }, [userId, token]);

  useEffect(() => {
    const extractColors = () => {
      const elements = document.querySelectorAll('*');
      const colors = new Set();

      elements.forEach((el) => {
        const styles = window.getComputedStyle(el);
        const backgroundColor = styles.backgroundColor;

        // Filter out invalid or transparent colors
        if (
          backgroundColor &&
          backgroundColor !== 'rgba(0, 0, 0, 0)' &&
          backgroundColor !== 'transparent'
        ) {
          colors.add(backgroundColor);
        }
      });

      const colorArray = Array.from(colors);
      if (colorArray.length) {
        setGradient(`linear-gradient(to bottom, ${colorArray.join(', ')})`);
      } else {
        setGradient('white'); // Fallback to white if no colors are found
      }
    };

    // Run the color extraction on page load and whenever the component updates
    extractColors();

    // Optionally re-run on window resize or other events (if needed for dynamic pages)
    const observer = new MutationObserver(extractColors);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [favorites]);

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: '100vh',
        background: gradient, // Dynamic gradient
        transition: 'background 0.5s ease', // Smooth transition for changes
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Your Favorite Colognes
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You have no favorites yet. Start browsing and add your favorite colognes!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((cologne) => (
            <Grid item xs={12} sm={6} md={3} key={cologne.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  alt={cologne.name}
                  height="250"
                  image={`http://localhost:5000${cologne.imagePath}`}
                  sx={{ objectFit: 'contain', maxHeight: 250 }}
                />
                <CardContent>
                  <Typography variant="h6">{cologne.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cologne.description}
                  </Typography>
                  <Typography variant="subtitle1" color="secondary">
                    ${cologne.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default FavoritesPage;
