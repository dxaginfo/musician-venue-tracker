import { Router } from 'express';
import { body } from 'express-validator';
import {
  updateUserProfile,
  getUserProfile,
  changePassword,
} from '../controllers/user.controller';

const router = Router();

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile
router.put(
  '/profile',
  [
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
    body('phone').optional(),
    body('bandName').optional(),
    body('genre').optional(),
    body('website').optional().isURL().withMessage('Please provide a valid URL'),
    body('bio').optional(),
    body('city').optional(),
    body('state').optional(),
    body('country').optional(),
  ],
  updateUserProfile
);

// Change password
router.put(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long'),
  ],
  changePassword
);

export default router;