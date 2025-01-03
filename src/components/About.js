import React, { useRef, useState, useEffect } from "react";
import images from "../IT/ImageExport";
import AboutSidebar from "../content/AboutSidebar";

const About = () => {
  const sections = {
    welcome: useRef(null),
    what: useRef(null),
    features: useRef(null),
    why: useRef(null),
    mission: useRef(null),
    team: useRef(null),
    support: useRef(null),
    touch: useRef(null),
  };

  const [activeSection, setActiveSection] = useState("welcome");

  const handleScroll = () => {
    const sectionPositions = Object.entries(sections).map(([key, ref]) => ({
      key,
      top: ref.current?.getBoundingClientRect().top,
    }));

    const visibleSection = sectionPositions.find(
      (section) => section.top > 0 && section.top < window.innerHeight / 2
    );

    if (visibleSection) {
      setActiveSection(visibleSection.key);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    sections[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="ab-container">
      <AboutSidebar
        sections={sections}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <div className="ab-img-contain">
        <img className="ab-img" src={images.about} alt="" />
      </div>
      <section ref={sections.welcome} id="welcome">
        <h2>Welcome to Block Monitor</h2>
        <p>Welcome to the world of cryptocurrency tracking!</p>
      </section>
      <section ref={sections.what} id="what">
        <h2>What is CryptoTrack?</h2>
        <p>CryptoTrack is a cutting-edge cryptocurrency tracking app...</p>
      </section>
      <section ref={sections.features} id="features">
        <h2>Our Features</h2>
        <ul>
          <li>Real-Time Cryptocurrency Prices</li>
          <li>Market Trends & Analytics</li>
          <li>Coin Details</li>
          <li>Global Market Overview</li>
        </ul>
      </section>
      <section ref={sections.why} id="why">
        <h2>Why CoinGecko API?</h2>
        <p>The CoinGecko API provides the most reliable...</p>
      </section>
      <section ref={sections.mission} id="mission">
        <h2>Our Mission</h2>
        <p>Our mission is to provide a seamless experience...</p>
      </section>
      <section ref={sections.team} id="team">
        <h2>Who We Are</h2>
        <p>We are a team of passionate developers...</p>
      </section>
      <section ref={sections.support} id="support">
        <h2>Get Support</h2>
        <p>If you need help, contact our support team...</p>
      </section>
      <section ref={sections.touch} id="touch">
        <h2>Get in Touch</h2>
        <p>Contact us for more information!</p>
      </section>
    </div>
  );
};

export default About;
