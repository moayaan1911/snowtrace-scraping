<!-- @format -->

# Snowtrace Gas Price Tracker Backend

This backend service scrapes the Snowtrace website every 30 minutes to fetch the current gas price for the Avalanche network. It stores historical data and provides API endpoints to retrieve both current and historical gas prices.

## Folder Structure

- `config/`
  - `database.ts`: Configuration for MongoDB connection
- `controllers/`
  - `gas.controller.ts`: Contains logic for handling gas price-related requests
- `models/`
  - `gas.model.ts`: Defines the MongoDB schema for gas price data
- `routes/`
  - `gas.routes.ts`: Defines API routes for gas price endpoints
- `services/`
  - `gas.service.ts`: Contains the web scraping logic to fetch gas prices
- `utils/`
  - `logger.ts`: Custom logging utility
- `index.ts`: Main entry point of the application
- `scheduler.ts`: Configures the cron job for periodic scraping
- `.env`: Environment variables (not tracked in git)
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration

## API Endpoints

- GET `/gas`

  - Retrieves the current gas price
  - Example output:
    ```json
    {
      "nAVAX": 25,
      "usd": 0.014
    }
    ```

- GET `/gas/historical`

  - Retrieves historical gas price data
  - Example output:

    ```json
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
    ```
