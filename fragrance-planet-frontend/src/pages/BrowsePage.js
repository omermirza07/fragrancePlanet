import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

function BrowsePage() {
  const [colognes, setColognes] = useState([]);

  useEffect(() => {
    async function fetchColognes() {
      try {
        const response = await axios.get('http://localhost:5000/api/colognes');
        setColognes(response.data);
      } catch (error) {
        console.error('Error fetching colognes:', error);
      }
    }
    fetchColognes();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Browse Our Colognes
      </Typography>
      <Grid container spacing={3}>
        {colognes.map((cologne) => (
          <Grid item xs={12} sm={6} md={4} key={cologne.id}>
            <Card>
              <CardMedia
                component="img"
                alt={cologne.name}
                height="200"
                image={`http://localhost:5000${cologne.imagePath}`}
              />
              <CardContent>
                <Typography variant="h6">{cologne.name}</Typography>
                <Typography variant="body2">{cologne.description}</Typography>
                <Typography variant="subtitle1" color="secondary">
                  ${cologne.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BrowsePage;
