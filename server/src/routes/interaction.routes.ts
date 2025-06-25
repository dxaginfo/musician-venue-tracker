import { Router } from 'express';
import { body } from 'express-validator';
import {
  createInteraction,
  getInteractions,
  getInteractionById,
  updateInteraction,
  deleteInteraction,
  getInteractionsByVenue,
  getUpcomingFollowUps,
} from '../controllers/interaction.controller';

const router = Router();

// Get all interactions
router.get('/', getInteractions);

// Get interactions by venue
router.get('/venue/:venueId', getInteractionsByVenue);

// Get upcoming follow-ups
router.get('/followups', getUpcomingFollowUps);

// Get interaction by ID
router.get('/:id', getInteractionById);

// Create a new interaction
router.post(
  '/',
  [
    body('type').notEmpty().withMessage('Interaction type is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('venueId').notEmpty().withMessage('Venue ID is required'),
  ],
  createInteraction
);

// Update an interaction
router.put('/:id', updateInteraction);

// Delete an interaction
router.delete('/:id', deleteInteraction);

export default router;