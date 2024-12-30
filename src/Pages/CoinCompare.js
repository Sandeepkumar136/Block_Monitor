import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoinCompare = () => {
  const [coin1Data, setCoin1Data] = useState(null);
  const [coin2Data, setCoin2Data] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coin1Id, setCoin1Id] = useState('bitcoin');
  const [coin2Id, setCoin2Id] = useState('ethereum');
  const [error, setError] = useState(null);
  const [coin1Search, setCoin1Search] = useState('');
  const [coin2Search, setCoin2Search] = useState('');
  const [coinSuggestions1, setCoinSuggestions1] = useState([]);
  const [coinSuggestions2, setCoinSuggestions2] = useState([]);

  // Function to fetch coin details
  const fetchCoinData = async (coinId, setCoinData) => {
    try {
      setLoading(true);
      setError(null); // Reset any previous errors
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      setCoinData(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Coin not found. Please check the coin ID.');
      } else if (err.response?.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
        setError('An error occurred while fetching coin data.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to search coins
  const fetchCoinSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      setSuggestions(response.data.coins);
    } catch (err) {
      console.error('Error fetching coin suggestions:', err);
    }
  };

  // Fetch data for both coins when the component mounts or coin IDs change
  useEffect(() => {
    fetchCoinData(coin1Id, setCoin1Data);
    fetchCoinData(coin2Id, setCoin2Data);
  }, [coin1Id, coin2Id]);

  // Handle the search input change for Coin 1
  const handleCoin1SearchChange = (e) => {
    const query = e.target.value;
    setCoin1Search(query);
    fetchCoinSuggestions(query, setCoinSuggestions1);
  };

  // Handle the search input change for Coin 2
  const handleCoin2SearchChange = (e) => {
    const query = e.target.value;
    setCoin2Search(query);
    fetchCoinSuggestions(query, setCoinSuggestions2);
  };

  // Handle the selection of a suggestion for Coin 1
  const handleCoin1Select = (coin) => {
    setCoin1Search(coin.name);
    setCoin1Id(coin.id);
    setCoinSuggestions1([]);
  };

  // Handle the selection of a suggestion for Coin 2
  const handleCoin2Select = (coin) => {
    setCoin2Search(coin.name);
    setCoin2Id(coin.id);
    setCoinSuggestions2([]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Render coin data for comparison
  return (
    <div className="coin-compare">
      <h2>Compare Coins</h2>

      {/* Coin 1 input with suggestions */}
      <div className="coin-select">
        <input
          type="text"
          value={coin1Search}
          onChange={handleCoin1SearchChange}
          placeholder="Enter Coin 1 name or symbol"
        />
        {coinSuggestions1.length > 0 && (
          <div className="suggestions">
            {coinSuggestions1.map((coin) => (
              <div
                key={coin.id}
                onClick={() => handleCoin1Select(coin)}
                className="suggestion-item"
              >
                {coin.name} ({coin.symbol.toUpperCase()})
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coin 2 input with suggestions */}
      <div className="coin-select">
        <input
          type="text"
          value={coin2Search}
          onChange={handleCoin2SearchChange}
          placeholder="Enter Coin 2 name or symbol"
        />
        {coinSuggestions2.length > 0 && (
          <div className="suggestions">
            {coinSuggestions2.map((coin) => (
              <div
                key={coin.id}
                onClick={() => handleCoin2Select(coin)}
                className="suggestion-item"
              >
                {coin.name} ({coin.symbol.toUpperCase()})
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="coin-data">
        <div className="coin">
          <h3>{coin1Data?.name}</h3>
          <p>Symbol: {coin1Data?.symbol}</p>
          <p>Current Price: ${coin1Data?.market_data.current_price.usd}</p>
          <p>Market Cap: ${coin1Data?.market_data.market_cap.usd}</p>
          <p>24h Change: {coin1Data?.market_data.price_change_percentage_24h}%</p>
        </div>

        <div className="coin">
          <h3>{coin2Data?.name}</h3>
          <p>Symbol: {coin2Data?.symbol}</p>
          <p>Current Price: ${coin2Data?.market_data.current_price.usd}</p>
          <p>Market Cap: ${coin2Data?.market_data.market_cap.usd}</p>
          <p>24h Change: {coin2Data?.market_data.price_change_percentage_24h}%</p>
        </div>
      </div>
    </div>
  );
};

export default CoinCompare;
