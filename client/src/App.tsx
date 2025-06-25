import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

// Layout components
import Layout from './components/layout/Layout';
import AuthLayout from './components/layout/AuthLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Main application pages
import Dashboard from './pages/Dashboard';
import VenueList from './pages/venues/VenueList';
import VenueDetail from './pages/venues/VenueDetail';
import VenueForm from './pages/venues/VenueForm';
import InteractionList from './pages/interactions/InteractionList';
import InteractionForm from './pages/interactions/InteractionForm';
import PerformanceList from './pages/performances/PerformanceList';
import PerformanceDetail from './pages/performances/PerformanceDetail';
import PerformanceForm from './pages/performances/PerformanceForm';
import Analytics from './pages/analytics/Analytics';
import Settings from './pages/settings/Settings';
import UserProfile from './pages/profile/UserProfile';
import NotFound from './pages/NotFound';

// Auth actions and selectors
import { checkAuth } from './store/auth/authSlice';
import { selectIsAuthenticated, selectAuthChecking } from './store/auth/authSelectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authChecking = useSelector(selectAuthChecking);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (authChecking) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" />} />
      </Route>

      {/* Protected routes */}
      <Route element={<Layout />}>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        
        {/* Venues */}
        <Route path="/venues" element={isAuthenticated ? <VenueList /> : <Navigate to="/login" />} />
        <Route path="/venues/new" element={isAuthenticated ? <VenueForm /> : <Navigate to="/login" />} />
        <Route path="/venues/:id" element={isAuthenticated ? <VenueDetail /> : <Navigate to="/login" />} />
        <Route path="/venues/:id/edit" element={isAuthenticated ? <VenueForm /> : <Navigate to="/login" />} />
        
        {/* Interactions */}
        <Route path="/interactions" element={isAuthenticated ? <InteractionList /> : <Navigate to="/login" />} />
        <Route path="/interactions/new" element={isAuthenticated ? <InteractionForm /> : <Navigate to="/login" />} />
        <Route path="/interactions/:id/edit" element={isAuthenticated ? <InteractionForm /> : <Navigate to="/login" />} />
        
        {/* Performances */}
        <Route path="/performances" element={isAuthenticated ? <PerformanceList /> : <Navigate to="/login" />} />
        <Route path="/performances/new" element={isAuthenticated ? <PerformanceForm /> : <Navigate to="/login" />} />
        <Route path="/performances/:id" element={isAuthenticated ? <PerformanceDetail /> : <Navigate to="/login" />} />
        <Route path="/performances/:id/edit" element={isAuthenticated ? <PerformanceForm /> : <Navigate to="/login" />} />
        
        {/* Analytics */}
        <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} />
        
        {/* User profile and settings */}
        <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;