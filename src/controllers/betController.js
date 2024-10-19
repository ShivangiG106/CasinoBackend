// src/controllers/betController.js

import { placeBet, calculateGGR, selectNumberForPlayerByCasino } from '../services/betService.js';

/**
 * Controller to handle placing a bet
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const placeBetController = async (req, res) => {
  try {
    const { amount } = req.body;

    // Ensure amount is provided and is a number
    if (amount === undefined || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Invalid bet amount provided.' });
    }

    // Call the service to place the bet
    const result = await placeBet(amount);

    // Respond with the bet result
    res.status(201).json(result);
  } catch (error) {
    // Handle errors and respond with appropriate status code
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controller to handle retrieving the Gross Gaming Revenue (GGR)
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export const getGGRController = async (req, res) => {
  try {
    // Call the service to calculate GGR
    const GGR = await calculateGGR();

    // Respond with the GGR value
    res.status(200).json({ GGR });
  } catch (error) {
    // Handle errors and respond with appropriate status code
    res.status(500).json({ error: error.message });
  }
};


/**
 * Controller to handle selecting a number for a player by the casino
 * @param {object} req - Express request object containing the selection number
 * @param {object} res - Express response object to send the response
 */
export const selectNumberForPlayerByCasinoController = async (req, res) => {
  try {
    // Destructure the selectionNumber from the request body
    const { selectionNumber } = req.body;

    // Ensure the selection number is provided and is a valid number
    if (selectionNumber === undefined || typeof selectionNumber !== 'number') {
      // If the validation fails, return a 400 Bad Request response with an error message
      return res.status(400).json({ error: 'Invalid bet amount provided.' });
    }

    // Call the service function to place the bet and get the result
    const result = await selectNumberForPlayerByCasino(selectionNumber);

    // Respond with a 200 OK status and the result of the selection
    res.status(200).json(result);
  } catch (error) {
    // Handle any unexpected errors that occur during processing
    // Respond with a 500 Internal Server Error status and the error message
    res.status(500).json({ error: error.message });
  }
};
