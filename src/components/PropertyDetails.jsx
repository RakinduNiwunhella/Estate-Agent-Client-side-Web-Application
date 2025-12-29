import { useState } from "react";
import "./PropertyDetails.css";

function PropertyDetails({ property }) {
  const allImages = [property.picture, ...property.images];
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="property-details-wrapper">
      {/* IMAGE GALLERY */}
      <div className="gallery">
        <div className="main-image">
          <img src={allImages[current]} alt="Property" />
          <button className="nav left" onClick={prevImage}>‹</button>
          <button className="nav right" onClick={nextImage}>›</button>
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
        <div className="property-header-top">
          <h1 className="property-title">
            {property.type} with {property.bedrooms} Bedrooms
          </h1>

          <div className="property-actions">
            <button className="icon-btn">♡</button>
            <button className="icon-btn">⤴</button>
          </div>
        </div>

        <p className="property-location">
          {property.location}
        </p>

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
      </div>
    </div>
  );
}

export default PropertyDetails;