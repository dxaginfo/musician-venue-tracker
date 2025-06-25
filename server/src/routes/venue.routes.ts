import { Router } from 'express';
import { body } from 'express-validator';
import {
  createVenue,
  getVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
  getVenuesByLocation,
  searchVenues,
} from '../controllers/venue.controller';

const router = Router();

// Get all venues
router.get('/', getVenues);

// Get venue by ID
router.get('/:id', getVenueById);

// Create a new venue
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Venue name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
  ],
  createVenue
);

// Update a venue
router.put('/:id', updateVenue);

// Delete a venue
router.delete('/:id', deleteVenue);

// Get venues by location
router.get('/location/:city/:country', getVenuesByLocation);

// Search venues
router.get('/search/:query', searchVenues);

export default router;