import { Router } from 'express';
import { body } from 'express-validator';
import {
  createInteraction,
  getInteractions,
  getInteractionById,
  updateInteraction,
  deleteInteraction,
  getInteractionsByVenue,
  getRecentInteractions,
} from '../controllers/interaction.controller';

const router = Router();

// Get all interactions
router.get('/', getInteractions);

// Get interactions by venue
router.get('/venue/:venueId', getInteractionsByVenue);

// Get recent interactions
router.get('/recent', getRecentInteractions);

// Get interaction by ID
router.get('/:id', getInteractionById);

// Create a new interaction
router.post(
  '/',
  [
    body('venueId').notEmpty().withMessage('Venue ID is required'),
    body('interactionType').notEmpty().withMessage('Interaction type is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('contactName').optional(),
    body('contactEmail').optional().isEmail().withMessage('Please provide a valid email'),
    body('contactPhone').optional(),
    body('notes').optional(),
    body('followUpDate').optional(),
    body('outcome').optional(),
  ],
  createInteraction
);

// Update an interaction
router.put('/:id', updateInteraction);

// Delete an interaction
router.delete('/:id', deleteInteraction);

export default router;