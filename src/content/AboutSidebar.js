import React, { useEffect, useState } from "react";

const AboutSidebar = ({ sections, activeSection, scrollToSection }) => {
  const [isAbSidebarOpen, setAbSidebarOpen] = useState(true); // Sidebar toggle state
  const [isMobileView, setIsMobileView] = useState(false); // Mobile view detection

  // Detect window resize and update mobile view state
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth > 768) setAbSidebarOpen(true); // Ensure sidebar stays open in desktop view
    };

    handleResize(); // Initial call to set state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Sidebar Function
  const toggleAbSidebar = () => {
    if (isMobileView) {
      setAbSidebarOpen((prevState) => !prevState);
    }
  };

  // Menu Items Array
  const menuItems = [
    { id: "welcome", label: "Welcome to Block Monitor" },
    { id: "what", label: "What is Block Monitor?" },
    { id: "features", label: "Our Features" },
    { id: "why", label: "Why CoinGecko API?" },
    { id: "mission", label: "Our Mission" },
    { id: "team", label: "Who We Are?" },
    { id: "support", label: "Get Support" },
    { id: "touch", label: "Get in Touch" },
  ];

  return (
    <>
      {/* Toggle Button (Always Visible in Mobile View) */}
      {isMobileView && (
        <button
          className={`toggle-button ${isAbSidebarOpen ? "open" : "closed"}`}
          onClick={toggleAbSidebar}
        >
          {isAbSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
      )}

      {/* Sidebar */}
      <aside className={`ab-sidebar ${isAbSidebarOpen ? "open" : "closed"}`}>
        <div className="ab-logo-sec">
          {!isMobileView && (
            <div className="ab-btn">
              <button className="toggle-button" onClick={toggleAbSidebar}>
                {isAbSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Menu Items */}
        <ul className="ab-items">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                if (isMobileView) toggleAbSidebar(); // Auto-close sidebar in mobile view after click
              }}
              className={`ab-item ${activeSection === item.id ? "active" : ""}`}
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
