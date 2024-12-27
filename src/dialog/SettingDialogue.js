import React, { useState } from "react";
import { useSetting } from "../context/Sdialog";
import ReactSwitch from "react-switch";

const SettingDialogue = () => {
  const { isSettingOpen, closeSetting } = useSetting();
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = (checked) => {
    setIsToggled(checked);
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
          <h4 className="s-heading">Setttings</h4>
          <ul className="setting-items">
            <li className="setting-list">
              <span className="left-setting">
                <i className='bx bx-moon theme-icon'></i>
                screen
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={handleToggle}
                  checked={isToggled}
                  onColor="#007bff"
                  offColor="ff6868"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={48}

                />
              </div>

            </li>
            <li className="setting-list">
              <span className="left-setting">
                <i className='bx bx-dollar'></i>
                change currency
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={handleToggle}
                  checked={isToggled}
                  onColor="#007bff"
                  offColor="ff6868"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={48}
                />
              </div>
            </li>
            <li className="setting-list">
              <span className="left-setting">
                <i className='bx bxs-bell'></i>
                alerts
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={handleToggle}
                  checked={isToggled}
                  onColor="#007bff"
                  offColor="ff6868"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={48}
                />
              </div>
            </li>
            <li className="setting-list">
              <span className="left-setting">
                <i className='bx bx-data'></i>
                delete all data
              </span>
              <div className="right-setting">
                <ReactSwitch
                  onChange={handleToggle}
                  checked={isToggled}
                  onColor="#007bff"
                  offColor="ff6868"
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
