import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-tag">PREMIER PROPERTIES</span>

        <h1>Discover Your Perfect Home in London</h1>

        <p>
          Exceptional properties in the heart of the capital. Experience
          unparalleled service with London's most trusted estate agency since
          1995.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">Browse Properties</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>

      <div className="hero-stats">
        <div>
          <h2>5,000+</h2>
          <span>Properties Listed</span>
        </div>
        <div>
          <h2>30 Years</h2>
          <span>Of Excellence</span>
        </div>
        <div>
          <h2>10,000+</h2>
          <span>Happy Clients</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;