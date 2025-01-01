import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify'; // Import Toastify for notifications
import { useToastContext } from './ToastContext'; // Import ToastContext for toastEnabled state

// Create a context for favorites
const FavoritesContext = createContext();

// FavoritesProvider: Manages state and provides context to children
export const FavoritesProvider = ({ children }) => {
    const { toastEnabled } = useToastContext(); // Get toastEnabled flag from ToastContext

    // Function to load favorites from localStorage
    const loadFavoritesFromLocalStorage = () => {
        try {
            const storedFavorites = localStorage.getItem('favorites');
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error("Error accessing localStorage:", error);
            return [];
        }
    };

    // State to manage favorites list
    const [favorites, setFavorites] = useState(loadFavoritesFromLocalStorage());

    // Function to toggle favorite items
    const toggleFavorite = (coin) => {
        setFavorites((prevFavorites) => {
            const isFavorite = prevFavorites.some(fav => fav.id === coin.id); // Check if item is already a favorite
            if (isFavorite) {
                // Remove from favorites
                if (toastEnabled) {
                    toast.error(`${coin.name} removed from favorites!`, { position: "top-right" });
                }
                return prevFavorites.filter(fav => fav.id !== coin.id);
            } else {
                // Add to favorites
                if (toastEnabled) {
                    toast.success(`${coin.name} added to favorites!`, { position: "top-right" });
                }
                return [...prevFavorites, coin];
            }
        });
    };

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Error saving favorites to localStorage:", error);
        }
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Custom hook to use the FavoritesContext
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
