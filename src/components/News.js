import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinners from "../IT/Spinners";
import Slider from "react-slick"; // Import Slick Slider
import "slick-carousel/slick/slick.css"; // Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Slick Theme CSS

const News = () => {
  const [marketTrends, setMarketTrends] = useState(null);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch global market trends
        const marketResponse = await axios.get(
          "https://api.coingecko.com/api/v3/global"
        );
        setMarketTrends(marketResponse.data.data);

        // Fetch trending coins
        const trendingResponse = await axios.get(
          "https://api.coingecko.com/api/v3/search/trending"
        );
        setTrendingCoins(trendingResponse.data.coins); // List of trending coins
      } catch (err) {
        console.error("Error fetching market trends:", err);
        setError("Failed to fetch market data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (loading) {
    return <Spinners />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="img-container-rr"></div>
        <h2>Oops! Something went wrong.</h2>
        <p>Please check your internet connection or try again later.</p>
        <button onClick={() => window.location.reload()}>
          <i className="bx bx-refresh"></i>
        </button>
      </div>
    );
  }

  // Slick slider settings
  const sliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    slidesToShow: 5, // Default for large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet size
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 464, // Mobile size
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="home-page-c">
      <header className="h-heading-container">
        <h1 className="h-heading">Trending Threds</h1>
      </header>
      <div className="th-card-contain">
        {/* Market Overview */}
        <div className="th-card">
          <h3>Market Overview</h3>
          <p>
            <strong>Market Cap:</strong> $
            {marketTrends?.total_market_cap?.usd?.toLocaleString() || "N/A"}
          </p>
          <p>
            <strong>Total Volume:</strong> $
            {marketTrends?.total_volume?.usd?.toLocaleString() || "N/A"}
          </p>
          <p>
            <strong>Active Cryptocurrencies:</strong>{" "}
            {marketTrends?.active_cryptocurrencies || "N/A"}
          </p>
          <p>
            <strong>Markets:</strong> {marketTrends?.markets || "N/A"}
          </p>
        </div>

        {/* Market Cap Dominance */}
        <div className="th-card">
          <h3>Market Cap Dominance</h3>
          <p>
            <strong>BTC:</strong> {marketTrends?.market_cap_percentage?.btc || 0}%
          </p>
          <p>
            <strong>ETH:</strong> {marketTrends?.market_cap_percentage?.eth || 0}%
          </p>
        </div>
      </div>

      {/* Top Trending Coins */}
      <div
      className="th-crs"
        style={{
          padding: "15px",
          borderRadius: "8px",
          gridColumn: "span 2",
        }}
      >
        <h3 className="th-rtr">Top Trending Coins</h3>
        <Slider {...sliderSettings}>
          {trendingCoins.map((coin) => (
            <div key={coin.item.id} className="cru-cls">
              <img
                src={coin.item.large}
                alt={coin.item.name}
                style={{ width: "50px", height: "50px" }}
              />
              <p>
                <strong>{coin.item.name}</strong>
              </p>
              <p>Rank: {coin.item.market_cap_rank}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* 24h Volume */}
      <div className="th-card-contain">
        <div className="th-card">
          <h3>24h Volume</h3>
          <p>
            <strong>Volume:</strong> $
            {marketTrends?.total_volume?.usd?.toLocaleString() || "N/A"}
          </p>
        </div>

        {/* Cryptocurrencies and Markets */}
        <div className="th-card">
          <h3>Cryptocurrency Overview</h3>
          <p>
            <strong>Active Cryptocurrencies:</strong>{" "}
            {marketTrends?.active_cryptocurrencies || "N/A"}
          </p>
          <p>
            <strong>Total Markets:</strong> {marketTrends?.markets || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;
