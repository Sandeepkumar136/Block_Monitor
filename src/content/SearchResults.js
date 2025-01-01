import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import Spinners from '../IT/Spinners';

const SearchResults = ({ searchQuery }) => {
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { currency, getCurrencySymbol } = useCurrency();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: currency,
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (err) {
        console.error("Error fetching coins:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency]);

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

  if (loading) return <Spinners />;

  if (error) {
    return (
      <div className="error-container">
        <div className="img-container-rr"></div>
        <h2>Oops! Something went wrong.</h2>
        <p>Please check your internet connection or try again later.</p>
        <button onClick={filteredCoins}>
          <i className="bx bx-refresh"></i>
        </button>
      </div>
    )
  }
  const handleViewDetails = (coinId) => {
    navigate(`/coin/${coinId}`)
  }
  const isFavorite = (coin) => favorites.some((fav) => fav.id === coin.id);
  return (
    <div className="home-page">
      <header className="h-heading-container">
        <h1 className="h-heading">Searched Coins</h1>
      </header>
      <section className="h-card-container">
        <h1 className="h-sub-heading">Searched...</h1>
        {searchQuery.trim() === "" ? (
          <p>Please enter a search query to see results.</p>
        ) : filteredCoins.length > 0 ? (
          <div className="h-card-contain">
            {filteredCoins.map((coin) => (
              <div
                key={coin.id}
                className="h-sub-card"
                onClick={() => handleViewDetails(coin.id)}
              >
                <div className="img-t-sub-card">
                  <img
                    className="h-sub-img"
                    src={coin.image}
                    alt={coin.name}
                  />
                  <h4>{coin.name}</h4>
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(coin);
                    }}
                    className={`bx ${isFavorite(coin)
                        ? 'bxs-bookmark'
                        : 'bx-bookmark'
                      }`}
                  ></i>
                </div>
                <p>
                  Price: {getCurrencySymbol(currency)}{' '}
                  {coin.current_price || 'N/A'}
                </p>
                <p>
                  Market Cap:{' '}
                  {coin.market_cap
                    ? `${getCurrencySymbol(
                      currency
                    )} ${coin.market_cap.toLocaleString()}`
                    : 'N/A'}
                </p>
                <p className="cps">
                  <span>Price:</span>
                  <span
                    className="price-h"
                    style={{
                      color: `${coin.price_change_percentage_24h > 0
                          ? 'green'
                          : 'red'
                        }`,
                    }}
                  >
                    {coin.price_change_percentage_24h !==
                      undefined
                      ? `${coin.price_change_percentage_24h.toFixed(
                        2
                      )}%`
                      : 'N/A'}
                  </span>
                  <span className="price-icon-h">
                    <i
                      className={`price-icon-main bx ${coin.price_change_percentage_24h >
                          0
                          ? 'bxs-up-arrow'
                          : 'bxs-down-arrow'
                        }`}
                      style={{
                        color: `${coin.price_change_percentage_24h >
                            0
                            ? 'green'
                            : 'red'
                          }`,
                      }}
                    ></i>
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No coins match your search criteria.</p>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
