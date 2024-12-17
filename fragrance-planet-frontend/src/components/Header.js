// src/components/Header.js

import React from 'react'; // import react library
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material'; // import material-ui components
import { useNavigate } from 'react-router-dom'; // import navigate function for route changes
import MenuIcon from '@mui/icons-material/Menu'; // import menu icon from material-ui icons

function Header({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate(); // get the navigate function for redirecting to different routes

  // check if the user is logged in by retrieving value from local storage
  const loggedIn = window.localStorage.getItem("loggedIn") === "true";
  const username = window.localStorage.getItem("user"); // get the logged-in user's name

  // function to handle logout process
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn"); // remove logged-in status
    window.localStorage.removeItem("user"); // remove user info
    window.localStorage.removeItem("userID"); // remove user ID
    window.localStorage.removeItem("token"); // remove jwt token
    navigate('/login'); // redirect user to the login page
  };

  return (
    <AppBar
      position="sticky" // make the header stick to the top
      color="primary"   // set the color of the header
      sx={{
        paddingLeft: isSidebarOpen ? '250px' : '0px', // shift padding if sidebar is open
        transition: 'padding-left 0.3s ease', // smooth transition for padding changes
      }}
    >
      <Toolbar>
        {!isSidebarOpen && ( // show menu button only when sidebar is closed
          <IconButton
            onClick={toggleSidebar} // call function to toggle sidebar
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }} // add margin to the right of the icon button
          >
            <MenuIcon /> {/* display the menu icon */}
          </IconButton>
        )}

        <Typography
          variant="h6" // use the h6 style for the title
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }} // make title take up available space and clickable
          onClick={() => navigate('/')} // navigate to the home page when clicked
          color='#F8D87E' // set the color of the title text
        >
          Fragrance Planet
        </Typography>

        {loggedIn ? ( // if the user is logged in, show welcome message and logout button
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {username} {/* display the logged-in user's name */}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout {/* logout button */}
            </Button>
          </Box>
        ) : ( // if not logged in, show login and sign-up buttons
          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login {/* login button */}
            </Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>
              Sign Up {/* sign-up button */}
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header; // export the Header component for use in other parts of the app
