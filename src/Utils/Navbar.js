import React, { useState } from 'react'
import DialogOne from '../dialog/DialogOne';
import { useDialog } from '../context/DialogContext';
import { Link } from 'react-router-dom';
import { useSetting } from '../context/SdialogContext';
import SettingDialogue from '../dialog/SettingDialogue';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { openDialog } = useDialog();
  const {openSetting} = useSetting();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  return (
    <div>
      <nav className="nav">
        <Link to="/" className="logo-contain">
          <h2 className='logo'>Block monitor</h2>
        </Link>
        <ul className="nav-list">
          <button onClick={openDialog} className="nav-items"><i className='bx bx-search-alt' ></i><span className="n-icon-text">Search</span></button>
          <button className="nav-items"><i className='bx bxs-notification' ></i><span className="n-icon-text">Notifications</span></button>
          <button className="nav-items"><i className='bx bxs-bookmark-star' ></i><span className="n-icon-text">Favorites</span></button>
          <button className="nav-items" onClick={openSetting} ><i className='bx bx-cog'></i><span className='n-icon-text'>Settings</span></button>
          <li className="nav-items-plane">About us</li>
        </ul>
        <button onClick={toggleSidebar} className="nav-toggle">
          <i className='bx bx-menu' ></i>
        </button>
      </nav>
      <aside className={showSidebar ? "sidebar active" : "sidebar"}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Block monitor</h2>
          <i onClick={toggleSidebar} className='bx bx-x'></i>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-items">Cryptocurrency List</li>
          <Link to="/coincompare" className="sidebar-items">Compare Coins</Link>
          <li className="sidebar-items">News and Market Trends</li>
          <li className="sidebar-items">About us</li>

        </ul>
        <ul className="sidebar-bottom-items">
          <button><i className='bx bx-search-alt' ></i></button>
          <button><i className='bx bxs-notification' ></i></button>
          <button><i className='bx bxs-bookmark-star' ></i></button>
          <button><i className='bx bx-cog'></i></button>
        </ul>
      </aside>
      <DialogOne />
      <SettingDialogue/>
    </div>
  )
}

export default Navbar
