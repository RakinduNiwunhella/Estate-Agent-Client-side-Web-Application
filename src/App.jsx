import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import { Properties } from "./components/Properties";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PropertyDetails from "./components/PropertyDetails";
import Favourite from "./components/Favourites";

import data from "./assets/properties.json";

function PropertyDetailsWrapper({ favourites, addToFavourites, removeFromFavourites }) {
  const { id } = useParams();

  const property = data.properties.find((p) => p.id === id);

  if (!property) return <p>Property not found</p>;

  return (
    <PropertyDetails
      property={property}
      favourites={favourites}
      addToFavourites={addToFavourites}
      removeFromFavourites={removeFromFavourites}
    />
  );
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home({ favourites, addToFavourites, removeFromFavourites, clearFavourites }) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <HeroSection />

      <Properties
        favourites={favourites}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        clearFavourites={clearFavourites}
      />

      <About />
      <Services />
      <Contact/>
    </>
  );
}

function App() {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (id) => {
    setFavourites((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
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

        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

       

        <Route
          path="/property/:id"
          element={
            <PropertyDetailsWrapper
              favourites={favourites}
              addToFavourites={addToFavourites}
              removeFromFavourites={removeFromFavourites}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;