/** @format */

import cron from 'node-cron';
import { storeGasPrice } from './services/gas.service.js';
import logger from './utils/logger.js';

const startScheduler = () => {
  // Run every 30 seconds for testing
  cron.schedule('*/30 * * * * *', async () => {
    logger.info(
      'Running scheduled task to fetch and store gas price (30-second interval for testing)'
    );
    await storeGasPrice();
  });

  // 30-minute interval (commented out for now)
  // cron.schedule('*/30 * * * *', async () => {
  //   logger.info('Running scheduled task to fetch and store gas price');
  //   await storeGasPrice();
  // });

  logger.info('Scheduler started');
};

export default startScheduler;
