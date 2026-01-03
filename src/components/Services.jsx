import React from "react";
import "./Services.css";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaCamera,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaListAlt,
  FaShieldAlt,
} from "react-icons/fa";

function Services() {
  return (
    <div className="services-page" id="services">
      <header className="services-hero">
        <h1>Our Services</h1>
        <p>
          Professional property services designed to help you find, view, and
          manage your ideal home with ease.
        </p>
      </header>

      <section className="services-grid">
        <div className="service-card">
          <FaSearch className="service-icon" />
          <h3>Property Search</h3>
          <p>
            Advanced search with filters for price, bedrooms, property type,
            postcode area, and date added.
          </p>
        </div>

        <div className="service-card">
          <FaHome className="service-icon" />
          <h3>Detailed Property Listings</h3>
          <p>
            View high-quality images, key details, and descriptions for every
            property in one place.
          </p>
        </div>

        <div className="service-card">
          <FaCamera className="service-icon" />
          <h3>Image Galleries</h3>
          <p>
            Browse 6-8 images per property with a smooth and intuitive gallery
            experience.
          </p>
        </div>

        <div className="service-card">
          <FaMapMarkedAlt className="service-icon" />
          <h3>Location & Maps</h3>
          <p>
            Explore property locations using integrated maps for better
            decision-making.
          </p>
        </div>

        <div className="service-card">
          <FaHeart className="service-icon" />
          <h3>Favourites</h3>
          <p>
            Save, view, and manage your favourite properties with a single
            click.
          </p>
        </div>

        <div className="service-card">
          <FaMobileAlt className="service-icon" />
          <h3>Responsive Design</h3>
          <p>
            Fully responsive layout optimised for desktop, tablet, and mobile
            devices.
          </p>
        </div>

        <div className="service-card">
          <FaListAlt className="service-icon" />
          <h3>Property Results Display</h3>
          <p>
            Search results are presented in a clean, structured layout with
            images, prices, and short descriptions for easy comparison.
          </p>
        </div>

        <div className="service-card">
          <FaShieldAlt className="service-icon" />
          <h3>Client-Side Security</h3>
          <p>
            Protection against client-side attacks using CSP, safe JSX
            rendering, and secure handling of user input.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Services;
