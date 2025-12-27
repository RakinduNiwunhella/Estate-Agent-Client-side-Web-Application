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
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyDetails;