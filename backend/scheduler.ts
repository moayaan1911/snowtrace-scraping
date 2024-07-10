/** @format */

import cron from 'node-cron';
import { storeGasPrice } from './services/gas.service.js';
import logger from './utils/logger.js';

const startScheduler = () => {
  cron.schedule('*/30 * * * *', async () => {
    logger.info('Running scheduled task to fetch and store gas price');
    await storeGasPrice();
  });

  logger.info('Scheduler started');
};

export default startScheduler;
