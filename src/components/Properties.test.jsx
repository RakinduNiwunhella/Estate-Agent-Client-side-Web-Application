import { describe, it, expect, vi } from "vitest"; //vi = mocking functions
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; //	simulates real user interactions
import { BrowserRouter } from "react-router-dom";
import { Properties } from "./Properties";
import data from "../assets/properties.json";



const renderComponent = () => {
  render(
    <BrowserRouter>
      <Properties
        favourites={[]}
        addToFavourites={vi.fn()}
        removeFromFavourites={vi.fn()}
        clearFavourites={vi.fn()}
      />
    </BrowserRouter>
  );
};

describe("Properties filtering logic", () => {
  //Test 01
  it("shows all properties by default", () => {
    renderComponent();
    const cards = document.querySelectorAll(".property-card");
    expect(cards.length).toBe(data.properties.length);  });

  //Test 02 (uses async - user interaction)
  it("filters properties by type (House)", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "House" }));

    const cards = document.querySelectorAll(".property-card");

    const expectedHouseCount = data.properties.filter((p) => p.type === "House").length;

    expect(cards.length).toBe(expectedHouseCount); //checks it with the json file

    cards.forEach((card) => {
    const title = card.querySelector(".property-title");
    expect(title.textContent).toMatch(/House/); 
  });
  });
 
//Test 03
  it("filters properties by minimum price", async () => {
    const user = userEvent.setup();
    renderComponent();

    const minPriceInput = screen.getByPlaceholderText("Min Price");
    await user.type(minPriceInput, "600000");

    const cards = document.querySelectorAll(".property-card");
    const expectedCount = data.properties.filter(
      (p) => p.price >= 600000).length;

    expect(cards.length).toBe(expectedCount);
  });
  
//Test 04
  it("filters properties by postcode prefix", async () => {
    const user = userEvent.setup();
    renderComponent();

    const postcodeInput = screen.getByPlaceholderText("Postcode");
    await user.type(postcodeInput, "BR");

    const cards = document.querySelectorAll(".property-card");

    const expectedCount = data.properties.filter((p) =>
      p.location.toUpperCase().includes("BR")
    ).length;

    expect(cards.length).toBe(expectedCount);

    cards.forEach((card) => {
      const locationText = card.querySelector(".location");
      expect(locationText.textContent).toMatch(/BR/i); //i = case insensitive
    });
  });

  //Test 05
  it("filters correctly when multiple criteria are applied together", async () => {
    const user = userEvent.setup();
    renderComponent();

    // type
    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByRole("option", { name: "House" }));

    // min beds
    const minBedsInput = screen.getByPlaceholderText("Min Beds");
    await user.type(minBedsInput, "3");

    // postcode
    const postcodeInput = screen.getByPlaceholderText("Postcode");
    await user.type(postcodeInput, "BR");

    const cards = document.querySelectorAll(".property-card");

    const expectedCount = data.properties.filter((p) => {
      if (p.type !== "House") return false;
      if (p.bedrooms < 3) return false;

      const postcode = p.location.split(" ").pop().toUpperCase();
      return postcode.startsWith("BR");
    }).length;

    expect(cards.length).toBe(expectedCount);
  });

  //Test 06
  it("shows zero results when no properties match filters", async () => {
    const user = userEvent.setup();
    renderComponent();

    const maxPriceInput = screen.getByPlaceholderText("Max Price");
    await user.type(maxPriceInput, "0");

    expect(document.querySelectorAll(".property-card").length).toBe(0);
  });
});