import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import BrowsePage from './pages/BrowsePage';
import FavoritesPage from './pages/FavoritesPage';  // Import FavoritesPage
import Dashboard from './pages/Dashboard'; // Import Dashboard

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> {/* Add route for FavoritesPage */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
