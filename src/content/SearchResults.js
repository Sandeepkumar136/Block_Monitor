import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ searchQuery }) => {
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCoins(filtered);
    } else {
      setFilteredCoins([]);
    }
  }, [searchQuery, coins]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching coins. Please try again later.</div>;
  }

  return (
    <div className="search-results">
      {searchQuery.trim() === "" ? (
        <p>Please enter a search query to see results.</p>
      ) : filteredCoins.length > 0 ? (
        <div className="coin-list">
          {filteredCoins.map((coin) => (
            <div key={coin.id} className="coin-card">
              <img src={coin.image} alt={coin.name} />
              <h4>{coin.name}</h4>
              <p>Price: ${coin.current_price}</p>
              <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
              <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No coins match your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
