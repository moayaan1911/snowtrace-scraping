/** @format */

import axios from 'axios';
import cheerio from 'cheerio';
import logger from '../utils/logger.js';
import GasPrice from '../models/gas.model.js';

const fetchGasPrice = async () => {
  try {
    const response = await axios.get('https://snowtrace.io/');
    const html = response.data;
    const $ = cheerio.load(html);

    const medGasPriceDiv = $('div:contains("Med Gas Price")')
      .filter(function () {
        return $(this).text().trim() === 'Med Gas Price';
      })
      .closest('.text-right');

    if (medGasPriceDiv.length) {
      const nAVAXText = medGasPriceDiv.find('a span.link').text().trim();
      const usdText = medGasPriceDiv
        .find('span.text-slate-500.small.ml-1')
        .text()
        .trim();

      const nAVAXMatch = nAVAXText.match(/(\d+)\s*nAVAX/);
      const usdMatch = usdText.match(/\$(\d+\.\d+)/);

      if (nAVAXMatch && usdMatch) {
        const nAVAXPrice = parseInt(nAVAXMatch[1]);
        const usdPrice = parseFloat(usdMatch[1]);

        logger.info(`Fetched gas price: ${nAVAXPrice} nAVAX ($${usdPrice})`);
        return { nAVAX: nAVAXPrice, usd: usdPrice };
      }
    }

    logger.warn('Gas price not found on the page');
    return null;
  } catch (error) {
    logger.error('Error fetching gas price:', error);
    return null;
  }
};

export const storeGasPrice = async () => {
  try {
    const gasPrice = await fetchGasPrice();
    if (gasPrice) {
      const newGasPrice = new GasPrice(gasPrice);
      await newGasPrice.save();
      logger.info('Gas price stored in database');
    }
  } catch (error) {
    logger.error('Error storing gas price:', error);
  }
};

export default fetchGasPrice;
