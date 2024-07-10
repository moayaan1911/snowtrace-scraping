/** @format */

import axios from 'axios';

const API_URL = 'https://snowtrace-scraping.onrender.com';

export const fetchCurrentGasPrice = async () => {
  const response = await axios.get(`${API_URL}/gas`);
  console.log('Current Gas Price', response.data);
  return response.data;
};

export const fetchHistoricalGasPrices = async () => {
  const response = await axios.get(`${API_URL}/gas/historical`);
  console.log('Historical Gas Prices', response.data);
  return response.data;
};
