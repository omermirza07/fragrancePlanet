// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import BrowsePage from './pages/BrowsePage';
import FavoritesPage from './pages/FavoritesPage';
import Dashboard from './pages/Dashboard';
import RecommendationPage from './pages/RecommendationPage';
import AboutPage from './pages/AboutPage'; // Import the AboutPage
import './styles/App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar Component */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div style={{ flexGrow: 1, marginLeft: isSidebarOpen ? '250px' : '0', transition: 'margin-left 0.3s ease' }}>
          {/* Header */}
          <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Routes */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recommendations" element={<RecommendationPage />} />
              <Route path="/about" element={<AboutPage />} /> {/* Add the About Us route */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
