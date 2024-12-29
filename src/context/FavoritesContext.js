import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify'; 

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const loadFavoritesFromLocalStorage = () => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    const [favorites, setFavorites] = useState(loadFavoritesFromLocalStorage());

    const toggleFavorite = (coin) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some(fav => fav.id === coin.id);
            let updatedFavorites;
            if (isFavorite) {
                updatedFavorites = prevFavorites.filter(fav => fav.id !== coin.id); // Remove from favorites
                toast.error(`${coin.name} removed from favorites!`, { position: "top-right" });
            } else {
                updatedFavorites = [...prevFavorites, coin]; // Add to favorites
                toast.success(`${coin.name} added to favorites!`, { position: "top-right" });
            }

            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

            return updatedFavorites;
        });
    };

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};
