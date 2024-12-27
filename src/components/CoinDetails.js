import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2"; // Price chart component
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CoinDetails = () => {
  const { id } = useParams(); // Extract the coin ID from the URL
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState(null); // Store price chart data

  const fetchCoinDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoinData(response.data);
      setLoading(false);

      // Fetch historical price data for chart (last 7 days)
      const priceHistoryResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
      );
      setPriceHistory(priceHistoryResponse.data.prices); // Store the prices for the chart
    } catch (error) {
      console.error("Error fetching coin details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!coinData) {
    return <p>No data available for this coin.</p>;
  }

  // Prepare data for the price chart
  const chartData = {
    labels: priceHistory ? priceHistory.map(([timestamp]) => new Date(timestamp).toLocaleDateString()) : [],
    datasets: [
      {
        label: "Price (USD)",
        data: priceHistory ? priceHistory.map(([_, price]) => price) : [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div padding={3}>
      <h4>{coinData.name} ({coinData.symbol.toUpperCase()})</h4>
      
      {/* Coin Price and Market Data */}
      <p>Current Price: ${coinData.market_data.current_price.usd}</p>
      <p>Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}</p>

      {/* Price Change */}
      <p>
        24h Change:{" "}
        <span
          style={{
            color: coinData.market_data.price_change_percentage_24h > 0 ? "green" : "red",
          }}
        >
          {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
      <p>
        1h Change:{" "}
        <span
          style={{
            color: coinData.market_data.price_change_percentage_1h > 0 ? "green" : "red",
          }}
        >
          {coinData.market_data.price_change_percentage_1h.toFixed(2)}%
        </span>
      </p>
      <p>
        7d Change:{" "}
        <span
          style={{
            color: coinData.market_data.price_change_percentage_7d > 0 ? "green" : "red",
          }}
        >
          {coinData.market_data.price_change_percentage_7d.toFixed(2)}%
        </span>
      </p>

      {/* Coin Supply Data */}
      <p>Circulating Supply: {coinData.market_data.circulating_supply.toLocaleString()}</p>
      <p>Total Supply: {coinData.market_data.total_supply ? coinData.market_data.total_supply.toLocaleString() : "N/A"}</p>

      {/* All-Time High (ATH) */}
      <p>All-Time High (ATH): ${coinData.market_data.ath.usd}</p>
      <p>Market Rank: #{coinData.market_cap_rank}</p>
      <p>24h Trading Volume: ${coinData.market_data.total_volume.usd.toLocaleString()}</p>

      {/* Description */}
      <div>
        <h5>Description:</h5>
        <p>{coinData.description.en ? coinData.description.en.slice(0, 300) + "..." : "N/A"}</p>
      </div>

      {/* Price Chart */}
      <div>
        <h5>Price Chart (Last 7 days):</h5>
        {priceHistory && (
          <Line data={chartData} />
        )}
      </div>

      {/* Links */}
      <div>
        <h5>Links:</h5>
        <p>
          <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">
            Official Website
          </a>
        </p>
        <p>
          <a href={`https://www.reddit.com/r/${coinData.id}`} target="_blank" rel="noopener noreferrer">
            Reddit
          </a>
        </p>
        <p>
          <a href={`https://twitter.com/${coinData.links.twitter_screen_name}`} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </p>
      </div>
    </div>
  );
};

export default CoinDetails;
