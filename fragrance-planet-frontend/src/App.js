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
import RecommendationPage from './pages/RecommendationPage'; // Import RecommendationPage

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {sidebarOpen && <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
        
        <div style={{ marginLeft: sidebarOpen ? '250px' : '0', width: '100%' }}>
          <Header isSidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recommendations" element={<RecommendationPage />} /> {/* Add Recommendations route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
