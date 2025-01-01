import React, { createContext, useState, useContext } from 'react';

// Create a context for toast settings
const ToastContext = createContext();

// ToastProvider: Manages toastEnabled state and provides context to children
export const ToastProvider = ({ children }) => {
    const [toastEnabled, setToastEnabled] = useState(true); // Default: Toast notifications enabled

    return (
        <ToastContext.Provider value={{ toastEnabled, setToastEnabled }}>
            {children}
        </ToastContext.Provider>
    );
};

// Custom hook to use the ToastContext
export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastContext must be used within a ToastProvider");
    }
    return context;
};
