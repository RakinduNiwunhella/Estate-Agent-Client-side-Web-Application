import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../assets/properties.json";
import "./Properties.css";

import {
  FaHome,
  FaPoundSign,
  FaBed,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart
} from "react-icons/fa";

import Favourite from "./Favourites";

/* MUI DATE PICKER */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Select, MenuItem, Button } from "@mui/material";

export const Properties = ({
  favourites,
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
}) => {
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
    if (filters.type !== "Any" && p.type !== filters.type) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.minBeds && p.bedrooms < filters.minBeds) return false;
    if (filters.maxBeds && p.bedrooms > filters.maxBeds) return false;

    // DATE FILTER
    if (filters.dateFrom || filters.dateTo) {
      const monthIndex = new Date(`${p.added.month} 1, 2000`).getMonth();
      const propertyDate = new Date(
        p.added.year,
        monthIndex,
        p.added.day
      );

      if (filters.dateFrom && propertyDate < filters.dateFrom.toDate())
        return false;
      if (filters.dateTo && propertyDate > filters.dateTo.toDate())
        return false;
    }

    // POSTCODE
    if (filters.postcode) {
      const postcode = p.location.split(" ").pop().toUpperCase();
      if (!postcode.startsWith(filters.postcode.toUpperCase())) return false;
    }

    return true;
  });

  return (
    <div className="properties-wrapper" id="properties">
      <div className="search-card">
        <div className="filters-row">

          {/* TYPE */}
          <div className="filter-field">
            <span className="filter-icon"><FaHome /></span>
            <Select
              size="small"
              fullWidth
              value={filters.type}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value })
              }
            >
              <MenuItem value="Any">Any Type</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Flat">Flat</MenuItem>
            </Select>
          </div>

          {/* PRICE */}
          <div className="filter-field">
            <span className="filter-icon"><FaPoundSign /></span>
            <TextField
              type="number"
              size="small"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
              fullWidth
            />
          </div>

          <div className="filter-field">
            <span className="filter-icon"><FaPoundSign /></span>
            <TextField
              type="number"
              size="small"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
              fullWidth
            />
          </div>

          {/* BEDS */}
          <div className="filter-field">
            <span className="filter-icon"><FaBed /></span>
            <TextField
              type="number"
              size="small"
              placeholder="Min Beds"
              value={filters.minBeds}
              onChange={(e) =>
                setFilters({ ...filters, minBeds: e.target.value })
              }
              fullWidth
            />
          </div>

          <div className="filter-field">
            <span className="filter-icon"><FaBed /></span>
            <TextField
              type="number"
              size="small"
              placeholder="Max Beds"
              value={filters.maxBeds}
              onChange={(e) =>
                setFilters({ ...filters, maxBeds: e.target.value })
              }
              fullWidth
            />
          </div>

          {/* DATE PICKERS */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="filter-field mui-date">
              <DatePicker
  views={["year", "month", "day"]}
  value={filters.dateFrom}
  onChange={(newValue) =>
    setFilters({ ...filters, dateFrom: newValue })
  }
  slotProps={{
    textField: {
      placeholder: "Added from",
      size: "small",
      fullWidth: true
    }
  }}
/>
            </div>

            <div className="filter-field mui-date">
             <DatePicker
  views={["year", "month", "day"]}
  value={filters.dateTo}
  onChange={(newValue) =>
    setFilters({ ...filters, dateTo: newValue })
  }
  slotProps={{
    textField: {
      placeholder: "Added to",
      size: "small",
      fullWidth: true
    }
  }}
/>
            </div>
          </LocalizationProvider>

          {/* POSTCODE */}
          <div className="filter-field">
            <span className="filter-icon"><FaMapMarkerAlt /></span>
            <TextField
              type="text"
              size="small"
              placeholder="Postcode"
              value={filters.postcode}
              onChange={(e) =>
                setFilters({ ...filters, postcode: e.target.value })
              }
              fullWidth
            />
          </div>

          {/* RESET */}
          <div className="filter-field">
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        </div>

        <p className="results">
          <span>{filteredProperties.length}</span> properties found
        </p>

        <Favourite
          favourites={favourites}
          properties={properties}
          addToFavourites={addToFavourites}
          removeFromFavourites={removeFromFavourites}
          clearFavourites={clearFavourites}
        />
      </div>

      {/* PROPERTY GRID */}
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
              <Link to={`/property/${p.id}`}>
                <div className="image-wrapper">
                  <img src={p.picture} alt={p.type} />
                  <span className="price">£{p.price.toLocaleString()}</span>
                </div>
              </Link>

              <button
                className={`fav-btn ${isFavourite ? "active" : ""}`}
                onClick={() => addToFavourites(p.id)}
              >
                {isFavourite ? <FaHeart /> : <FaRegHeart />}
              </button>

              <div className="card-body">
                <h3>{p.type} • {p.bedrooms} Beds</h3>

                <p className="card-desc">
                  {p.description.replace(/<br>/g, "").slice(0, 90)}...
                </p>

                <p className="location">
                  <FaMapMarkerAlt /> {p.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};