import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header-wrapper">
            <div className="main-nav">
        <div className="logo-section">
            <img className="logo" src="src/assets/Logo.webp" alt="Sterling Properties logo" />
          <div ></div>
          <div>
            <h1>Sterling Properties</h1>
            <p>Your Home, Our Priority</p>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#properties">Search Properties</a>
          <a href="#about">About Us</a>
          <a href="#services">Our Services</a>
          <a href="#">Contact</a>
          <button
            className="fav-btn"
            onClick={() => navigate("/favourites")}
            title="View favourites"
          >
            <FaHeart className="heart-icon" />
          </button>
        </nav>

      </div>

    </header>
  );
};

export default Header;