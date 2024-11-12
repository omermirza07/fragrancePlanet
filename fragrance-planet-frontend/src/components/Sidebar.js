// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("token");
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <>
      <IconButton onClick={toggleDrawer} style={{ color: 'white', position: 'absolute', top: 16, left: 16 }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer} PaperProps={{ sx: { backgroundColor: '#333333', color: 'white' } }}>
        <List>
          <ListItem button onClick={() => navigate('/dashboard')}>
            <ListItemIcon><DashboardIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate('/browse')}>
            <ListItemIcon><SearchIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Browse" />
          </ListItem>
          <ListItem button onClick={() => navigate('/favorites')}>
            <ListItemIcon><FavoriteIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem button onClick={() => navigate('/about')}>
            <ListItemIcon><InfoIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
          <ListItem button onClick={handleLogout} style={{ marginTop: 'auto' }}>
            <ListItemIcon><LogoutIcon style={{ color: '#FF6666' }} /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
