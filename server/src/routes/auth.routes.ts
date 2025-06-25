import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getMe, forgotPassword, resetPassword, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Register user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
  ],
  register
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

// Get current user
router.get('/me', authenticate, getMe);

// Logout user
router.post('/logout', authenticate, logout);

// Forgot password
router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  forgotPassword
);

// Reset password
router.put(
  '/reset-password/:resetToken',
  [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  resetPassword
);

export default router;