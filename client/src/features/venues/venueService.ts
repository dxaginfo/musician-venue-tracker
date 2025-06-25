import axios from 'axios';
import { Venue } from './venueSlice';

const API_URL = '/api/venues/';

// Create axios instance with auth header
const createAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all venues
const getVenues = async (token: string) => {
  const config = createAuthHeader(token);
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get venue by ID
const getVenueById = async (venueId: string, token: string) => {
  const config = createAuthHeader(token);
  const response = await axios.get(API_URL + venueId, config);
  return response.data;
};

// Create new venue
const createVenue = async (venueData: Partial<Venue>, token: string) => {
  const config = createAuthHeader(token);
  const response = await axios.post(API_URL, venueData, config);
  return response.data;
};

// Update venue
const updateVenue = async (venueId: string, venueData: Partial<Venue>, token: string) => {
  const config = createAuthHeader(token);
  const response = await axios.put(API_URL + venueId, venueData, config);
  return response.data;
};

// Delete venue
const deleteVenue = async (venueId: string, token: string) => {
  const config = createAuthHeader(token);
  const response = await axios.delete(API_URL + venueId, config);
  return response.data;
};

// Search venues
const searchVenues = async (query: string, token: string) => {
  const config = createAuthHeader(token);
  const response = await axios.get(API_URL + 'search/' + query, config);
  return response.data;
};

const venueService = {
  getVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
  searchVenues,
};

export default venueService;
