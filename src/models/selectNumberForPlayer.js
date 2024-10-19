import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

/**
 * selectNumberForPlayer Model
 * Represents a selection by the casino
 */
const selectNumberForPlayer = sequelize.define('selectNumberForPlayer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  selectionNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 6,
    },

  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default selectNumberForPlayer;
