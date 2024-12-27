import React, { useState } from 'react';
import Navbar from './Utils/Navbar';
import './UI/Style.css';
import { DialogProvider } from './context/DialogContext';
import HomePage from './components/HomePage';
import CoinDetails from './components/CoinDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DialogOne from './dialog/DialogOne';
import SearchResults from './content/SearchResults';
import { SdialogProvider } from './context/SdialogContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import CoinCompare from './components/CoinCompare';
import News from './components/News';

const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Manage search query state

  return (
    <Router>
      <DialogProvider>
        <SdialogProvider>
          <DarkModeProvider>
            <CurrencyProvider>
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
            {/* Dynamic coin details route */}
            <Route path="/coin/:id" element={<CoinDetails />} />
            {/* Fallback route for 404 */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
          </CurrencyProvider>
          </DarkModeProvider>
        </SdialogProvider>
      </DialogProvider>
    </Router>
  );
};

export default App;
