import React from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header-wrapper">
      <div className="main-nav">
        <div className="logo-section">
          <img
            className="logo"
            src="src/assets/Logo.webp"
            alt="Sterling Properties logo"
          />
          <div>
            <h1>Sterling Properties</h1>
            <p>Your Home, Our Priority</p>
          </div>
        </div>

        <nav className="nav-links">
          <button onClick={() => goToSection("properties")}>
            Search Properties
          </button>
          <button onClick={() => goToSection("about")}>
            About Us
          </button>
          <button onClick={() => goToSection("services")}>
            Our Services
          </button>
          <button onClick={() => goToSection("contact")}>
            Contact
          </button>
          </nav>
          <button
            className="fav-btn"
            title="View favourites"
            onClick={() => goToSection("favourites")}
          >
            <FaHeart className="heart-icon" />
          </button>
        
      </div>
    </header>
  );
};

export default Header;