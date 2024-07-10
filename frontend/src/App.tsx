/** @format */

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchCurrentGasPrice, fetchHistoricalGasPrices } from './api/gasPrice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FaLinkedin, FaGithub, FaTelegram, FaEthereum } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';

function App() {
  const [currentPrice, setCurrentPrice] = useState<{
    nAVAX: number;
    usd: number;
  } | null>(null);
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const current = await fetchCurrentGasPrice();
        setCurrentPrice(current);

        const historical = await fetchHistoricalGasPrices();
        setHistoricalPrices(historical);
        toast.success('Historical gas prices updated!', {
          position: 'top-center',
        });
      } catch (error) {
        toast.error('Failed to fetch gas prices', { position: 'top-center' });
      } finally {
        setIsLoading(false);
        setDataFetched(true);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1800000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen w-screen bg-gray-900 text-white py-6 flex flex-col items-center justify-center px-4'>
      <Toaster />
      <h1 className='text-3xl font-bold text-center flex items-center justify-center mb-2'>
        Snowtrace Gas Price Tracker
      </h1>
      <p className='text-xl text-blue-600 mb-4 flex items-center gap-4'>
        Created by{' '}
        <a
          href='https://moayaan.com'
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-white font-serif italic flex items-center gap-1'>
          <FaEthereum />
          moayaan.eth
          <FaEthereum />
        </a>
      </p>

      <div className='flex space-x-4 mb-4'>
        <a
          href='https://linkedin.com/in/ayaaneth'
          target='_blank'
          rel='noopener noreferrer'>
          <FaLinkedin size={24} />
        </a>
        <a
          href='https://github.com/moayaan1911'
          target='_blank'
          rel='noopener noreferrer'>
          <FaGithub size={24} />
        </a>
        <a
          href='https://www.buymeacoffee.com/moayaan.eth'
          target='_blank'
          rel='noopener noreferrer'>
          <SiBuymeacoffee size={24} />
        </a>
        <a
          href='https://t.me/usdisshitcoin'
          target='_blank'
          rel='noopener noreferrer'>
          <FaTelegram size={24} />
        </a>
      </div>

      <div className='mb-4'>
        <span className='mr-2'>Github Repo (please leave a star) ⭐</span>
        <a
          href='https://github.com/moayaan1911/snowtrace-scraping'
          target='_blank'
          rel='noopener noreferrer'
          className='bg-gray-300 hover:bg-black hover:text-white text-black font-semibold px-4 py-2 rounded transition duration-300'>
          View on GitHub
        </a>
      </div>

      <div className='bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-4xl'>
        {currentPrice && (
          <div className='mb-6 text-center'>
            <h2 className='text-xl font-semibold mb-2'>Current Gas Price</h2>
            <p className='text-3xl font-bold text-blue-400'>
              {currentPrice.nAVAX} nAVAX (${currentPrice.usd})
            </p>
          </div>
        )}
        <h2 className='text-xl font-semibold mb-4 text-center'>
          Historical Gas Prices
        </h2>
        {isLoading ? (
          <Loader />
        ) : dataFetched && historicalPrices.length === 0 ? (
          <p className='text-center text-white'>No historical data available</p>
        ) : (
          <div className='h-64 w-full'>
            <ResponsiveContainer
              width='100%'
              height='100%'>
              <LineChart data={historicalPrices}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  dataKey='timestamp'
                  tickFormatter={(timestamp) =>
                    format(new Date(timestamp), 'MMM d, h:mm a')
                  }
                />
                <YAxis yAxisId='left' />
                <YAxis
                  yAxisId='right'
                  orientation='right'
                />
                <Tooltip
                  labelFormatter={(timestamp) =>
                    format(new Date(timestamp), 'MMM d, yyyy h:mm a')
                  }
                />
                <Legend />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='nAVAX'
                  stroke='#8884d8'
                />
                <Line
                  yAxisId='right'
                  type='monotone'
                  dataKey='usd'
                  stroke='#82ca9d'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
