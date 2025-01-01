import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCurrency } from '../context/CurrencyContext';
import images from '../IT/ImageExport';

const Favorites = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const { currency, getCurrencySymbol } = useCurrency();

    // Handle empty favorites list
    if (favorites.length === 0) {
        return (
            <div className="favorites-container">
                <img src={images.favorites} alt="No Favorites" className="favorite-svg" />
                <h2>No Favorites Yet!</h2>
                <p>Add coins to your favorites to see them here.</p>
            </div>
        );
    }

    return (
        <div className="home-page">
            <header className="h-heading-container">
                <h1 className="h-heading">Saved Cryptocurrency</h1>
            </header>
            <section className="h-card-container">
                <div className="h-card-contain">
                    {favorites.map((coin) => {
                        // Handle undefined or null values for safe rendering
                        const currentPrice = coin.current_price || "N/A";
                        const marketCap = coin.market_cap
                            ? coin.market_cap.toLocaleString()
                            : "N/A";
                        const priceChange = coin.price_change_percentage_24h;
                        const priceChangeColor =
                            priceChange > 0 ? "green" : "red";
                        const priceChangeIcon =
                            priceChange > 0
                                ? "bxs-up-arrow"
                                : "bxs-down-arrow";

                        return (
                            <div key={coin.id} className="h-sub-card">
                                <div className="img-t-sub-card">
                                    <img
                                        className="h-sub-img"
                                        src={coin.image}
                                        alt={coin.name}
                                    />
                                    <h4>{coin.name}</h4>
                                    <i
                                        onClick={() => toggleFavorite(coin)}
                                        className="bx bxs-bookmark"
                                        style={{ color: "gold" }}
                                    ></i>
                                </div>
                                <p>
                                    Price: {getCurrencySymbol(currency)}{" "}
                                    {currentPrice}
                                </p>
                                <p>
                                    Market Cap: {getCurrencySymbol(currency)}{" "}
                                    {marketCap}
                                </p>
                                <p className="cps">
                                    <span>Price:</span>
                                    <span
                                        className="price-h"
                                        style={{ color: priceChangeColor }}
                                    >
                                        {priceChange !== undefined
                                            ? `${priceChange.toFixed(2)}%`
                                            : "N/A"}
                                    </span>
                                    <span className="price-icon-h">
                                        <i
                                            className={`price-icon-main bx ${priceChangeIcon}`}
                                            style={{ color: priceChangeColor }}
                                        ></i>
                                    </span>
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Favorites;
