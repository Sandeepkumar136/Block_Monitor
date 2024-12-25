import React, { useState } from 'react';
import Navbar from './Utils/Navbar';
import './UI/Style.css';
import { DialogProvider } from './context/DialogContext';
import HomePage from './components/HomePage';
import CoinDetails from './components/CoinDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DialogOne from './dialog/DialogOne';
import SearchResults from './content/SearchResults';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <DialogProvider>
        <Navbar />
        <DialogOne setSearchQuery={setSearchQuery} />

        <Routes>
          <Route
            path="/search"
            element={<SearchResults searchQuery={searchQuery} />}
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
      </DialogProvider>
    </Router>
  );
};

export default App;
