import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // Check if the user is logged in
  const loggedIn = window.localStorage.getItem("loggedIn") === "true";
  const username = window.localStorage.getItem("user");

  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Fragrance Planet
        </Typography>
        {loggedIn ? (
          <>
            <Box sx={{ marginRight: 2 }}>
              <Typography variant="body1">
                Welcome, {username}
              </Typography>
            </Box>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate('/browse')}>Browse</Button>
            <Button color="inherit" onClick={() => navigate('/favorites')}>Favorites</Button> {/* New button for Favorites */}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
          </>
        )}
        <Button color="inherit">About Us</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
