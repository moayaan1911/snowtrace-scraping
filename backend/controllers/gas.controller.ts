/** @format */

import type { Request, Response } from 'express';
import fetchGasPrice from '../services/gas.service.js';
import GasPrice from '../models/gas.model.js';
import logger from '../utils/logger.js';

export const getGasPrice = async (req: Request, res: Response) => {
  try {
    const gasPrice = await fetchGasPrice();
    if (gasPrice !== null) {
      res.json(gasPrice);
    } else {
      res.status(404).json({ error: 'Gas price not found' });
    }
  } catch (error) {
    logger.error('Error getting gas price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHistoricalGasPrices = async (req: Request, res: Response) => {
  try {
    const gasPrices = await GasPrice.find().sort({ timestamp: -1 }).limit(100);
    res.json(gasPrices);
  } catch (error) {
    logger.error('Error getting historical gas prices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
