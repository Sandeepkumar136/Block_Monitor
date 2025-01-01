import React, { useState } from "react";
import { useSetting } from "../context/SdialogContext";
import ReactSwitch from "react-switch";
import { useDarkMode } from "../context/DarkModeContext";
import { useCurrency } from "../context/CurrencyContext";
import { useToastContext } from "../context/ToastContext";
import { useConfirmDialog } from "../context/ConfirmDialogContext";

const SettingDialogue = () => {
  const { isSettingOpen, closeSetting } = useSetting();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { currency, changeCurrency, currencyOptions, getCurrencySymbol } = useCurrency();
  const { toastEnabled, setToastEnabled } = useToastContext();
  const { openConfirmDialog } = useConfirmDialog();

  const handleDeleteAllData = () => {
    localStorage.clear();
    console.log("All data cleared");
  };

  const confirmDeleteAllData = () => {
    console.log("Opening confirmation dialog...");
    openConfirmDialog(
      "Are you sure you want to delete all data.",
      handleDeleteAllData
    );
  };
  

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
                {darkMode ? (
                  <i className="bx bx-moon"></i>
                ) : (
                  <i className="bx bx-sun"></i>
                )}
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
                <i>{getCurrencySymbol(currency)}</i> <span className="s-t-it">Change Currency</span>
              </span>
              <div className="right-setting">
                <select
                  name="currency"
                  value={currency}
                  className="cur-setting"
                  onChange={(e) => changeCurrency(e.target.value)}
                >
                  {currencyOptions.length > 0 ? (
                    currencyOptions.map((curr) => (
                      <option value={curr} key={curr} className="curr-options">
                        {curr.toUpperCase()}
                      </option>
                    ))
                  ) : (
                    <option className="curr-options">Loading...</option>
                  )}
                </select>
              </div>
            </li>

            {/* Alerts Toggle */}
            <li className="setting-list">
              <span className="left-setting">
                <i className={`bx ${toastEnabled ? "bxs-bell":"bxs-bell-off"}`} ></i> <span className="s-t-it">{toastEnabled ? "Enabled Alerts" : "Disabled Alerts"}</span>
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={() => setToastEnabled(!toastEnabled)}
                  checked={toastEnabled}
                  onColor="#007bff"
                  offColor="#ff6868"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={48}
                />
              </div>
            </li>

            {/* Delete All Data Button */}
            <li className="setting-list">
              <span className="left-setting">
                <i className="bx bx-data"></i> <span className="s-t-it">Delete All Data</span>
              </span>
              <div className="right-setting">
                <button onClick={confirmDeleteAllData} className="delete-data-btn">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default SettingDialogue;
