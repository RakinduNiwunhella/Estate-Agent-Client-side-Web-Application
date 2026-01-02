import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Favourite from "./Favourites";

const mockProperties = [
  {
    id: "p1",
    type: "House",
    bedrooms: 3,
    location: "London",
    price: 450000,
    picture: "house.jpg",
  },
  {
    id: "p2",
    type: "Flat",
    bedrooms: 2,
    location: "Manchester",
    price: 300000,
    picture: "flat.jpg",
  },
];

const renderComponent = (favourites = []) => {
  const addToFavourites = vi.fn();
  const removeFromFavourites = vi.fn();
  const clearFavourites = vi.fn();

  render(
    <BrowserRouter>
      <Favourite
        favourites={favourites}
        properties={mockProperties}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        clearFavourites={clearFavourites}
      />
    </BrowserRouter>
  );

  return { removeFromFavourites, clearFavourites };
};

describe("Favourites component", () => {
  it("shows empty state when there are no favourites", () => {
    renderComponent([]);
    expect(screen.getByText(/no favourites yet/i)).toBeInTheDocument();
  });

  it("displays favourite properties when favourites exist", () => {
    renderComponent(["p1"]);
    expect(screen.getByText(/house/i)).toBeInTheDocument();
    expect(screen.getByText(/£450,000/i)).toBeInTheDocument();
  });

  it("removes a favourite when Remove button is clicked", async () => {
    const user = userEvent.setup();
    const { removeFromFavourites } = renderComponent(["p1"]);

    await user.click(screen.getByText(/remove/i));
    expect(removeFromFavourites).toHaveBeenCalledWith("p1");
  });

  it("clears all favourites when Clear all favourites is clicked", async () => {
    const user = userEvent.setup();
    const { clearFavourites } = renderComponent(["p1", "p2"]);

    await user.click(screen.getByText(/clear all favourites/i));
    expect(clearFavourites).toHaveBeenCalled();
  });
});