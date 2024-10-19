// src/app.js

import express from 'express';
import betRoutes from './routes/betRoutes.js';
import sequelize from './config/db.js';

// Create an instance of Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use bet routes for endpoints starting with /api
app.use('/api', betRoutes);

// Test database connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Sync all defined models to the DB
    return sequelize.sync();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default app;
