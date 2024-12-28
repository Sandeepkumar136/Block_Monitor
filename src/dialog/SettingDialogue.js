import React, { useState } from "react";
import { useSetting } from "../context/SdialogContext";
import ReactSwitch from "react-switch";
import { useDarkMode } from "../context/DarkModeContext";
import { useCurrency } from "../context/CurrencyContext";

const SettingDialogue = () => {
  const { isSettingOpen, closeSetting } = useSetting();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const {currency, changeCurrency, currencyOptions} = useCurrency();

  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  // Close dialog when clicking outside
  const handleOutsideClickSetting = (e) => {
    if (e.target.id === "setting-overlay") {
      closeSetting();
    }
  };

  return (
    isSettingOpen && (
      <div id="setting-overlay" className="setting-overlay" onClick={handleOutsideClickSetting}>
        <div className="setting-box">
          <h4 className="s-heading">Settings</h4>
          <ul className="setting-items">
            {/* Dark Mode Toggle */}
            <li className="setting-list">
              <span className="left-setting">
                {
                  darkMode ?(
                    <i className="bx bx-moon"></i>
                  ):(
                    <i className="bx bx-sun"></i>
                  )
                }
                <span className="s-t-it">Dark Mode</span>
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={toggleDarkMode} // Directly toggles dark mode
                  checked={darkMode} // Binds to dark mode state
                  onColor="#007bff"
                  offColor="#ff6868"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={48}
                />
              </div>
            </li>

            {/* Currency Change Toggle */}
            <li className="setting-list">
              <span className="left-setting">
                <i className="bx bx-dollar"></i> <span className="s-t-it">Change Currency</span>
              </span>
              <div className="right-setting">
                <select name="currency" 
                value={currency}
                className="cur-setting" onChange={(e)=> changeCurrency(e.target.value)}>
                  {
                    currencyOptions.length>0?(
                      currencyOptions.map((curr)=>(
                        <option value={curr} key={curr} className="curr-options">
                          {curr.toUpperCase()}
                        </option>
                      ))
                    ):(
                      <option className="curr-options">
                        Loading...
                      </option>
                    )
                  }
                </select>
              </div>
            </li>

            {/* Alerts Toggle */}
            <li className="setting-list">
              <span className="left-setting">
                <i className="bx bxs-bell"></i> <span className="s-t-it">Alerts</span>
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={() => setAlertsEnabled((prev) => !prev)}
                  checked={alertsEnabled}
                  onColor="#007bff"
                  offColor="#ff6868"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={48}
                />
              </div>
            </li>

            {/* Delete All Data Toggle */}
            <li className="setting-list">
              <span className="left-setting">
                <i className="bx bx-data"></i> <span className="s-t-it">Delete All Data</span>
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={() => setDeleteConfirmation((prev) => !prev)}
                  checked={deleteConfirmation}
                  onColor="#007bff"
                  offColor="#ff6868"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={48}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default SettingDialogue;
