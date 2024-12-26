import React, { useState } from "react";
import Toggle from "rea"
import { useSetting } from "../context/Sdialog";

const SettingDialogue = () => {
  const { isSettingOpen, closeSetting } = useSetting();
  const [checked, setChecked]= useState(false);

  const handleToggle= () => {
    setChecked(!checked);
  }

  const handleOutsideClickSetting = (e) => {
    if (e.target.id === "setting-overlay") {
      closeSetting(); // Close the dialog when clicking outside
    }
  };

  return (
    isSettingOpen && ( // Corrected to use `isSettingOpen`
      <div id="setting-overlay" className="setting-overlay" onClick={handleOutsideClickSetting}>
        <div className="setting-box">
          <ul className="setting-items">
            <li className="setting-list">
              <span className="left setting">
              <i className='bx bx-moon'></i>
              screen
              </span>
              <div className="right-setting">
              </div>
            
            </li>
            <li className="l-s-s-i-d">
            <i className='bx bx-dollar' ></i>
            change currency
            </li>
            <li className="l-s-s-i-d">
            <i className='bx bxs-bell' ></i>
            alerts
            </li>
            <li className="l-s-s-i-d">
            <i class='bx bx-data' ></i>
            delete all data
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default SettingDialogue;
