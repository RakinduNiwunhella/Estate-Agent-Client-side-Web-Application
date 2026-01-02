import { useState } from "react";
import "./PropertyDetails.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function PropertyDetails({ property, favourites, addToFavourites, removeFromFavourites }) {
  const allImages = [property.picture, ...property.images];
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const isFavourite = favourites.includes(property.id);

  return (
    <div className="property-details-wrapper">
      {/* PROPERTY TITLE & LOCATION */}
      <div className="property-header-top">
        <h1 className="property-title">
          {property.type} with {property.bedrooms} Bedrooms
        </h1>

        <button
          className={`property-fav-btn ${isFavourite ? "active" : ""}`}
          onClick={() =>
            isFavourite
              ? removeFromFavourites(property.id)
              : addToFavourites(property.id)
          }
          title={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          {isFavourite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <p className="property-location">{property.location}</p>

      {/* IMAGE GALLERY */}
      <div className="gallery">
        <div className="main-image">
          <img src={allImages[current]} alt="Property" draggable={false} />
          <button className="nav left" onClick={prevImage}>
            ‹
          </button>
          <button className="nav right" onClick={nextImage}>
            ›
          </button>
        </div>

        <div className="thumbnails">
          {allImages.map((img, index) => (
            <img
              key={index}
              src={img}
              className={index === current ? "active" : ""}
              onClick={() => setCurrent(index)}
              alt={`Thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* PROPERTY HEADER */}
      <div className="property-header">
        <div className="property-price">
          £{property.price.toLocaleString()}
        </div>

        <p className="property-added">
          Added on {property.added.day}/{property.added.month}/{property.added.year}
        </p>

        <div className="property-features">
          <div>
            <span className="label">Property type</span>
            <span>{property.type}</span>
          </div>
          <div>
            <span className="label">Bedrooms</span>
            <span>{property.bedrooms}</span>
          </div>
          <div>
            <span className="label">Tenure</span>
            <span className="link">{property.tenure}</span>
          </div>
        </div>

        {/* PROPERTY TABS */}
        <div className="property-tabs">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            {/* DESCRIPTION TAB */}
            <TabPanel>
              <div className="property-description">
                {property.description.replace(/<br>/g, "\n")}

              </div>
            </TabPanel>

            {/* FLOOR PLAN TAB */}
            <TabPanel>
              <div className="property-floorplan">
                <img src={property.floorPlan} alt="Property floor plan" />
              </div>
            </TabPanel>

            {/* MAP TAB */}
            <TabPanel>
              <div className="property-map">
                <iframe
                  title="Property location map"
                  width="100%"
                  height="400"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    property.location
                  )}&output=embed`}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
