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

// Get venues by location
router.get('/location/:city/:country', getVenuesByLocation);

// Search venues
router.get('/search/:query', searchVenues);

// Get venue by ID
router.get('/:id', getVenueById);

// Create a new venue
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Venue name is required'),
    body('address').optional(),
    body('city').notEmpty().withMessage('City is required'),
    body('state').optional(),
    body('country').notEmpty().withMessage('Country is required'),
    body('venueType').optional(),
    body('capacity').optional().isNumeric().withMessage('Capacity must be a number'),
    body('contactName').optional(),
    body('contactEmail').optional().isEmail().withMessage('Please provide a valid email'),
    body('contactPhone').optional(),
    body('website').optional().isURL().withMessage('Please provide a valid URL'),
    body('notes').optional(),
  ],
  createVenue
);

// Update a venue
router.put('/:id', updateVenue);

// Delete a venue
router.delete('/:id', deleteVenue);

export default router;