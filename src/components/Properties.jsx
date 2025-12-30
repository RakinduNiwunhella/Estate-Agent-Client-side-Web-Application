import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../assets/properties.json";
import "./Properties.css";

export const Properties = ({ favourites, addToFavourites }) => {
  const properties = data.properties;

  const [filters, setFilters] = useState({
  type: "Any",
  minPrice: "",
  maxPrice: "",
  minBeds: "",
  maxBeds: "",
  dateFrom: "",
  dateTo: "",
  postcode: ""
});
const resetFilters = () => {
  setFilters({
    type: "Any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    dateFrom: "",
    dateTo: "",
    postcode: ""
  });
};
const filteredProperties = properties.filter((p) => {

  // 2. TYPE
  if (filters.type !== "Any" && p.type !== filters.type) {
    return false;
  }

  // 3. PRICE
  if (filters.minPrice && p.price < filters.minPrice) return false;
  if (filters.maxPrice && p.price > filters.maxPrice) return false;

  // 4. BEDROOMS
  if (filters.minBeds && p.bedrooms < filters.minBeds) return false;
  if (filters.maxBeds && p.bedrooms > filters.maxBeds) return false;

  // 5. DATE ADDED
  if (filters.dateFrom || filters.dateTo) {
    const propertyDate = new Date(
      `${p.added.year}-${p.added.month}-${p.added.day}`
    );

    if (filters.dateFrom && propertyDate < new Date(filters.dateFrom)) {
      return false;
    }

    if (filters.dateTo && propertyDate > new Date(filters.dateTo)) {
      return false;
    }
  }

  // 6. POSTCODE AREA (first part only)
  if (filters.postcode) {
    const postcode = p.location.split(" ").pop().toUpperCase();
    if (!postcode.startsWith(filters.postcode.toUpperCase())) {
      return false;
    }
  }

  return true;
});
  return (
    <div className="properties-wrapper">
      <div className="search-card">
        <div className="filters-row">

  <div className="filter-field">
    <span className="filter-icon">🏠</span>
    <select
      value={filters.type}
      onChange={(e) =>
        setFilters({ ...filters, type: e.target.value })
      }
    >
      <option value="Any">Any Type</option>
      <option value="House">House</option>
      <option value="Flat">Flat</option>
    </select>
  </div>

  <div className="filter-field">
    <span className="filter-icon">£</span>
    <input
      type="number"
      placeholder="Min Price"
      onChange={(e) =>
        setFilters({ ...filters, minPrice: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon">£</span>
    <input
      type="number"
      placeholder="Max Price"
      onChange={(e) =>
        setFilters({ ...filters, maxPrice: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon">🛏</span>
    <input
      type="number"
      placeholder="Min Beds"
      onChange={(e) =>
        setFilters({ ...filters, minBeds: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon">🛏</span>
    <input
      type="number"
      placeholder="Max Beds"
      onChange={(e) =>
        setFilters({ ...filters, maxBeds: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon">📅</span>
    <input
      type="date"
      title="Date added from"
      aria-label="Date added from"
      onChange={(e) =>
        setFilters({ ...filters, dateFrom: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon">📅</span>
    <input
      type="date"
      title="Date added to"
      aria-label="Date added to"
      onChange={(e) =>
        setFilters({ ...filters, dateTo: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon">📍</span>
    <input
      type="text"
      placeholder="Postcode"
      onChange={(e) =>
        setFilters({ ...filters, postcode: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <button
      type="button"
      className="reset-btn"
      onClick={resetFilters}
    >
      Reset
    </button>
  </div>

</div>

        <p className="results">
<span>
  {
    filteredProperties.length
  }
</span>{" "}
properties found        </p>
      </div>

      {/* PROPERTY CARDS */}
      <div className="property-grid">
        {filteredProperties.map((p) => {
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
                title={isFavourite ? "Remove from favourites" : "Add to favourites"}
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
