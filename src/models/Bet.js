// src/models/Bet.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

/**
 * Bet Model
 * Represents a bet placed by a user
 */
const Bet = sequelize.define('Bet', {
  // Unique identifier for the bet (automatically managed by Sequelize)
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Amount wagered by the user
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0.01, // Minimum bet amount
    },
  },
  // Outcome of the dice roll (1 to 6)
  diceOutcome: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 6,
    },
  },
  // Whether the bet was won or lost
  win: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  // Timestamp when the bet was placed (automatically managed by Sequelize)
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Bet;
