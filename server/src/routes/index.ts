import { Router } from 'express';
import authRoutes from './auth.routes';
import venueRoutes from './venue.routes';
import interactionRoutes from './interaction.routes';
import performanceRoutes from './performance.routes';
import userRoutes from './user.routes';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// Protected routes - require authentication
router.use('/venues', authenticate, venueRoutes);
router.use('/interactions', authenticate, interactionRoutes);
router.use('/performances', authenticate, performanceRoutes);
router.use('/users', authenticate, userRoutes);

export default router;