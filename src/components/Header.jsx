import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-wrapper">
      
      {/* Top info bar */}
      <div className="top-bar">
        <div className="top-left">
        <span className="material-icons top-bar-icon">phone</span>
        <span>+94 070 225 2257</span>

        <span className="material-icons top-bar-icon">email</span>
        <span >sterlingproperties@gmail.com</span>
        </div>  
        <div className="top-right">
          Open Mon-Fri 9am-6pm
        </div>
      </div>

      {/* Main navbar */}
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
          <a href="#">Search Properties</a>
          <a href="#">About Us</a>
          <a href="#">Our Services</a>
          <a href="#">Contact</a>
        </nav>

        <button className="fav-btn">
          <span className="material-symbols-outlined heart-icon">favorite</span>
        </button>
      </div>

    </header>
  );
};

export default Header;