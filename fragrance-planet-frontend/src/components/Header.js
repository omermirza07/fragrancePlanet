import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

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
                <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
                <Button color="inherit">About Us</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
