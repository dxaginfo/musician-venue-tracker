import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import Interaction from '../models/interaction.model';
import Venue from '../models/venue.model';
import logger from '../utils/logger';

// @desc    Get all interactions for the current user
// @route   GET /api/interactions
// @access  Private
export const getInteractions = async (req: Request, res: Response) => {
  try {
    const interactions = await Interaction.findAll({
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

    res.json(interactions);
  } catch (error) {
    logger.error(`Error fetching interactions: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get an interaction by ID
// @route   GET /api/interactions/:id
// @access  Private
export const getInteractionById = async (req: Request, res: Response) => {
  try {
    const interaction = await Interaction.findOne({
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

    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }

    res.json(interaction);
  } catch (error) {
    logger.error(`Error fetching interaction: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new interaction
// @route   POST /api/interactions
// @access  Private
export const createInteraction = async (req: Request, res: Response) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Add the user ID to the interaction data
    const interactionData = {
      ...req.body,
      userId: req.user.id,
    };

    const interaction = await Interaction.create(interactionData);

    // Fetch the created interaction with venue details
    const createdInteraction = await Interaction.findByPk(interaction.id, {
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
    });

    res.status(201).json(createdInteraction);
  } catch (error) {
    logger.error(`Error creating interaction: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update an interaction
// @route   PUT /api/interactions/:id
// @access  Private
export const updateInteraction = async (req: Request, res: Response) => {
  try {
    const interaction = await Interaction.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }

    // Update interaction
    await interaction.update(req.body);

    // Fetch the updated interaction with venue details
    const updatedInteraction = await Interaction.findByPk(interaction.id, {
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
    });

    res.json(updatedInteraction);
  } catch (error) {
    logger.error(`Error updating interaction: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an interaction
// @route   DELETE /api/interactions/:id
// @access  Private
export const deleteInteraction = async (req: Request, res: Response) => {
  try {
    const interaction = await Interaction.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }

    await interaction.destroy();

    res.json({ message: 'Interaction removed' });
  } catch (error) {
    logger.error(`Error deleting interaction: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get interactions by venue
// @route   GET /api/interactions/venue/:venueId
// @access  Private
export const getInteractionsByVenue = async (req: Request, res: Response) => {
  try {
    const { venueId } = req.params;

    const interactions = await Interaction.findAll({
      where: {
        venueId,
        userId: req.user.id,
      },
      order: [['date', 'DESC']],
    });

    res.json(interactions);
  } catch (error) {
    logger.error(`Error fetching interactions by venue: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get recent interactions
// @route   GET /api/interactions/recent
// @access  Private
export const getRecentInteractions = async (req: Request, res: Response) => {
  try {
    const interactions = await Interaction.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'name', 'city', 'country'],
        },
      ],
      order: [['date', 'DESC']],
      limit: 10,
    });

    res.json(interactions);
  } catch (error) {
    logger.error(`Error fetching recent interactions: ${error}`);
    res.status(500).json({ message: 'Server error' });
  }
};