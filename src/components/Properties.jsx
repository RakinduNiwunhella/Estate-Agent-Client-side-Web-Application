import React from "react";
import { Link } from "react-router-dom";
import data from "../assets/properties.json";
import "./Properties.css";

export const Properties = ({ favourites, addToFavourites }) => {
  const properties = data.properties;

  return (
    <div className="properties-wrapper">
      <div className="search-card">
        <div className="search-row">
          <div className="search-input">
            <span className="icon">🔍</span>
            <input
              type="text"
              placeholder="Search by postcode or area..."
            />
          </div>

          <button className="filter-btn">
            <span className="filter-icon">☰</span>
            Filters
            <span className="badge">1</span>
          </button>

          <select className="sort-select">
            <option>Most Recent</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="divider"></div>

        <p className="results">
          <span>{properties.length}</span> properties found
        </p>
      </div>

      {/* PROPERTY CARDS */}
      <div className="property-grid">
        {properties.map((p) => {
          const isFavourite = favourites.includes(p.id);

          return (
            <div
              key={p.id}
              className="property-card"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("propertyId", p.id)
              }
            >
              <Link to={`/property/${p.id}`} className="property-link">
                <div className="image-wrapper">
                  <img src={p.picture} alt={p.type} />
                  <span className="price">
                    £{p.price.toLocaleString()}
                  </span>
                </div>
              </Link>

              {/* FAVOURITE BUTTON */}
              <button
                className="fav-btn"
                onClick={() => addToFavourites(p.id)}
                disabled={isFavourite}
                title={
                  isFavourite
                    ? "Already in favourites"
                    : "Add to favourites"
                }
              >
                {isFavourite ? "❤️" : "♡"}
              </button>

              <div className="card-body">
                <h3>
                  {p.type} • {p.bedrooms} Bedroom
                </h3>

                <p className="location">📍 {p.location}</p>

                <div className="meta">
                  <span>🛏 {p.bedrooms} beds</span>
                  <span>🏠 {p.type}</span>
                </div>

                <div className="card-footer">
                  <span className="date">
                    📅 {p.added.day}/{p.added.month}/{p.added.year}
                  </span>
                  <Link
                    to={`/property/${p.id}`}
                    className="details"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
