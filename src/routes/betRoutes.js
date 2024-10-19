// src/routes/betRoutes.js

import express from 'express';
import {
  placeBetController,
  getGGRController,
  selectNumberForPlayerByCasinoController,
} from '../controllers/betController.js';

// Create a router instance
const router = express.Router();

/**
 * @route   POST /api/bet
 * @desc    Place a new bet
 * @access  Public
 */
router.post('/bet', placeBetController);

/**
 * @route   GET /api/ggr
 * @desc    Get the Gross Gaming Revenue
 * @access  Public
 */
router.get('/ggr', getGGRController);

/**
 * @route   POST /api/selectNumberForPlayerByCasino
 * @desc    Allows the casino to select or update a number for the player.
 * @access  Public
 */
router.put('/selectNumberForPlayer', selectNumberForPlayerByCasinoController);

export default router;
