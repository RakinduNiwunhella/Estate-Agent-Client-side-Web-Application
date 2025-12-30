import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import { Properties } from "./components/Properties";
import About from "./components/About";
import Footer from "./components/Footer";
import PropertyDetails from "./components/PropertyDetails";
import { useState } from "react";
import data from "./assets/properties.json";
import { useParams } from "react-router-dom";
import Favourite from "./components/Favourites";

function PropertyDetailsWrapper({ favourites, addToFavourites, removeFromFavourites }) {  const { id } = useParams();
 const property = data.properties.find(
  (p) => p.id === id
);

  if (!property) return <p>Property not found</p>;

return (
  <PropertyDetails
    property={property}
    favourites={favourites}
    addToFavourites={addToFavourites}
    removeFromFavourites={removeFromFavourites}
  />
);}

function Home({ favourites, addToFavourites, removeFromFavourites, clearFavourites }) {
  return (
    <>
      <HeroSection />
<Properties
  favourites={favourites}
  addToFavourites={addToFavourites}
/>
<Favourite
  favourites={favourites}
  properties={data.properties}
  addToFavourites={addToFavourites}
  removeFromFavourites={removeFromFavourites}
  clearFavourites={clearFavourites}
/>
      <About />
    </>
  );
}

function App() {
  const [favourites, setFavourites] = useState([]);
  const addToFavourites = (id) => {
  setFavourites((prev) =>
    prev.includes(id)
      ? prev.filter((fav) => fav !== id) // remove if already added
      : [...prev, id]                    // add if not present
  );
};

const removeFromFavourites = (id) => {
  setFavourites((prev) => prev.filter((fav) => fav !== id));
};

const clearFavourites = () => {
  setFavourites([]);
};
  return (
    <Router>
      <Header />

      <Routes>
<Route
  path="/"
  element={
    <Home
      favourites={favourites}
      addToFavourites={addToFavourites}
      removeFromFavourites={removeFromFavourites}
      clearFavourites={clearFavourites}
    />
  }
/>
<Route
  path="/favourites"
  element={
    <Favourite
      favourites={favourites}
      properties={data.properties}
      addToFavourites={addToFavourites}
      removeFromFavourites={removeFromFavourites}
      clearFavourites={clearFavourites}
    />
  }
/>    
<Route
  path="/property/:id"
  element={
    <PropertyDetailsWrapper
      favourites={favourites}
      addToFavourites={addToFavourites}
      removeFromFavourites={removeFromFavourites}
    />
  }
/>      </Routes>

      <Footer />
    </Router>
  );
}

export default App;