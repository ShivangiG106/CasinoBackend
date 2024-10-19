// src/services/betService.js

import Bet from "../models/Bet.js";
import selectNumberForPlayer from "../models/selectNumberForPlayer.js";

/**
 * Place a new bet
 * Simulates a dice roll, determines win/loss, and records the bet
 * @param {number} amount - The amount wagered by the user
 * @returns {Promise<object>} - The result of the bet
 */

export const placeBet = async (amount) => {
  // Validate the bet amount
  if (amount <= 0) {
    throw new Error("Bet amount must be greater than zero.");
  }

  // Simulate a fair six-sided dice roll (1 to 6)
  const diceOutcome = Math.floor(Math.random() * 6) + 1;
  const selectNumberForPlayerData = await selectNumberForPlayer.findAll();
  const givenByCasinoNumber = selectNumberForPlayerData[0]?.selectionNumber;

  // Define the win condition (e.g., roll a 6 to win)
  const win = diceOutcome === givenByCasinoNumber;

  // Calculate potential payout (for example, 5x the bet amount)
  const payoutMultiplier = 5;
  const payout = win ? amount * payoutMultiplier : 0;

  // Record the bet in the database
  const bet = await Bet.create({
    amount,
    diceOutcome,
    win,
  });

  // Return the result of the bet
  return {
    betId: bet.id,
    amount: bet.amount,
    diceOutcome: diceOutcome,
    win: bet.win,
    payout,
  };
};
/**
 * Calculate the Gross Gaming Revenue (GGR)
 * GGR = Total Bets Placed - Total Winnings Paid Out
 * @returns {Promise<number>} - The calculated GGR
 */
export const calculateGGR = async () => {
  // Retrieve all bets from the database
  const bets = await Bet.findAll();
  // console.log("bets" , bets)

  const totalBets = bets.reduce((sum, bet) => sum + bet.amount, 0);

  // Total payouts to winning bets
  const payoutMultiplier = 5;
  const totalPayouts = bets
    .filter((bet) => bet.win)
    .reduce((sum, bet) => sum + bet.amount * payoutMultiplier, 0);

  // Calculate GGR
  const GGR = totalBets - totalPayouts;

  return GGR;
};

/**
 * Updates or creates the casino's selection number for the player.
 *
 * @param {number} selectionNumber - The number selected by the casino, should be between 1 and 6.
 * @returns {Promise<object>} Returns an object containing the selection ID and the selected number.
 * @throws {Error} Throws an error if the selection number is invalid (less than or equal to 0).
 */
export const selectNumberForPlayerByCasino = async (selectionNumber) => {
  // Validate the selection number
  if (selectionNumber <= 0) {
    throw new Error("Number must be greater than zero.");
  }

  // Use upsert to either create or update the record
  const [selectionNumberData] = await selectNumberForPlayer.upsert({
    id: 1, // Assuming you want to update the same record with id 1
    selectionNumber,
  });

  // Return the result of the operation (whether it was created or updated)
  return {
    selectionId: selectionNumberData.id,
    selectionNumber: selectionNumberData.selectionNumber,
  };
};
