/** @format */

import express from 'express';
import {
  getGasPrice,
  getHistoricalGasPrices,
} from '../controllers/gas.controller.js';

const router = express.Router();

router.get('/', getGasPrice);
router.get('/historical', getHistoricalGasPrices);

export default router;
