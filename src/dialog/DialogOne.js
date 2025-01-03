import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../context/DialogContext';
import images from '../IT/ImageExport';

const DialogOne = ({ setSearchQuery }) => {
  const { isOpen, closeDialog } = useDialog();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (e.target.id === 'dialog-overlay') {
      closeDialog();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    setSearchQuery(inputValue.toLowerCase());
    closeDialog(); // Close dialog
    navigate('/search'); // Redirect to SearchResults page
  };

  return (
    isOpen && (
      <div id="dialog-overlay" onClick={handleOutsideClick}>
        <div id="dialog-box">
          <div id="dialog-header">
            <h2>Search Cryptocurrency</h2>
            <img src={images.search_config} alt="searchbar-img" />
          </div>
          <div id="dialog-content">
            <form onSubmit={handleFormSubmit} className="search-form">
              <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <button type="submit"><i className='bx bx-search'></i></button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default DialogOne;
