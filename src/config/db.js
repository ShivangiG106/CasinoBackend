// src/config/db.js

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance for PostgreSQL
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Database name
    process.env.DB_USER,     // Database username
    process.env.DB_PASSWORD, // Cast password to string
    {
      host: process.env.DB_HOST,   // Database host
      port: process.env.DB_PORT,   // Database port
      dialect: 'postgres',         // Dialect for PostgreSQL
      logging: false,              // Disable logging; set to console.log to see SQL queries
    }
  );
  

export default sequelize;
