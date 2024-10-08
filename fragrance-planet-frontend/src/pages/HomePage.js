import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
        padding: 4,
      }}
    >
      <Typography variant="h2" color="primary" gutterBottom>
        Find Your Perfect Fragrance
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center">
        Discover scents that suit your personality. Let us recommend something special for you.
      </Typography>
      <Button variant="contained" color="secondary" sx={{ marginTop: 3 }}>
        Browse Now
      </Button>
    </Box>
  );
}

export default HomePage;