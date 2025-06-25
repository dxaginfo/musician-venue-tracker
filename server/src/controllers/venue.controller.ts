import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Venue from '../models/venue.model';
import logger from '../utils/logger';

// @desc    Get all venues for the current user
// @route   GET /api/venues
// @access  Private
export const getVenues = async (req: Request, res: Response) => {
  try {
    const venues = await Venue.findAll({
      where: { userId: req.user.id },
      order: [['name', 'ASC']],
    });

    res.json(venues);
  } catch (error) {
    logger.error(`Error fetching venues: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a venue by ID
// @route   GET /api/venues/:id
// @access  Private
export const getVenueById = async (req: Request, res: Response) => {
  try {
    const venue = await Venue.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    res.json(venue);
  } catch (error) {
    logger.error(`Error fetching venue: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new venue
// @route   POST /api/venues
// @access  Private
export const createVenue = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Add the user ID to the venue data
    const venueData = {
      ...req.body,
      userId: req.user.id,
    };

    const venue = await Venue.create(venueData);

    res.status(201).json(venue);
  } catch (error) {
    logger.error(`Error creating venue: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a venue
// @route   PUT /api/venues/:id
// @access  Private
export const updateVenue = async (req: Request, res: Response) => {
  try {
    const venue = await Venue.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    // Update venue
    await venue.update(req.body);

    res.json(venue);
  } catch (error) {
    logger.error(`Error updating venue: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a venue
// @route   DELETE /api/venues/:id
// @access  Private
export const deleteVenue = async (req: Request, res: Response) => {
  try {
    const venue = await Venue.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    await venue.destroy();

    res.json({ message: 'Venue removed' });
  } catch (error) {
    logger.error(`Error deleting venue: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get venues by city and country
// @route   GET /api/venues/location/:city/:country
// @access  Private
export const getVenuesByLocation = async (req: Request, res: Response) => {
  try {
    const { city, country } = req.params;

    const venues = await Venue.findAll({
      where: {
        userId: req.user.id,
        city: {
          [Op.iLike]: `%${city}%`,
        },
        country: {
          [Op.iLike]: `%${country}%`,
        },
      },
      order: [['name', 'ASC']],
    });

    res.json(venues);
  } catch (error) {
    logger.error(`Error fetching venues by location: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search venues
// @route   GET /api/venues/search/:query
// @access  Private
export const searchVenues = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;

    const venues = await Venue.findAll({
      where: {
        userId: req.user.id,
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { address: { [Op.iLike]: `%${query}%` } },
          { city: { [Op.iLike]: `%${query}%` } },
          { state: { [Op.iLike]: `%${query}%` } },
          { country: { [Op.iLike]: `%${query}%` } },
          { venueType: { [Op.iLike]: `%${query}%` } },
        ],
      },
      order: [['name', 'ASC']],
    });

    res.json(venues);
  } catch (error) {
    logger.error(`Error searching venues: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};