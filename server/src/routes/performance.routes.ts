import { Router } from 'express';
import { body } from 'express-validator';
import {
  createPerformance,
  getPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
  getPerformancesByVenue,
  getUpcomingPerformances,
  getPastPerformances,
} from '../controllers/performance.controller';

const router = Router();

// Get all performances
router.get('/', getPerformances);

// Get performances by venue
router.get('/venue/:venueId', getPerformancesByVenue);

// Get upcoming performances
router.get('/upcoming', getUpcomingPerformances);

// Get past performances
router.get('/past', getPastPerformances);

// Get performance by ID
router.get('/:id', getPerformanceById);

// Create a new performance
router.post(
  '/',
  [
    body('date').notEmpty().withMessage('Date is required'),
    body('startTime').notEmpty().withMessage('Start time is required'),
    body('endTime').notEmpty().withMessage('End time is required'),
    body('eventName').notEmpty().withMessage('Event name is required'),
    body('venueId').notEmpty().withMessage('Venue ID is required'),
  ],
  createPerformance
);

// Update a performance
router.put('/:id', updatePerformance);

// Delete a performance
router.delete('/:id', deletePerformance);

export default router;