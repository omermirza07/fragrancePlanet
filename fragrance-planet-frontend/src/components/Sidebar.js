// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedIn");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("token");
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Browse', icon: <SearchIcon />, path: '/browse' },
    { text: 'Favorites', icon: <FavoriteIcon />, path: '/favorites' },
    { text: 'Recommendations', icon: <LightbulbIcon />, path: '/recommendations' },
    { text: 'About Us', icon: <InfoIcon />, path: '/about' },
  ];

  return (
    <>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={toggleSidebar}
        PaperProps={{
          sx: {
            width: '250px',
            background: 'linear-gradient(to bottom, #000000, #ffffff)',
            color: 'white',
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                toggleSidebar();
              }}
              className={location.pathname === item.path ? 'active-menu-item' : ''}
            >
              <ListItemIcon style={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout} style={{ marginTop: 'auto' }}>
            <ListItemIcon>
              <LogoutIcon style={{ color: '#FF6666' }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar;
