import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';

const HomePage = () => {
    const { currency, getCurrencySymbol } = useCurrency(); const [coins, setCoins] = useState([]);
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [topPerformers, setTopPerformers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const fetchMarketData = async () => {
        try {
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/markets",
                {
                    params: {
                        vs_currency: currency,  // Use the currency from context
                        order: "market_cap_desc",
                        per_page: 100,
                        page: 1,
                        sparkline: false,
                    },
                }
            );

            setCoins(response.data);
            setTrendingCoins(response.data.slice(0, 5));
            const topGainers = [...response.data].sort(
                (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
            );
            setTopPerformers(topGainers.slice(0, 10));
            setLoading(false);
            setError(false);
        } catch (error) {
            console.error("Error Thrown: ", error);
            setLoading(false);
            setError(true);
        }
    };

    // Fetch data whenever `currency` changes
    useEffect(() => {
        fetchMarketData();
    }, [currency]); // Add `currency` here to re-fetch when currency changes

    const handleViewDetails = (coinId) => {
        navigate(`/coin/${coinId}`);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error loading data. Please try again later.</div>;
    }

    return (
        <div className='home-page'>
            <header className='h-heading-container'>
                <h1 className='h-heading'>Cryptocurrency Dashboard</h1>
            </header>
            <section className="h-card-container">
                <h1 className='h-sub-heading'>Trending Coins</h1>
                <div className="h-card-contain">
                    {trendingCoins.map((coin) => (
                        <div key={coin.id} className="h-sub-card" onClick={() => handleViewDetails(coin.id)} >
                            <div className="img-t-sub-card">
                                <img className='h-sub-img' src={coin.image} alt={coin.name} />
                                <h4>{coin.name}</h4>
                            </div>
                            <p>Price: {getCurrencySymbol(currency)} {coin.current_price}</p>
                            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
                            <p className='cps'><span>Price:</span><span className='price-h' style={{ color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}` }} >{coin.price_change_percentage_24h.toFixed(2)}%</span> <span className='price-icon-h'><i className={`price-icon-main bx ${coin.price_change_percentage_24h > 0 ? "bxs-up-arrow" : "bxs-down-arrow"}`} style={{ color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}` }} ></i></span> </p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="h-card-container">
                <h1 className='h-sub-heading'>Top Performers</h1>
                <div className="h-card-contain">
                    {topPerformers.map((coin) => (
                        <div key={coin.id} className="h-sub-card" onClick={() => handleViewDetails(coin.id)} >
                            <div className="img-t-sub-card">
                                <img className='h-sub-img' src={coin.image} alt={coin.name} />
                                <h4>{coin.name}</h4>
                            </div>
                            <p>Price: {getCurrencySymbol(currency)} {coin.current_price}</p>
                            <p>Market Cap: {getCurrencySymbol(currency)} {coin.market_cap.toLocaleString()}</p>
                            <p className='cps'><span>Price:</span><span className='price-h' style={{ color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}` }} >{coin.price_change_percentage_24h.toFixed(2)}%</span> <span className='price-icon-h'><i className={`price-icon-main bx ${coin.price_change_percentage_24h > 0 ? "bxs-up-arrow" : "bxs-down-arrow"}`} style={{ color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}` }} ></i></span></p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="h-card-container">
                <h1 className='h-sub-heading'>All Coins</h1>
                <div className="h-card-contain">
                    {coins.length > 0 ? (
                        coins.map((coin) => (
                            <div key={coin.id} className="h-sub-card" onClick={() => handleViewDetails(coin.id)} >
                                <div className="img-t-sub-card">
                                <img className='h-sub-img' src={coin.image} alt={coin.name} />
                                <h4>{coin.name}</h4>
                            </div>
                                <p>Price: {getCurrencySymbol(currency)} {coin.current_price}</p>
                                <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
                                <p className='cps'><span>Price:</span><span className='price-h' style={{ color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}` }} >{coin.price_change_percentage_24h.toFixed(2)}%</span> <span className='price-icon-h'><i className={`price-icon-main bx ${coin.price_change_percentage_24h > 0 ? "bxs-up-arrow" : "bxs-down-arrow"}`} style={{ color: `${coin.price_change_percentage_24h > 0 ? "green" : "red"}` }} ></i></span> </p>
                            </div>
                        ))
                    ) : (
                        <p>No coins available.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
