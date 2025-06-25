import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VenueList from './pages/venues/VenueList';
import VenueDetail from './pages/venues/VenueDetail';
import VenueForm from './pages/venues/VenueForm';
import PerformanceList from './pages/performances/PerformanceList';
import PerformanceDetail from './pages/performances/PerformanceDetail';
import PerformanceForm from './pages/performances/PerformanceForm';
import InteractionList from './pages/interactions/InteractionList';
import InteractionDetail from './pages/interactions/InteractionDetail';
import InteractionForm from './pages/interactions/InteractionForm';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          {/* Venues */}
          <Route path="venues" element={<VenueList />} />
          <Route path="venues/new" element={<VenueForm />} />
          <Route path="venues/:id" element={<VenueDetail />} />
          <Route path="venues/:id/edit" element={<VenueForm />} />
          
          {/* Performances */}
          <Route path="performances" element={<PerformanceList />} />
          <Route path="performances/new" element={<PerformanceForm />} />
          <Route path="performances/:id" element={<PerformanceDetail />} />
          <Route path="performances/:id/edit" element={<PerformanceForm />} />
          
          {/* Interactions */}
          <Route path="interactions" element={<InteractionList />} />
          <Route path="interactions/new" element={<InteractionForm />} />
          <Route path="interactions/:id" element={<InteractionDetail />} />
          <Route path="interactions/:id/edit" element={<InteractionForm />} />
          
          {/* Profile */}
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
