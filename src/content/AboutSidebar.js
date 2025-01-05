import React, { useState } from "react";

const AboutSidebar = ({ sections, activeSection, scrollToSection }) => {
  const [isAbSidebarOpen, setisSidebarOpen] = useState(true);
  const ToggleSidebar = ()=>{
    setisSidebarOpen(!isAbSidebarOpen);
  }

  // Menu Items Array
  const menuItems = [
    { id: "welcome", label: "Welcome to Block Monitor" },
    { id: "what", label: "What is Block Monitor?" },
    { id: "features", label: "Our Features" },
    { id: "why", label: "Why CoinGecko API?" },
    { id: "Intregration", label: "CoinGecko Intregration" },
    { id: "mission", label: "Our Mission" },
    { id: "tech", label: "Technologies Used" },
    { id: "team", label: "Who We Are?" },
    { id: "support", label: "Get Support" },
    { id: "touch", label: "Get in Touch" },
    
  ];

  return (
    <>
    <div className="ab-container-sbf">
    <i onClick={ToggleSidebar} className={`bx ${isAbSidebarOpen? "bx-chevron-left": "bx-chevron-right"}`} ></i>
      <p className="heading-ab">About</p>
    </div>

    <aside className={`ab-sidebar ${isAbSidebarOpen? "open":"closed"}`} >
      <div className="ab-contain">
      <i onClick={ToggleSidebar} className={`bx ${isAbSidebarOpen? "bx-chevron-left": "bx-chevron-right"}`} ></i>
      <p className="heading-ab">About</p>
      </div>
      <ul className="ab-items">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              scrollToSection(item.id);
              ToggleSidebar();
            }}
            className={`ab-list ${activeSection=== item.id ? "active": ""}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
    </>
  );
};

export default AboutSidebar;
