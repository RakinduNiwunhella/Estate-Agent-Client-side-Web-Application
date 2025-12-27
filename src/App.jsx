import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import { Properties } from "./components/Properties";
import About from "./components/About";
import Footer from "./components/Footer";
import PropertyDetails from "./components/PropertyDetails";

import data from "./assets/properties.json";
import { useParams } from "react-router-dom";

function PropertyDetailsWrapper() {
  const { id } = useParams();
 const property = data.properties.find(
  (p) => p.id === id
);

  if (!property) return <p>Property not found</p>;

  return <PropertyDetails property={property} />;
}

function Home() {
  return (
    <>
      <HeroSection />
      <Properties />
      <About />
    </>
  );
}

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetailsWrapper />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;