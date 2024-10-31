import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Check if the user is logged in from localStorage
        const isLoggedIn = window.localStorage.getItem("loggedIn");
        const storedUsername = window.localStorage.getItem("user");
        if (isLoggedIn) {
            setLoggedIn(true);
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem("loggedIn");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("userID");
        setLoggedIn(false);
        navigate("/");
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
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            Welcome, {username}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                        <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
                    </>
                )}
                <Button color="inherit" onClick={() => navigate('/about')}>About Us</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
