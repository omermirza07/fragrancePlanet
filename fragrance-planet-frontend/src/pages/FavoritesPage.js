// import necessary dependencies for the favorites page
import React, { useEffect, useState } from 'react'; // react hooks for state management and side effects
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material'; // material-ui components for layout and styling
import axios from 'axios'; // library for making http requests

function FavoritesPage() {
  // state to store the user's favorite colognes
  const [favorites, setFavorites] = useState([]);
  // state to store the dynamic gradient background
  const [gradient, setGradient] = useState('');
  // get user id from local storage
  const userId = window.localStorage.getItem("userID");
  // get jwt token from local storage
  const token = window.localStorage.getItem("token");

  // useEffect to fetch user's favorite colognes when the component loads
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await axios.get(`http://localhost:5000/api/favorites/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }, // include jwt token for authentication
        });

        // fetch details of favorite colognes by their ids
        const cologneIds = response.data.map((fav) => fav.cologneId);
        const cologneResponses = await Promise.all(
          cologneIds.map((id) => axios.get(`http://localhost:5000/api/colognes/${id}`))
        );

        const colognes = cologneResponses.map((response) => response.data); // extract cologne data
        setFavorites(colognes); // update favorites state with fetched cologne data
      } catch (error) {
        console.error('Error fetching favorites:', error); // log error if fetching fails
      }
    }

    if (userId) {
      fetchFavorites(); // call the function to fetch favorites if user is logged in
    }
  }, [userId, token]); // dependencies to re-run the effect when they change

  // useEffect to dynamically generate gradient background based on page elements
  useEffect(() => {
    const extractColors = () => {
      const elements = document.querySelectorAll('*'); // select all elements on the page
      const colors = new Set();

      elements.forEach((el) => {
        const styles = window.getComputedStyle(el);
        const backgroundColor = styles.backgroundColor;

        // filter out invalid or transparent colors
        if (
          backgroundColor &&
          backgroundColor !== 'rgba(0, 0, 0, 0)' &&
          backgroundColor !== 'transparent'
        ) {
          colors.add(backgroundColor); // add background color to the set
        }
      });

      const colorArray = Array.from(colors); // convert set to array
      if (colorArray.length) {
        setGradient(`linear-gradient(to bottom, ${colorArray.join(', ')})`); // create gradient from collected colors
      } else {
        setGradient('white'); // fallback to white if no colors are found
      }
    };

    // run the color extraction on page load and whenever the component updates
    extractColors();

    // observe changes in the document body and re-run the extraction if needed
    const observer = new MutationObserver(extractColors);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => {
      observer.disconnect(); // clean up the observer when the component unmounts
    };
  }, [favorites]); // dependency to re-run the effect when favorites change

  return (
    <Box
      sx={{
        padding: 4, // add padding around the content
        minHeight: '100vh', // ensure minimum height of full viewport
        background: gradient, // set dynamic gradient background
        transition: 'background 0.5s ease', // smooth transition for background changes
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Your Favorite Colognes
      </Typography>
      {favorites.length === 0 ? ( // display message if no favorites are found
        <Typography variant="body1" color="text.secondary">
          You have no favorites yet. Start browsing and add your favorite colognes!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((cologne) => ( // map through each favorite cologne and display it in a grid
            <Grid item xs={12} sm={6} md={3} key={cologne.id}>
              <Card sx={{ height: '100%' }}> {/* card to display cologne details */}
                <CardMedia
                  component="img"
                  alt={cologne.name} // set alt text for the image
                  height="250"
                  image={`http://localhost:5000${cologne.imagePath}`} // set the image source
                  sx={{ objectFit: 'contain', maxHeight: 250 }} // ensure the image fits within the card
                />
                <CardContent>
                  <Typography variant="h6">{cologne.name}</Typography> {/* display cologne name */}
                  <Typography variant="body2" color="text.secondary">
                    {cologne.description} {/* display cologne description */}
                  </Typography>
                  <Typography variant="subtitle1" color="secondary">
                    ${cologne.price} {/* display cologne price */}
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

export default FavoritesPage; // export the favorites page component
