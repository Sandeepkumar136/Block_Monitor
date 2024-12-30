import React, { useState } from 'react';
import Navbar from './Utils/Navbar';
import './UI/Style.css';
import { DialogProvider } from './context/DialogContext';
import HomePage from './components/HomePage';
import CoinDetails from './Pages/CoinDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DialogOne from './dialog/DialogOne';
import SearchResults from './content/SearchResults';
import { SdialogProvider } from './context/SdialogContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import CoinCompare from './Pages/CoinCompare';
import News from './components/News';
import { ToastContainer } from 'react-toastify';
import { FavoritesProvider } from './context/FavoritesContext';
import Favorites from './Pages/Favorites';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Manage search query state
  

  return (
    <Router>
      <DialogProvider>
        <SdialogProvider>
          <DarkModeProvider>
            <CurrencyProvider>
              <FavoritesProvider>
          <Navbar />
          {/* DialogOne with search query management */}
          <DialogOne setSearchQuery={setSearchQuery} />

          <Routes>
            {/* Search results route */}
            <Route
              path="/search"
              element={<SearchResults searchQuery={searchQuery} />}
            />
            {/* Homepage route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/coincompare" element={<CoinCompare />} />
            <Route path="/news" element={<News />} />
            <Route path="/favorites" element={<Favorites />} />

            {/* Dynamic coin details route */}
            <Route path="/coin/:id" element={<CoinDetails />} />
            {/* Fallback route for 404 */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
          <ToastContainer/>
          </FavoritesProvider>
          </CurrencyProvider>
          </DarkModeProvider>
        </SdialogProvider>
      </DialogProvider>
    </Router>
  );
};

export default App;
