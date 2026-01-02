import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";//tests ui like a real user
import userEvent from "@testing-library/user-event"; // simulates real user actions
import { BrowserRouter } from "react-router-dom";// required since properties uses links
import { Properties } from "./Properties";

// mock favourites handlers
const renderComponent = (favourites = []) => {
  const addToFavourites = vi.fn();
  const removeFromFavourites = vi.fn();
  const clearFavourites = vi.fn();

  render(
    <BrowserRouter>
      <Properties
        favourites={favourites}
        addToFavourites={addToFavourites}
        removeFromFavourites={removeFromFavourites}
        clearFavourites={clearFavourites}
      />
    </BrowserRouter>
  );

  return { addToFavourites };
};

describe("Properties component", () => {
  it("renders the properties section", () => {
    renderComponent();
    expect(
      screen.getByText(/properties found/i)
    ).toBeInTheDocument();
  });

  it("displays property cards from JSON data", () => {
    renderComponent();
    const cards = document.querySelectorAll(".property-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("filters properties when selecting House type", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByRole("combobox"));
    await user.click(screen.getByText("House"));

    const cards = document.querySelectorAll(".property-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("calls addToFavourites when favourite button is clicked", async () => {
    const user = userEvent.setup();
    const { addToFavourites } = renderComponent();

    const favButtons = document.querySelectorAll(".fav-btn");
    await user.click(favButtons[0]);

    expect(addToFavourites).toHaveBeenCalled();
  });
});