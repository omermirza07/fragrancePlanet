import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import BrowsePage from './pages/BrowsePage';  // Import BrowsePage
import Dashboard from './pages/Dashboard';     // Updated import to reflect new location

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Add route for Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
