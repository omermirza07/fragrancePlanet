import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '90vh',
        width: '95vw',
        backgroundColor: '#eae6f3',
      }}
    >
      {/* Background Images with Blur */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '90%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          backgroundImage: `
            url('/scent1.png'),
            url('/scent3.png'),
            url('/scent2.png')`,
          backgroundSize: '33.33% 100%', // Each image takes one-third of the width
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left, center, right',
          filter: 'blur(10px)', // Apply blur effect
          zIndex: 1, // Keep it behind the text
        }}
      ></Box>

      {/* Content Overlay */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2, // Keep text above the blurred background
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Playfair Display", serif', // Classy serif font
            color: '#F8D87E', // Change to white for better readability
            textShadow: '0 0 10px rgba(0, 0, 0, 0.7)', // Add text shadow
          }}
          gutterBottom
        >
          Fragrance Planet
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Times New Roman',
            color: '#F5F5DC', // White color
            textShadow: '0 0 8px rgba(0, 0, 0, 0.6)', // Subtle shadow
          }}
          gutterBottom
        >
          Find Your Perfect Fragrance
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Times New Roman',
            color: '#F5F5DC', // Slightly off-white for variety
            textShadow: '0 0 6px rgba(0, 0, 0, 0.5)', // Shadow for better readability
          }}
          align="center"
        >
          Discover scents that suit your personality. Let us recommend something special for you.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 3 }}
          onClick={() => navigate('/browse')}
        >
          Browse Now
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
