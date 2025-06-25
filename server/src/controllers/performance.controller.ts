import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Performance from '../models/performance.model';
import Venue from '../models/venue.model';
import logger from '../utils/logger';

// @desc    Get all performances for the current user
// @route   GET /api/performances
// @access  Private
export const getPerformances = async (req: Request, res: Response) => {
  try {
    const performances = await Performance.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
      order: [['date', 'DESC']],
    });

    res.json(performances);
  } catch (error) {
    logger.error(`Error fetching performances: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a performance by ID
// @route   GET /api/performances/:id
// @access  Private
export const getPerformanceById = async (req: Request, res: Response) => {
  try {
    const performance = await Performance.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country', 'address', 'venueType'],
        },
      ],
    });

    if (!performance) {
      return res.status(404).json({ message: 'Performance not found' });
    }

    res.json(performance);
  } catch (error) {
    logger.error(`Error fetching performance: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new performance
// @route   POST /api/performances
// @access  Private
export const createPerformance = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Add the user ID to the performance data
    const performanceData = {
      ...req.body,
      userId: req.user.id,
    };

    const performance = await Performance.create(performanceData);

    // Update the venue's lastPerformedAt date
    await Venue.update(
      { lastPerformedAt: performance.date },
      {
        where: {
          id: performance.venueId,
          userId: req.user.id,
        },
      }
    );

    // Fetch the created performance with venue details
    const createdPerformance = await Performance.findByPk(performance.id, {
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
    });

    res.status(201).json(createdPerformance);
  } catch (error) {
    logger.error(`Error creating performance: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a performance
// @route   PUT /api/performances/:id
// @access  Private
export const updatePerformance = async (req: Request, res: Response) => {
  try {
    const performance = await Performance.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!performance) {
      return res.status(404).json({ message: 'Performance not found' });
    }

    // Update performance
    await performance.update(req.body);

    // If the date is updated, update the venue's lastPerformedAt date
    if (req.body.date) {
      await Venue.update(
        { lastPerformedAt: req.body.date },
        {
          where: {
            id: performance.venueId,
            userId: req.user.id,
          },
        }
      );
    }

    // Fetch the updated performance with venue details
    const updatedPerformance = await Performance.findByPk(performance.id, {
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
    });

    res.json(updatedPerformance);
  } catch (error) {
    logger.error(`Error updating performance: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a performance
// @route   DELETE /api/performances/:id
// @access  Private
export const deletePerformance = async (req: Request, res: Response) => {
  try {
    const performance = await Performance.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!performance) {
      return res.status(404).json({ message: 'Performance not found' });
    }

    await performance.destroy();

    // Update venue's lastPerformedAt with the most recent performance
    const latestPerformance = await Performance.findOne({
      where: {
        venueId: performance.venueId,
        userId: req.user.id,
      },
      order: [['date', 'DESC']],
    });

    if (latestPerformance) {
      await Venue.update(
        { lastPerformedAt: latestPerformance.date },
        {
          where: {
            id: performance.venueId,
            userId: req.user.id,
          },
        }
      );
    } else {
      await Venue.update(
        { lastPerformedAt: null },
        {
          where: {
            id: performance.venueId,
            userId: req.user.id,
          },
        }
      );
    }

    res.json({ message: 'Performance removed' });
  } catch (error) {
    logger.error(`Error deleting performance: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get performances by venue
// @route   GET /api/performances/venue/:venueId
// @access  Private
export const getPerformancesByVenue = async (req: Request, res: Response) => {
  try {
    const { venueId } = req.params;

    const performances = await Performance.findAll({
      where: {
        venueId,
        userId: req.user.id,
      },
      order: [['date', 'DESC']],
    });

    res.json(performances);
  } catch (error) {
    logger.error(`Error fetching performances by venue: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get upcoming performances
// @route   GET /api/performances/upcoming
// @access  Private
export const getUpcomingPerformances = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const performances = await Performance.findAll({
      where: {
        userId: req.user.id,
        date: {
          [Op.gte]: today,
        },
        isCancelled: false,
      },
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
      order: [['date', 'ASC']],
    });

    res.json(performances);
  } catch (error) {
    logger.error(`Error fetching upcoming performances: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get past performances
// @route   GET /api/performances/past
// @access  Private
export const getPastPerformances = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const performances = await Performance.findAll({
      where: {
        userId: req.user.id,
        date: {
          [Op.lt]: today,
        },
      },
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
      order: [['date', 'DESC']],
    });

    res.json(performances);
  } catch (error) {
    logger.error(`Error fetching past performances: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};