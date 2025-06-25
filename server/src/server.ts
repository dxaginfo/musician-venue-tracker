import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { authenticate } from './middleware/auth.middleware';
import { sequelize } from './config/database';
import logger from './utils/logger';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import venueRoutes from './routes/venue.routes';
import interactionRoutes from './routes/interaction.routes';
import performanceRoutes from './routes/performance.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Set up middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Define base routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticate, userRoutes);
app.use('/api/venues', authenticate, venueRoutes);
app.use('/api/interactions', authenticate, interactionRoutes);
app.use('/api/performances', authenticate, performanceRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'));
  });
}

// Handle 404s
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Connect to database and start server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`Failed to connect to database: ${err}`);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server and exit process
  process.exit(1);
});

export default app;