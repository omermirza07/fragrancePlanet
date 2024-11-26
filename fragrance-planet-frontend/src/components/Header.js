// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function Header({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();

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
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        paddingLeft: isSidebarOpen ? '250px' : '0px', // Align with sidebar
        transition: 'padding-left 0.3s ease', // Smooth transition
      }}
    >
      <Toolbar>
        {!isSidebarOpen && (
          <IconButton
            onClick={toggleSidebar}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
          color='#F8D87E'
        >
          Fragrance Planet
        </Typography>

        {loggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
