import "./Favourites.css";

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

  return (
    <div
      id="favourites"
      className="favourites-list"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("propertyId");
        addToFavourites(id);
      }}
    >
      <h3>Saved Properties</h3>

      {favouriteProperties.length === 0 && (
        <p>No favourites added yet</p>
      )}

      {favouriteProperties.map((property) => (
        <div
          key={property.id}
          className="favourite-item"
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("propertyId", property.id)
          }
        >
          <div>
            <strong>{property.type}</strong> – £
            {property.price.toLocaleString()}
          </div>

          <button
            onClick={() => removeFromFavourites(property.id)}
          >
            Remove
          </button>
        </div>
      ))}

      {favourites.length > 0 && (
        <button
          className="clear-favourites"
          onClick={clearFavourites}
        >
          Clear Favourites
        </button>
      )}
    </div>
  );
}

export default Favourite;