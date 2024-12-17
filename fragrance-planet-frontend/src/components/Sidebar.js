// import necessary dependencies for the sidebar component
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'; // icon for dashboard
import FavoriteIcon from '@mui/icons-material/Favorite'; // icon for favorites
import SearchIcon from '@mui/icons-material/Search'; // icon for browse/search
import InfoIcon from '@mui/icons-material/Info'; // icon for about us
import LogoutIcon from '@mui/icons-material/Logout'; // icon for logout
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // icon for recommendations
import { useNavigate, useLocation } from 'react-router-dom'; // hooks for navigation and location tracking
import './Sidebar.css'; // import custom css for styling

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate(); // hook for navigation
  const location = useLocation(); // hook for getting current route

  // function to handle logout action
  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn"); // remove login status from local storage
    window.localStorage.removeItem("user"); // remove user info from local storage
    window.localStorage.removeItem("userID"); // remove user id from local storage
    window.localStorage.removeItem("token"); // remove jwt token from local storage
    navigate('/login'); // navigate to login page after logout
  };

  // list of menu items with their icons and paths
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' }, // dashboard item
    { text: 'Browse', icon: <SearchIcon />, path: '/browse' }, // browse item
    { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' }, // favorites item
    { text: 'Recommendations', icon: <LightbulbIcon />, path: '/recommendations' }, // recommendations item
    { text: 'About Us', icon: <InfoIcon />, path: '/about' }, // about us item
  ];

  return (
    <>
      <Drawer
        anchor="left" // position of the sidebar on the left
        open={isSidebarOpen} // controls whether the sidebar is open or closed
        onClose={toggleSidebar} // function to close the sidebar
        PaperProps={{
          sx: {
            width: '250px', // set sidebar width
            background: 'linear-gradient(to bottom, #000000, #ffffff)', // gradient background color
            color: 'white', // text color
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text} // unique key for each menu item
              onClick={() => {
                navigate(item.path); // navigate to the selected menu item's path
                toggleSidebar(); // close the sidebar after navigation
              }}
              className={location.pathname === item.path ? 'active-menu-item' : ''} // highlight active menu item
            >
              <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon> {/* display menu item icon */}
              <ListItemText primary={item.text} /> {/* display menu item text */}
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout} style={{ marginTop: 'auto' }}> {/* logout button */}
            <ListItemIcon>
              <LogoutIcon style={{ color: '#FF6666' }} /> {/* logout icon with red color */}
            </ListItemIcon>
            <ListItemText primary="Logout" /> {/* display logout text */}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar; // export the Sidebar component for use in other parts of the app
