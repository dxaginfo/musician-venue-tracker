import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import logger from '../utils/logger';

// Extend the Express Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    // Check if token is in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
      // Verify token
      const secret = process.env.JWT_SECRET || 'default_secret';
      const decoded = jwt.verify(token, secret) as { id: string };

      // Get user from the token
      const user = await User.findByPk(decoded.id, {
        attributes: ['id', 'email'],
      });

      if (!user) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      }

      // Check if user is active
      if (!(await User.findOne({ where: { id: decoded.id, isActive: true } }))) {
        return res.status(401).json({ message: 'Account is inactive' });
      }

      // Set user in request
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      logger.error(`Token verification error: ${error}`);
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } catch (error) {
    logger.error(`Authentication error: ${error}`);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Not authorized to access this resource' });
      }

      next();
    } catch (error) {
      logger.error(`Authorization error: ${error}`);
      return res.status(500).json({ message: 'Server error' });
    }
  };
};