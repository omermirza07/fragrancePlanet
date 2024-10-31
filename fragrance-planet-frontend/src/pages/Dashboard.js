import React from 'react';

const Dashboard = () => {
    const username = window.localStorage.getItem("user");

    return (
        <div className="dashboard-container">
            <h2>Welcome, {username}!</h2>
            <p>Start browsing colognes, add to favorites, and discover new recommendations!</p>
            {/* You can add buttons or links here to navigate to different sections */}
            <button onClick={() => window.location.href = '/browse'}>Browse Colognes</button>
        </div>
    );
};

export default Dashboard;
