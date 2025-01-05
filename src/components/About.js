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
    Intregration: useRef(null),
    mission: useRef(null),
    tech: useRef(null),
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
      <div className="ab-con-contain">

      <section ref={sections.welcome} id="welcome">
        <div className="w-intro-contain">
          <div className="main-question-w">
            <div className="ab-img-contain">
              <img className="ab-img" src={images.about} alt="about" />
            </div>
            <h2 className="intro-q">{Json.welcome.blockMonitor.introduction.title}</h2>
            <p className="intro-p-disc">{Json.welcome.blockMonitor.introduction.description}</p>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">{Json.welcome.blockMonitor.whyChooseUs.title}</h2>
            <ul className="q-m-co-list">
              {Json.welcome.blockMonitor.whyChooseUs.features.map((feature, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{feature.title}</strong> <span>{feature.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">{Json.welcome.blockMonitor.whoCanBenefit.title}</h2>
            <ul className="q-m-co-list">
              {Json.welcome.blockMonitor.whoCanBenefit.groups.map((group, index) => (
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
              <img className="ab-img" src={images.what_is_blockmonitor} alt="what" />
            </div>
            <h2 className="intro-q">{Json.what.blockMonitor.section}</h2>
            <p className="intro-p-disc">{Json.what.blockMonitor.description}</p>
            <p className="intro-p-disc" style={{ margin: "1rem" }}>{Json.what.blockMonitor.poweredBy}</p>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">{Json.welcome.blockMonitor.whyChooseUs.title}</h2>
            <ul className="q-m-co-list">
              {Json.what.blockMonitor.highlights.map((highlight, index) => (
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
              <img className="ab-img" src={images.features} alt="features" />
            </div>
            <h2 className="intro-q">{Json.features.blockMonitor.section}</h2>
            <p className="intro-p-disc">{Json.features.blockMonitor.description}</p>
          </div>
          <div className="quest-contain-w">
            <ul className="q-m-co-list">
              {Json.features.blockMonitor.features.map((feature, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{feature.title}</strong> <span>{feature.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section ref={sections.why} id="why">
        <div className="w-intro-contain">
          <div className="main-question-w">
            <div className="ab-img-contain">
              <img className="ab-img" src={images.coin} alt="coin" />
            </div>
            <h2 className="intro-q">{Json.coin.coinGecko.section}</h2>
            <p className="intro-p-disc">{Json.coin.coinGecko.description}</p>
            <h2 className="intro-q">{Json.coin.coinGecko.blockMonitorIntegration.title}</h2>
            <p className="intro-p-disc" style={{ margin: "1rem" }}>{Json.coin.coinGecko.blockMonitorIntegration.description}</p>
          </div>
          <div className="quest-contain-w">
            <ul className="q-m-co-list">
              {Json.coin.coinGecko.blockMonitorIntegration.features.map((feature, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{feature.title}</strong> <span>{feature.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lpu-qus-fds">
            <h2 className="heading-lpu">{Json.coin.coinGecko.whyCoinGecko.title}</h2>
            <p className="text-lpu">{Json.coin.coinGecko.whyCoinGecko.description}</p>
            <p className="text-lpu">{Json.coin.coinGecko.whyCoinGecko.conclusion}</p>
          </div>
        </div>
      </section>
      <section ref={sections.Intregration} id="intregration">
        <div className="w-intro-contain">
          <div className="main-question-w">
            <div className="ab-img-contain">
              <img className="ab-img" src={images.Intregration} alt="coin" />
            </div>
            <h2 className="intro-q">{Json.Intregration.coinGeckoAPI.section}</h2>
            <p className="intro-p-disc">{Json.Intregration.coinGeckoAPI.description}</p>
          </div>
          <div className="ab-code-per">
            {
              Json.Intregration.coinGeckoAPI.apiEndpoints.map((e, index) => (
                <div key={index} className="api-endp-main">
                  <h2 className="endp">{e.title}</h2>
                  <p className="endp-desc">{e.description}</p>
                  <div className="button-contain-end">
                    <span>{e.endpoint}</span>
                    <a href={e.apiLink} className="endp-link">Link</a>
                  </div>
                  <p className="endp-exam">{e.example}</p>
                </div>
              ))
            }
          </div>
          <div className="quest-contain-w">
            {Json.Intregration.coinGeckoAPI.integrationHowItWorks.map((desc, index) => (
              <ul key={index} className="end-p-items">
                <li className="end-p-list">{desc.description}</li>
              </ul>
            ))}
          </div>
        </div>
      </section>
      <section ref={sections.mission} id="mission">
      <div className="w-intro-contain">
          <div className="main-question-w">
            <div className="ab-img-contain">
              <img className="ab-img" src={images.mission} alt="what" />
            </div>
            <h2 className="intro-q">{Json.mission.mission.title}</h2>
            <p className="intro-p-disc">{Json.mission.mission.description}</p>
          </div>
          <div className="quest-contain-w">
            <ul className="q-m-co-list">
              {Json.mission.mission.whatWeStandFor.map((element, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{element.title}</strong> <span>{element.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section ref={sections.tech} id="team">
      <div className="w-intro-contain">
          <div className="main-question-w">
            <div className="ab-img-contain">
              <img className="ab-img" src={images.tech} alt="about" />
            </div>
            <h2 className="intro-q">Technologies Used.</h2>
            <p className="intro-p-disc">{Json.tech.technologiesUsed.description}</p>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">Frontend Technologies.</h2>
            <ul className="q-m-co-list">
              {Json.tech.technologiesUsed.categories.frontendTechnologies.map((front, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{front.name}</strong> <span>{front.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">Data Visualization.</h2>
            <ul className="q-m-co-list">
              {Json.tech.technologiesUsed.categories.dataVisualization.map((group, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{group.name}</strong> <span>{group.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">State Management Utilites.</h2>
            <ul className="q-m-co-list">
              {Json.tech.technologiesUsed.categories.stateManagementUtilities.map((group, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{group.name}</strong> <span>{group.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">User Interface Enhancements.</h2>
            <ul className="q-m-co-list">
              {Json.tech.technologiesUsed.categories.userInterfaceEnhancements.map((group, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{group.name}</strong> <span>{group.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="quest-contain-w">
            <h2 className="q-c-w-m">Data Visualization</h2>
            <ul className="q-m-co-list">
              {Json.tech.technologiesUsed.whyTheseTechnologies.map((group, index) => (
                <li key={index} className="q-m-co-item">
                  <strong>{group.reason}</strong> <span>{group.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lpu-qus-fds">
            <h2 className="heading-lpu">{Json.tech.mission.title}</h2>
            <p className="text-lpu">{Json.tech.mission.description}</p>
          </div>
        </div>
      </section>
      <section ref={sections.team} id="team">
        team section
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
    </div>

  );
};

export default About;
