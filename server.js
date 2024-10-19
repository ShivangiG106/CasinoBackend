// server.js
import app from './src/app.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
