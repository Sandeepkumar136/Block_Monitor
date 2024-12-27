import React, { useState, useEffect } from "react";
import axios from "axios";

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
    return <p>Loading market trends...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Market Trends</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Market Overview */}
        <div style={{ background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
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
        <div style={{ background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
          <h3>Market Cap Dominance</h3>
          <p>
            <strong>BTC:</strong> {marketTrends?.market_cap_percentage?.btc || 0}%
          </p>
          <p>
            <strong>ETH:</strong> {marketTrends?.market_cap_percentage?.eth || 0}%
          </p>
        </div>

        {/* Top Trending Coins */}
        <div
          style={{
            background: "#f4f4f4",
            padding: "15px",
            borderRadius: "8px",
            gridColumn: "span 2",
          }}
        >
          <h3>Top Trending Coins</h3>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
            {trendingCoins.map((coin) => (
              <div
                key={coin.item.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  minWidth: "150px",
                  textAlign: "center",
                }}
              >
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
          </div>
        </div>

        {/* 24h Volume */}
        <div style={{ background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
          <h3>24h Volume</h3>
          <p>
            <strong>Volume:</strong> $
            {marketTrends?.total_volume?.usd?.toLocaleString() || "N/A"}
          </p>
        </div>

        {/* Cryptocurrencies and Markets */}
        <div style={{ background: "#f4f4f4", padding: "15px", borderRadius: "8px" }}>
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
