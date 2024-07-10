/** @format */

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import logger from './utils/logger.js';
import gasRoutes from './routes/gas.routes.js';
import startScheduler from './scheduler.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

app.use('/gas', gasRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  connectDB();
  startScheduler();
});
