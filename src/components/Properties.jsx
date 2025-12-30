import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../assets/properties.json";
import "./Properties.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaHome,
  FaPoundSign,
  FaBed,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaCalendarAlt
} from "react-icons/fa";

export const Properties = ({ favourites, addToFavourites }) => {
  const properties = data.properties;

  const [filters, setFilters] = useState({
  type: "Any",
  minPrice: "",
  maxPrice: "",
  minBeds: "",
  maxBeds: "",
  dateFrom: null,
  dateTo: null,
  postcode: ""
});
const resetFilters = () => {
  setFilters({
    type: "Any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    dateFrom: null,
    dateTo: null,
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

  if (filters.dateFrom && propertyDate < filters.dateFrom) {
    return false;
  }

  if (filters.dateTo && propertyDate > filters.dateTo) {
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
    <span className="filter-icon"><FaHome /></span>
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
    <span className="filter-icon"><FaPoundSign /></span>
    <input
      type="number"
      placeholder="Min Price"
      value={filters.minPrice}
      onChange={(e) =>
        setFilters({ ...filters, minPrice: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon"><FaPoundSign /></span>
    <input
      type="number"
      placeholder="Max Price"
      value={filters.maxPrice}
      onChange={(e) =>
        setFilters({ ...filters, maxPrice: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon"><FaBed /></span>
    <input
      type="number"
      placeholder="Min Beds"
      value={filters.minBeds}
      onChange={(e) =>
        setFilters({ ...filters, minBeds: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon"><FaBed /></span>
    <input
      type="number"
      placeholder="Max Beds"
      value={filters.maxBeds}
      onChange={(e) =>
        setFilters({ ...filters, maxBeds: e.target.value })
      }
    />
  </div>

  <div className="filter-field">
    <span className="filter-icon"><FaCalendarAlt /></span>
    <DatePicker
      key={filters.dateFrom}
      selected={filters.dateFrom}
      onChange={(date) =>
        setFilters({ ...filters, dateFrom: date })
      }
      placeholderText="Added from"
      className="date-picker"
      maxDate={filters.dateTo}
    />
  </div>

 <div className="filter-field">
  <span className="filter-icon"><FaCalendarAlt /></span>
  <DatePicker
    key={filters.dateTo}
    selected={filters.dateTo}
    onChange={(date) =>
      setFilters({ ...filters, dateTo: date })
    }
    placeholderText="Added to"
    className="date-picker"
    minDate={filters.dateFrom}
  />
</div>

  <div className="filter-field">
    <span className="filter-icon"><FaMapMarkerAlt /></span>
    <input
      type="text"
      placeholder="Postcode"
      value={filters.postcode}
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
                {isFavourite ? <FaHeart color="#ef4444" /> : <FaRegHeart />}
              </button>

              <div className="card-body">
                <h3>
                  {p.type} • {p.bedrooms} Bedroom
                </h3>

                <p className="location">
                  <FaMapMarkerAlt /> {p.location}
                </p>

                <div className="meta">
                  <span><FaBed /> {p.bedrooms} beds</span>
                  <span><FaHome /> {p.type}</span>
                </div>

                <div className="card-footer">
                  <span className="date">
                    <FaCalendarAlt /> {p.added.day}/{p.added.month}/{p.added.year}
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
