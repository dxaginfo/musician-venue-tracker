import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import logger from '../utils/logger';

interface JwtPayload {
  id: string;
}

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication required. No token provided.',
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    // Find user by id
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        message: 'Invalid token. User not found.',
      });
    }
    
    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error}`);
    return res.status(401).json({
      message: 'Authentication failed. Invalid token.',
    });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentication required.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden. You do not have permission to access this resource.',
      });
    }

    next();
  };
};