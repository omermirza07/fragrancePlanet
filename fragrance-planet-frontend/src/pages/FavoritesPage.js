import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const userId = window.localStorage.getItem("userID");
  const token = window.localStorage.getItem("token"); // Retrieve JWT token

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch details of favorite colognes by their IDs
        const cologneIds = response.data.map(fav => fav.cologneId);
        const cologneResponses = await Promise.all(
          cologneIds.map(id => axios.get(`http://localhost:5000/api/colognes/${id}`))
        );

        const colognes = cologneResponses.map(response => response.data);
        setFavorites(colognes);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }

    if (userId) {
      fetchFavorites();
    }
  }, [userId, token]);

  return (
    <Box sx={{ padding: 4 }}>
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
                  <Typography variant="body2" color="text.secondary">{cologne.description}</Typography>
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
