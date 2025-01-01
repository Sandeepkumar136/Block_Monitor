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
          <button onClick={openDialog} className="nav-items"><i className='bx bx-search-alt' ></i></button>
          <Link to='/favorites' className="nav-items"><i className='bx bxs-bookmark-star' ></i></Link>
          <button className="nav-items" onClick={openSetting} ><i className='bx bx-cog'></i></button>
          <button onClick={toggleSidebar} className="nav-items-toggle">
          <i className='bx bx-menu' ></i>
        </button>
        </ul>
        
      </nav>
      <aside className={showSidebar ? "sidebar active" : "sidebar"}>
        <Link to="/" onClick={toggleSidebar} className="sidebar-header">
          <h2 className="sidebar-title">Block monitor</h2>
          <i  className='bx bx-x'></i>
        </Link>
        <ul className="sidebar-list">
          <Link onClick={toggleSidebar} to="/trending" className="sidebar-items">Top Trending</Link>
          <li  className="sidebar-items">Top Performer</li>
          <Link onClick={toggleSidebar} to="/coincompare" className="sidebar-items">Compare Coins</Link>
          <Link onClick={toggleSidebar} to="/news" className="sidebar-items">News and Market Trends</Link>
          <li onClick={toggleSidebar} className="sidebar-items">About us</li>

        </ul>
        <ul className="sidebar-bottom-items">
          <button onClick={()=> {openDialog(); toggleSidebar();}} ><i className='bx bx-search-alt' ></i></button>
          <Link to='/favorites' onClick={toggleSidebar} ><i className='bx bxs-bookmark-star' ></i></Link>
          <button onClick={()=> {openSetting(); toggleSidebar();}} ><i className='bx bx-cog'></i></button>
        </ul>
      </aside>
      <DialogOne />
      <SettingDialogue/>
    </div>
  )
}

export default Navbar
