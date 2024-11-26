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

            {/* Collage Section */}
            <div className="image-collage">
                <img src="/ambers.jpg" alt="Cologne 1" className="collage-image" />
                <img src="/floral.jpg" alt="Cologne 2" className="collage-image" />
                <img src="/fresh.jpg" alt="Cologne 3" className="collage-image" />
                <img src="/woody.jpg" alt="Cologne 4" className="collage-image" />
                <img src="/ginger.jpg" alt="Cologne 5" className = "collage-image"/>
                <img src="/marigold.jpg" alt="Cologne 6" className = "collage-image"/>
                <img src="/mugwort.jpg" alt="Cologne 7" className = "collage-image"/>
                <img src="/pepper.jpg" alt="Cologne 8" className = "collage-image"/>
                <img src="/purple.jpg" alt="Cologne 9" className = "collage-image"/>
                <img src="/persimmon.jpg" alt="Cologne 10" className = "collage-image"/>
                <img src="/litchi.jpg" alt="Cologne 11" className = "collage-image"/>
                <img src="/rosemary.jpg" alt="Cologne 12" className = "collage-image"/>
                <img src="/fire lily.jpg" alt="Cologne 13" className = "collage-image"/>
                <img src="/cardomom.jpg" alt="Cologne 15" className = "collage-image"/>
                <img src="/tobacco.jpg" alt="Cologne 14" className = "collage-image"/>
                <img src="/coffee.jpg" alt="Cologne 16" className = "collage-image"/>
                <img src="/coral.jpg" alt="Cologne 17" className = "collage-image"/>
                <img src="/whiskey.jpg" alt="Cologne 18" className = "collage-image"/>
                <img src="/leather.jpg" alt="Cologne 19" className = "collage-image"/>
            </div>
        </div>
    );
};

export default Dashboard;
