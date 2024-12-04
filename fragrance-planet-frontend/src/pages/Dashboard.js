import React from 'react';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const username = window.localStorage.getItem("user");
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <Typography variant="h4" component="h1" gutterBottom className="dashboard-heading">
                Welcome, {username}!
            </Typography>
            <Typography variant="body1" className="dashboard-subheading">
                Start exploring your favorite colognes, add to your collection, and discover personalized recommendations just for you!
            </Typography>
            <Grid container spacing={3}>
                {/* Existing Cards */}
                {/* Browse Colognes */}
                <Grid item xs={12} md={4}>
                    <Card className="dashboard-card">
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Browse Colognes
                            </Typography>
                            <Typography variant="body2">
                                Discover a wide variety of colognes tailored to your taste.
                            </Typography>
                            <Button
                                variant="contained"
                                className="dashboard-button"
                                onClick={() => navigate('/browse')}
                            >
                                Start Browsing
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Favorites */}
                <Grid item xs={12} md={4}>
                    <Card className="dashboard-card">
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                View Favorites
                            </Typography>
                            <Typography variant="body2">
                                Keep track of your favorite colognes all in one place.
                            </Typography>
                            <Button
                                variant="contained"
                                className="dashboard-button"
                                onClick={() => navigate('/favorites')}
                            >
                                View Favorites
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Recommendations */}
                <Grid item xs={12} md={4}>
                    <Card className="dashboard-card">
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Recommendations
                            </Typography>
                            <Typography variant="body2">
                                Get personalized recommendations based on your preferences.
                            </Typography>
                            <Button
                                variant="contained"
                                className="dashboard-button"
                                onClick={() => navigate('/recommendations')}
                            >
                                Discover Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
