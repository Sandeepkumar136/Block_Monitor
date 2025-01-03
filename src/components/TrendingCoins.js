import React, { useEffect, useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinners from '../IT/Spinners';

const TrendingCoins = () => {
    const [trendingCoins, setTrendingCoins] = useState([]);
    const [loading, setLoading] = useState(true); // Initialize with true
    const [error, setError] = useState(false);
    const { currency, getCurrencySymbol } = useCurrency();
    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    const fetchTrendingCoins = async () => {
        try {
            setLoading(true); // Ensure loading is set before fetching
            setError(false); // Reset error state
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets',
                {
                    params: {
                        vs_currency: currency,
                        order: 'market_cap_desc',
                        per_page: 100,
                        page: 1,
                        sparkline: false,
                    },
                }
            );
            setTrendingCoins(response.data.slice(0,12));
        } catch (err) {
            console.error('Error fetching trending coins:', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]); // Dependency: currency

    const isFavorite = (coin) => favorites.some((fav) => fav.id === coin.id);

    const handleViewDetails = (coinId) => {
        navigate(`/coin/${coinId}`);
    };

    if (loading) return <Spinners />;

    if (error) {
        return (
            <div className="error-container">
                <div className="img-container-rr"></div>
                <h2>Oops! Something went wrong.</h2>
                <p>Please check your internet connection or try again later.</p>
                <button onClick={fetchTrendingCoins}>
                    <i className="bx bx-refresh"></i>
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
                    {trendingCoins.map((coin) => (
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
                                    className={`bx ${
                                        isFavorite(coin)
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
                                        color: `${
                                            coin.price_change_percentage_24h > 0
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
                                        className={`price-icon-main bx ${
                                            coin.price_change_percentage_24h >
                                            0
                                                ? 'bxs-up-arrow'
                                                : 'bxs-down-arrow'
                                        }`}
                                        style={{
                                            color: `${
                                                coin.price_change_percentage_24h >
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
            </section>
        </div>
    );
};

export default TrendingCoins;
