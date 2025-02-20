# Crypto Market Front

This is a React-based Market Data Dashboard that provides real-time and historical market data. It features a collapsible sidebar for navigation, a real-time data feed using WebSockets, and a historical data view fetched from an API.

## Features

- **Sidebar Navigation**: Collapsible sidebar with menu items for "Historical Data" and "RealTime Data".
- **Real-Time Market Data**: Fetches and displays live market updates from a WebSocket server.
- **Historical Market Data**: Fetches historical market data from an API and displays it in a table.
- **Routing**: Uses `react-router-dom` for seamless navigation between pages.
- **State Management**: Utilizes React Hooks (`useState`, `useEffect`) to manage data updates.

## Installation

### Prerequisites
- React.js (>= 18.x)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh   
   git clone https://github.com/vyasankit2008/crypto-market-front.git
   cd crypto-market-front
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open the application in your browser at `http://localhost:3000`.

## Project Structure
```
crypto-market-front/
│── src/
│   ├── components/
│   │   ├── Sidebar.js
│   ├── pages/
│   │   ├── RealtimeData.js
│   │   ├── HistoricalData.js
│   │   ├── NotFound.js
│   ├── Routes.js
│   ├── App.js
│   ├── index.js
│── public/
│── package.json
│── README.md
```

## Usage

### Real-Time Market Data
- Fetches live data from a WebSocket connection.
- Displays price updates dynamically in a table.

### Historical Market Data
- Fetches historical data from an API using Axios.
- Displays data in a paginated table.

## Configuration

- Update the WebSocket URL in `RealtimeData.js`:
  ```js
  const socket = new WebSocket('wss://your-websocket-url');
  ```
- Update the API endpoint for historical data in `HistoricalData.js`:
  ```js
  axios.get('https://api.example.com/historical-data')
  ```

## Enhancements & Future Improvements
- Implement Box a like or better data visualization.
- Improve **error handling** with user-friendly messages.
- Optimize API requests with **caching** and **debouncing**.

## License
This project is licensed under the MIT License.

---

For any issues, contact [Ankit Vyas - 7383444315 - vyasankit2008@gmail.com] or open an issue on the repository.