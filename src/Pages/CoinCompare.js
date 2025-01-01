import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';

const CoinCompare = () => {
  const [coin1Data, setCoin1Data] = useState(null);
  const [coin2Data, setCoin2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coin1Id, setCoin1Id] = useState('bitcoin');
  const [coin2Id, setCoin2Id] = useState('ethereum');
  const [coin1Input, setCoin1Input] = useState('bitcoin');
  const [coin2Input, setCoin2Input] = useState('ethereum');
  const [error, setError] = useState(null);
  const { currency, getCurrencySymbol } = useCurrency();

  // Function to fetch coin details with currency parameter
  const fetchCoinData = async (coinId, setCoinData) => {
    try {
      setLoading(true);
      setError(null); // Reset any previous errors
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
            vs_currency: currency, // Add currency as a parameter
          },
        }
      );
      setCoinData(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`Coin with ID '${coinId}' not found. Please check the coin ID.`);
      } else if (err.response?.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
        setError('An error occurred while fetching coin data.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data for both coins when dependencies change
  useEffect(() => {
    fetchCoinData(coin1Id, setCoin1Data);
    fetchCoinData(coin2Id, setCoin2Data);
  }, [coin1Id, coin2Id, currency]);

  // Handle fetching data when "Compare" is clicked
  const handleCoin1Fetch = () => {
    setCoin1Id(coin1Input); // Update the ID and trigger fetch
  };

  const handleCoin2Fetch = () => {
    setCoin2Id(coin2Input); // Update the ID and trigger fetch
  };

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-page">
      <header className="h-heading-container">
        <h1 className="h-heading">Compare Coins</h1>
      </header>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Coin 1 input */}
      <section className="h-card-container">
        <h1 className="h-sub-heading">Compare Coins</h1>
        <div className="h-card-contain-c">
          <div className="coin-input">
            <input
              type="text"
              id="coin1"
              value={coin1Input}
              onChange={(e) => setCoin1Input(e.target.value)}
              placeholder="Enter Coin 1 ID (e.g., bitcoin)"
            />
            <button onClick={handleCoin1Fetch}><i className='bx bx-right-arrow-alt' ></i></button>
          </div>

          {/* Coin 2 input */}
          <div className="coin-input">
            <input
              type="text"
              id="coin2"
              value={coin2Input}
              onChange={(e) => setCoin2Input(e.target.value)}
              placeholder="Enter Coin 2 ID (e.g., ethereum)"
            />
            <button onClick={handleCoin2Fetch}><i className='bx bx-right-arrow-alt' ></i></button>
          </div>
        </div>
      </section>
      <section className="h-card-container">
        <section className="coin-container">
          <div className="coin">
            <h3>
              {coin1Data?.name}
            </h3>
            <p>
              Current Price: {getCurrencySymbol(currency)}
              {coin1Data?.market_data?.current_price[currency] || 'N/A'}
            </p>
            <p>
              Market Cap: {getCurrencySymbol(currency)}
              {coin1Data?.market_data?.market_cap[currency] || 'N/A'}
            </p>
            <p>
              24h Change: {coin1Data?.market_data?.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
            </p>
          </div>

          <div className="coin">
            <h3>
              {coin2Data?.name}
            </h3>
            <p>
              Current Price: {getCurrencySymbol(currency)}
              {coin2Data?.market_data?.current_price[currency] || 'N/A'}
            </p>
            <p>
              Market Cap: {getCurrencySymbol(currency)}
              {coin2Data?.market_data?.market_cap[currency] || 'N/A'}
            </p>
            <p>
              24h Change: {coin2Data?.market_data?.price_change_percentage_24h?.toFixed(2) || 'N/A'}%
            </p>
          </div>
        </section>
      </section>
    </div>
  );
};

export default CoinCompare;
