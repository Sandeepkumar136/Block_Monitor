import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinners from "../IT/Spinners";
import { useCurrency } from "../context/CurrencyContext";
import ReactApexChart from "react-apexcharts";
import Aos from "aos";
import 'aos/dist/aos.css';


const CoinDetails = () => {
  const { id } = useParams(); // Extract the coin ID from the URL
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState(null); // Store price chart data
  const { currency, getCurrencySymbol } = useCurrency(); // Context for currency
  

  const fetchCoinDetails = async () => {
    try {
      // Fetch coin details
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoinData(response.data);

      // Fetch historical price data for the last 7 days
      const priceHistoryResponse = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`
      );
      setPriceHistory(priceHistoryResponse.data.prices.map(([timestamp, price])=>({
        x: new Date(timestamp).toISOString(),
        y: price,
      })));
    } catch (error) {
      console.error("Error fetching coin details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetails();
  }, [id, currency]); 


  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
      easing: 'ease-in-out'
    });
  }, [])
  

  const getLineColor = ()=>{
    if(priceHistory.length <2) return "#008ffb";
    const lastPrice = priceHistory[priceHistory.length -1].y;
    const prevPrice = priceHistory[priceHistory.length -2].y;

    return lastPrice> prevPrice ? "green": "red"
  };

  if (loading) return <Spinners />;

  if (!coinData || !priceHistory) {
    return (
      <div className="error-container">
        <div className="img-container-rr"></div>
        <h2>Oops! Something went wrong.</h2>
        <p className="c-d-text">Please check your internet connection or try again later.</p>
        <button onClick={fetchCoinDetails}>
          <i onClick={coinData} className="bx bx-refresh"></i> Retry
        </button>
      </div>
    );
  }

  // APEX CHART
  const chartOptions = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      type: 'datetime',
      style: {
        colors: "#fff",  // Ensuring x-axis color is white
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `${getCurrencySymbol(currency)} ${value.toFixed(2)}`,
      },
      style: {
        colors: "#fff",  // Ensuring y-axis label color is white
      },
    },
    tooltip: {
      x: {
        format: "dd-MMM-yyyy",
      },
    },
    colors: [getLineColor()], // Dynamically set line color
    grid: {
      borderColor: "#fff",  // Grid line color
    },
    // If you need to modify other axes or elements, you can target them here
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    // Optional zaxis configuration (if needed for 3D charts or additional data series)
    zaxis: {
      show: true,
      labels: {
        style: {
          color: "#fff",  // Adjust z-axis color here
        },
      },
    },
  };
  

  const chartSeries =[
    {
      name: `Price (${getCurrencySymbol(currency)})`,
      data: priceHistory
    },
  ];


  return (
    <div className="coin-details-container">
      <div className="c-d-config">
        <div className="c-d-n-contain">
          <h4 className="c-d-heading">
            <img
              src={coinData.image?.large || coinData.image?.thumb || ""}
              alt={coinData.name}
              className="c-d-img"
            />            
            {coinData.name} ({coinData.symbol?.toUpperCase() || "N/A"})
      
          </h4>
          <p className="c-d-text">
            <span className="g-b-s">Current Price:</span> <span className="g-b-s-t">{getCurrencySymbol(currency)}
              {coinData.market_data?.current_price?.[currency]
                ? coinData.market_data.current_price[currency].toLocaleString()
                : "N/A"} </span>
          </p>
          <p className="c-d-text">
            <span className="g-b-s">Market Cap:</span> <span className="g-b-s-t">{getCurrencySymbol(currency)}{coinData.market_data?.market_cap?.[currency]
              ? coinData.market_data.market_cap[currency].toLocaleString()
              : "N/A"}</span>
          </p>
          <p className="c-d-text">
            <span className="g-b-s">24h Change:{" "} </span>
            <span
              style={{
                color:
                  coinData.market_data?.price_change_percentage_24h > 0
                    ? "green"
                    : "red",
              }}
            >
              {coinData.market_data?.price_change_percentage_24h
                ? coinData.market_data.price_change_percentage_24h.toFixed(2)
                : "N/A"}
              %
            </span>
            <span className="price-icon-c-d">
              <i className={`price-icon-main-c-d bx ${coinData.market_data?.price_change_percentage_24h > 0 ? "bxs-up-arrow": "bxs-down-arrow"}`} style={{color: `${coinData.market_data?.price_change_percentage_24h > 0 ? 'green': 'red' }`}} ></i>
            </span>
            
          </p>
          <p className="c-d-text">
            <span className="g-b-s">1h Change:{" "}</span>
            <span
              style={{
                color:
                  coinData.market_data?.price_change_percentage_1h > 0
                    ? "green"
                    : "red",
              }}
            >
              {coinData.market_data?.price_change_percentage_1h
                ? coinData.market_data.price_change_percentage_1h.toFixed(2)
                : "N/A"}
              %
            </span>
            <span className="price-icon-c-d">
              <i className={`price-icon-main-c-d bx ${coinData.market_data?.price_change_percentage_1h > 0 ? "bxs-up-arrow": "bxs-down-arrow"}`} style={{color: `${coinData.market_data?.price_change_percentage_1h > 0 ? 'green': 'red' }`}} ></i>
            </span>
          </p>
          <p className="c-d-text">
            <span className="g-b-s">7d Change:{" "}</span>
            <span
              style={{
                color:
                  coinData.market_data?.price_change_percentage_7d > 0
                    ? "green"
                    : "red",
              }}
            >
              {coinData.market_data?.price_change_percentage_7d
                ? coinData.market_data.price_change_percentage_7d.toFixed(2)
                : "N/A"}
              %
            </span>
            <span className="price-icon-c-d">
              <i className={`price-icon-main-c-d bx ${coinData.market_data?.price_change_percentage_7d > 0 ? "bxs-up-arrow": "bxs-down-arrow"}`} style={{color: `${coinData.market_data?.price_change_percentage_7d > 0 ? 'green': 'red' }`}} ></i>
            </span>
          </p>
        </div>
        <div className="d-c-m-contain">
          <p className="c-d-text">
            <span className="g-b-s">Circulating Supply:{" "}</span>
            <span className="g-b-s-t">{coinData.market_data?.circulating_supply
              ? coinData.market_data.circulating_supply.toLocaleString()
              : "N/A"}</span>
          </p>
          <p className="c-d-text">
            <span className="g-b-s">Total Supply:{" "}</span>
            <span className="g-b-s-t">{coinData.market_data?.total_supply
              ? coinData.market_data.total_supply.toLocaleString()
              : "N/A"}</span>
          </p>
          <p className="c-d-text">
            <span className="g-b-s">All-Time High (ATH):</span> 
            <span className="g-b-s-t">{getCurrencySymbol(currency)}{coinData.market_data?.ath?.[currency]
              ? coinData.market_data.ath[currency].toLocaleString()
              : "N/A"}</span>
          </p>
          <p className="c-d-text">
            <span className="g-b-s">Market Rank:</span> #<span className="g-b-s-t">{coinData.market_cap_rank || "N/A"}</span>
          </p>
          <p className="c-d-text">
            <span className="g-b-s">24h Trading Volume:</span> <span className="g-b-s-t">{getCurrencySymbol(currency)}
            {coinData.market_data?.total_volume?.[currency]
              ? coinData.market_data.total_volume[currency].toLocaleString()
              : "N/A"}</span>
          </p>
        </div>
      </div>
      {/* Description */}
      <div className="c-d-desc">
        <h5>Description:</h5>
        <p className="c-d-pera">
          {coinData.description?.en
            ? coinData.description.en.slice(0, 300) + "..."
            : "N/A"}
        </p>
      </div>
      {/* Price Chart */}
      <div className="c-d-chart-container" data-aos="fade-up" >
        <h5>Price Chart (Last 7 days):</h5>
        <ReactApexChart 
        options={chartOptions}
        series={chartSeries}
        type="line"
        />
      </div>
      {/* Links */}
      <div className="of-links">
        <h5>Official Links:</h5>
        <ul className="official-items">
          <li className="offical-links">
            <a href={coinData.links?.homepage?.[0]} target="_blank" rel="noopener noreferrer"><i className='bx bx-world' ></i></a>
          </li>
          <li className="offical-links">
            <a href={`https://www.reddit.com/r/${coinData.id}`} target="_blank" rel="noopener noreferrer"
            ><i className='bx bxl-reddit' ></i></a>
          </li>
          <li className="offical-links">
            <a href={`https://twitter.com/${coinData.links?.twitter_screen_name}`} target="_blank" rel="noopener noreferrer"
            ><i class='bx bxl-twitter' ></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CoinDetails;
