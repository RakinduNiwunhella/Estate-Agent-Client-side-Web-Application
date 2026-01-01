import "./Favourites.css";
import { Link } from "react-router-dom";

function Favourite({
  favourites,
  properties,
  addToFavourites,
  removeFromFavourites,
  clearFavourites,
}) {
  const favouriteProperties = properties.filter((property) =>
    favourites.includes(property.id)
  );

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("propertyId");
    if (!id) return;
    addToFavourites(id);
  };

  const hasFavourites = favouriteProperties.length > 0;

  return (
    <aside
      id="favourites"
      className={`favourites-panel ${hasFavourites ? "has-items" : "is-empty"}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      aria-label="Saved properties"
    >
      <header className="favourites-header">
        <div>
          <h3>Saved Properties</h3>
          <p className="favourites-subtitle">
            Drag homes here to quickly compare and revisit.
          </p>
        </div>

        {hasFavourites && (
          <span
            className="badge"
            aria-label={`${favouriteProperties.length} saved properties`}
          >
            {favouriteProperties.length}
          </span>
        )}
      </header>

      {!hasFavourites && (
        <div className="favourites-empty">
          <p className="empty-title">No favourites yet</p>
          <p className="empty-help">
            Tap the heart icon on any property, or drag a card into this panel
            to save it for later.
          </p>
        </div>
      )}

      {hasFavourites && (
        <div className="favourites-scroll">
          {favouriteProperties.map((property) => (
            <article
              key={property.id}
              className="favourite-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("propertyId", property.id);
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragEnd={() => removeFromFavourites(property.id)}
            >
              <Link
                to={`/property/${property.id}`}
                className="fav-link"
                aria-label={`View details for ${property.type}`}
              >
                <img
                  src={property.picture}
                  alt={property.type}
                  className="fav-thumb"
                  loading="lazy"
                />

                <div className="fav-details">
                  <h4>
                    {property.type} • {property.bedrooms} Beds
                  </h4>
                  <p className="fav-location">{property.location}</p>
                  <p className="fav-price">
                    £{property.price.toLocaleString()}
                  </p>
                </div>
              </Link>

              <button
                type="button"
                className="remove-btn"
                onClick={() => removeFromFavourites(property.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      )}

      {hasFavourites && (
        <button
          type="button"
          className="clear-favourites"
          onClick={clearFavourites}
        >
          Clear all favourites
        </button>
      )}
    </aside>
  );
}

export default Favourite;
