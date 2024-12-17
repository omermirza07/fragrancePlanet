// import necessary dependencies and components for the browse page
import React, { useEffect, useState } from 'react'; // react hooks for managing state and side effects
import { // material-ui components for layout and styling
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
import { Favorite, FavoriteBorder } from '@mui/icons-material'; // icons for favorite functionality
import axios from 'axios'; // library for making http requests

function BrowsePage() {
  // state to store the list of colognes
  const [colognes, setColognes] = useState([]);
  // state to store the selected sorting option
  const [sortBy, setSortBy] = useState('');
  // state to store the user's favorite colognes
  const [favorites, setFavorites] = useState([]);

  // get the user id from local storage
  const userId = window.localStorage.getItem('userID');
  // get the jwt token from local storage
  const token = window.localStorage.getItem('token'); 

  // useEffect to fetch colognes and favorites when the component loads or sorting changes
  useEffect(() => {
    async function fetchColognes() {
      try {
        let url = `http://localhost:5000/api/colognes`; // base url to fetch colognes
        if (sortBy) {
          url += `?sortBy=${sortBy}`; // append sort parameter if selected
        }
        const response = await axios.get(url); // make a get request to fetch colognes
        setColognes(response.data); // update colognes state with fetched data
      } catch (error) {
        console.error('Error fetching colognes:', error); // log error if fetching fails
      }
    }

    async function fetchFavorites() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/favorites/${userId}`, // url to fetch user's favorites
          {
            headers: { Authorization: `Bearer ${token}` }, // include jwt token in the request header
          }
        );
        setFavorites(response.data.map((fav) => fav.cologneId)); // get an array of favorite cologne ids
      } catch (error) {
        console.error('Error fetching favorites:', error); // log error if fetching favorites fails
      }
    }

    fetchColognes(); // call function to fetch colognes
    if (userId) {
      fetchFavorites(); // call function to fetch favorites if user is logged in
    }
  }, [sortBy, userId, token]); // dependencies to re-run the effect when they change

  // function to handle adding or removing a cologne from favorites
  const handleFavorite = async (cologneId) => {
    try {
      if (favorites.includes(cologneId)) {
        // if cologne is already a favorite, remove it
        await axios.delete('http://localhost:5000/api/favorites/remove', {
          data: { cologneId },
          headers: { Authorization: `Bearer ${token}` }, // include jwt token for authentication
        });
        setFavorites(favorites.filter((id) => id !== cologneId)); // update favorites state after removing
      } else {
        // if cologne is not a favorite, add it
        await axios.post(
          'http://localhost:5000/api/favorites/add',
          { cologneId }, // send cologne id to be added
          { headers: { Authorization: `Bearer ${token}` } } // include jwt token for authentication
        );
        setFavorites([...favorites, cologneId]); // update favorites state after adding
      }
    } catch (error) {
      console.error('Error updating favorites:', error); // log error if updating favorites fails
    }
  };

  return (
    <Box
      sx={{
        padding: 4, // add padding around the content
        minHeight: '100vh', // ensure minimum height of full viewport
        background: 'linear-gradient(to bottom, #FFFACD, black)' // gradient background
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Browse Our Colognes
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 4 }}>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)} // update sort state on selection
          displayEmpty
        >
          <MenuItem value="">Sort by...</MenuItem> {/* default sorting option */}
          <MenuItem value="price-asc">Price: Low to High</MenuItem> {/* option to sort by price ascending */}
          <MenuItem value="price-desc">Price: High to Low</MenuItem> {/* option to sort by price descending */}
          <MenuItem value="brand">Brand</MenuItem> {/* option to sort by brand */}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {colognes.map((cologne) => ( // map through each cologne and display it in a grid
          <Grid item xs={12} sm={6} md={3} key={cologne.id}>
            <Card
              sx={{
                height: '100%', // make the card take full height
                border: '2px solid black', // add a black border around the card
                borderRadius: '8px', // slightly round the card corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // add shadow for a polished look
              }}
            >
              <CardMedia
                component="img"
                alt={cologne.name}
                height="250"
                image={`http://localhost:5000${cologne.imagePath}`} // display cologne image
                sx={{
                  objectFit: 'contain', // ensure the image fits within the card
                  maxHeight: 250, // limit image height
                }}
              />
              <CardContent>
                <Typography variant="h6">{cologne.name}</Typography> {/* display cologne name */}
                <Typography variant="body2" color="text.secondary">
                  {cologne.description} {/* display cologne description */}
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  ${cologne.price} {/* display cologne price */}
                </Typography>
                <IconButton
                  onClick={() => handleFavorite(cologne.id)} // handle favorite button click
                  sx={{ color: favorites.includes(cologne.id) ? 'red' : 'default' }} // change color if cologne is a favorite
                >
                  {favorites.includes(cologne.id) ? <Favorite /> : <FavoriteBorder />} {/* show filled heart if favorite */}
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BrowsePage; // export the browse page component
