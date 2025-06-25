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

// Get upcoming performances
router.get('/upcoming', getUpcomingPerformances);

// Get past performances
router.get('/past', getPastPerformances);

// Get performances by venue
router.get('/venue/:venueId', getPerformancesByVenue);

// Get performance by ID
router.get('/:id', getPerformanceById);

// Create a new performance
router.post(
  '/',
  [
    body('venueId').notEmpty().withMessage('Venue ID is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('startTime').notEmpty().withMessage('Start time is required'),
    body('endTime').notEmpty().withMessage('End time is required'),
    body('eventName').notEmpty().withMessage('Event name is required'),
    body('description').optional(),
    body('audienceSize').optional().isNumeric().withMessage('Audience size must be a number'),
    body('payment').optional().isNumeric().withMessage('Payment must be a number'),
    body('isHeadliner').optional().isBoolean(),
    body('otherActs').optional(),
    body('setlistId').optional(),
    body('isCancelled').optional().isBoolean(),
    body('cancellationReason').optional(),
    body('notes').optional(),
  ],
  createPerformance
);

// Update a performance
router.put('/:id', updatePerformance);

// Delete a performance
router.delete('/:id', deletePerformance);

export default router;