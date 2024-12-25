import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CoinDetails = () => {
  const { id } = useParams(); // Extract the coin ID from the URL
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoinDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoinData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coin details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>
  }

  if (!coinData) {
    return <p>No data available for this coin.</p>;
  }

  return (
    <div padding={3}>
      <p variant="h4">{coinData.name}</p>
      <p variant="subtitle1">
        Symbol: {coinData.symbol.toUpperCase()}
      </p>
      <p>
        Current Price: ${coinData.market_data.current_price.usd}
      </p>
      <p>
        Market Cap: ${coinData.market_data.market_cap.usd.toLocaleString()}
      </p>
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
        Description:{" "}
        {coinData.description.en ? coinData.description.en.slice(0, 300) + "..." : "N/A"}
      </p>
    </div>
  );
};

export default CoinDetails;
