import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCurrency } from '../context/CurrencyContext';

const Favorites = () => {
    const { favorites, toggleFavorite } = useFavorites();
    const { currency, getCurrencySymbol } = useCurrency();

    if (favorites.length === 0) {
        return (
            <div className="favorites-container">
                <h2>No Favorites Yet!</h2>
                <p>Add coins to your favorites to see them here.</p>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h2>Your Favorite Coins</h2>
            <div className="favorites-grid">
                {favorites.map((coin) => (
                    <div key={coin.id} className="favorite-card">
                        <div className="img-t-sub-card">
                            <img className="h-sub-img" src={coin.image} alt={coin.name} />
                            <h4>{coin.name}</h4>
                            <i
                                onClick={() => toggleFavorite(coin)}
                                className="bx bxs-bookmark"
                                style={{ color: "gold" }}
                            ></i>
                        </div>
                        <p>Price: {getCurrencySymbol(currency)} {coin.current_price}</p>
                        <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
                        <p
                            className="cps"
                            style={{
                                color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                            }}
                        >
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
