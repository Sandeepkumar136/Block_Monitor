import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../context/CurrencyContext";
import Spinners from "../IT/Spinners";
import { useFavorites } from "../context/FavoritesContext";

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, getCurrencySymbol } = useCurrency();
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      setTrendingCoins(response.data.coins);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
      setLoading(false);
    }
  };

  const isFavorite = (coin) => favorites.some((fav) => fav.id === coin.id);

  const handleViewDetails = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  if (loading) return <Spinners />;

  if (!trendingCoins.length) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong.</h2>
        <p>Please check your internet connection or try again later.</p>
        <button onClick={fetchTrendingCoins}>
          <i className="bx bx-refresh"></i> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="h-heading-container">
        <h1 className="h-heading">Trending Coins</h1>
      </header>
      <section className="h-card-container">
        <h1 className="h-sub-heading">Trending Coins</h1>
        <div className="h-card-contain">
          {trendingCoins.map(({ item: coin }) => (
            <div
              key={coin.id}
              className="h-sub-card"
              onClick={() => handleViewDetails(coin.id)}
            >
              <div className="img-t-sub-card">
                <img
                  className="h-sub-img"
                  src={coin.small}
                  alt={coin.name}
                />
                <h4>{coin.name}</h4>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(coin);
                  }}
                  className={`bx ${
                    isFavorite(coin) ? "bxs-bookmark" : "bx-bookmark"
                  }`}
                ></i>
              </div>
              <p>
                Price: {getCurrencySymbol(currency)}{" "}
                {coin.current_price ? coin.current_price : "N/A"}
              </p>
              <p>
                Market Cap: {getCurrencySymbol(currency)}{" "}
                {coin.market_cap
                  ? coin.market_cap.toLocaleString()
                  : "N/A"}
              </p>
              <p className="cps">
                <span>Price Change:</span>
                <span
                  className="price-h"
                  style={{
                    color: `${
                      coin.price_change_percentage_24h > 0
                        ? "green"
                        : "red"
                    }`,
                  }}
                >
                  {coin.price_change_percentage_24h
                    ? coin.price_change_percentage_24h.toFixed(2)
                    : "N/A"}
                  %
                </span>
                <span className="price-icon-h">
                  <i
                    className={`price-icon-main bx ${
                      coin.price_change_percentage_24h > 0
                        ? "bxs-up-arrow"
                        : "bxs-down-arrow"
                    }`}
                    style={{
                      color: `${
                        coin.price_change_percentage_24h > 0
                          ? "green"
                          : "red"
                      }`,
                    }}
                  ></i>
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrendingCoins;
