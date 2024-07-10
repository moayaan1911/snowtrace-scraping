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
app.get('/', (req, res) => {
  const apiDocs = `
    <h1>Snowtrace Gas Price Tracker API</h1>
    <h2>Endpoints:</h2>
    <ul>
      <li>
        <strong>GET /gas</strong>: Get current gas price
        <br>
        Sample response:
        <pre>
          {
            "nAVAX": 25,
            "usd": 0.014
          }
        </pre>
      </li>
      <li>
        <strong>GET /gas/historical</strong>: Get historical gas prices
        <br>
        Sample response:
        <pre>
          [
            {
              "nAVAX": 25,
              "usd": 0.014,
              "timestamp": "2024-07-10T19:30:00.000Z"
            },
            {
              "nAVAX": 24,
              "usd": 0.013,
              "timestamp": "2024-07-10T19:00:00.000Z"
            }
          ]
        </pre>
      </li>
    </ul>
  `;

  res.send(apiDocs);
});
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
  connectDB();
  startScheduler();
});
