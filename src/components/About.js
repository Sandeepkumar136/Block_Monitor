import React, { useRef, useState, useEffect } from "react";
import images from "../IT/ImageExport";
import AboutSidebar from "../content/AboutSidebar";
import Json from "../JSON/JsonProvider";

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
      <section ref={sections.welcome} id="welcome">
        <div className="w-intro-contain">
        <div className="main-question-w">
      <div className="ab-img-contain">
        <img className="ab-img" src={images.about} alt="" />
      </div>
          <h2 className="intro-q">{Json.welcome.blockMonitor.introduction.title}</h2>
          <p className="intro-p-disc">{Json.welcome.blockMonitor.introduction.description}</p>
        </div>
        <div className="quest-contain-w">
          <h2 className="q-c-w-m">{Json.welcome.blockMonitor.whyChooseUs.title}</h2>
          <ul className="q-m-co-list">
            {Json.welcome.blockMonitor.whyChooseUs.features.map((feature, index)=>(
              <li key={index} className="q-m-co-item">
                <strong>{feature.title}</strong> <span>{feature.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="quest-contain-w">
          <h2 className="q-c-w-m">{Json.welcome.blockMonitor.whoCanBenefit.title}</h2>
          <ul className="q-m-co-list">
            {Json.welcome.blockMonitor.whoCanBenefit.groups.map((group, index)=>(
              <li key={index} className="q-m-co-item">
                <strong>{group.title}</strong> <span>{group.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lpu-qus-fds">
          <h2 className="heading-lpu">{Json.welcome.blockMonitor.community.title}</h2>
          <p className="text-lpu">{Json.welcome.blockMonitor.community.description}</p>
        </div>
        </div>
      </section>
      <section ref={sections.what} id="what">
      <div className="w-intro-contain">
        <div className="main-question-w">
      <div className="ab-img-contain">
        <img className="ab-img" src={images.what_is_blockmonitor} alt="" />
      </div>
          <h2 className="intro-q">{Json.what.blockMonitor.section}</h2>
          <p className="intro-p-disc">{Json.what.blockMonitor.description}</p>
          <p className="intro-p-disc" style={{margin: "1rem"}}>{Json.what.blockMonitor.poweredBy}</p>
        </div>
        <div className="quest-contain-w">
          <h2 className="q-c-w-m">{Json.welcome.blockMonitor.whyChooseUs.title}</h2>
          <ul className="q-m-co-list">
            {Json.what.blockMonitor.highlights.map((highlight, index)=>(
              <li key={index} className="q-m-co-item">
                <strong>{highlight.title}</strong> <span>{highlight.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lpu-qus-fds">
          <h2 className="heading-lpu">Conclusion</h2>
          <p className="text-lpu">{Json.what.blockMonitor.conclusion}</p>
        </div>
        </div>
      </section>
      <section ref={sections.features} id="features">
      <div className="w-intro-contain">
        <div className="main-question-w">
      <div className="ab-img-contain">
        <img className="ab-img" src={images.features} alt="" />
      </div>
          <h2 className="intro-q">{Json.features.blockMonitor.section}</h2>
          <p className="intro-p-disc">{Json.features.blockMonitor.description}</p>
        </div>
        <div className="quest-contain-w">
          <ul className="q-m-co-list">
            {Json.features.blockMonitor.features.map((feature, index)=>(
              <li key={index} className="q-m-co-item">
                <strong>{feature.title}</strong> <span>{feature.description}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>
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
