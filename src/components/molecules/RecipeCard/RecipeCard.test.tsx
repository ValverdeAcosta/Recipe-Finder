import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import RecipeCard from "./RecipeCard";

vi.mock("../../../context/RecipeContext", () => ({
  useRecipeContext: vi.fn(),
}));

import * as RecipeContextModule from "../../../context/RecipeContext";
import userEvent from "@testing-library/user-event";

describe("RecipeCard", () => {
  const mockProps = {
    id: "1",
    title: "Test Recipe",
    description: "Test Description",
    image: "test-image.jpg",
  };

  const mockContext = {
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
    getRecipeDetails: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (RecipeContextModule.useRecipeContext as Mock).mockReturnValue(mockContext);
  });

  it("renders recipe information correctly", () => {
    render(<RecipeCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.title)).toHaveAttribute(
      "src",
      mockProps.image
    );
  });

  it("renders recipe information correctly", () => {
    render(<RecipeCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProps.title)).toHaveAttribute(
      "src",
      mockProps.image
    );
  });

  it("calls getRecipeDetails when clicking the card", async () => {
    render(<RecipeCard {...mockProps} />);
    const card = screen
      .getByRole("heading", { name: mockProps.title })
      .closest("div");
    await userEvent.click(card as HTMLElement);
    expect(mockContext.getRecipeDetails).toHaveBeenCalledWith(mockProps.id);
  });

  it("toggles favorite when clicking the heart icon", async () => {
    mockContext.isFavorite.mockReturnValue(false);
    render(<RecipeCard {...mockProps} />);

    const favoriteButton = screen.getByTestId("favorite-icon");
    await userEvent.click(favoriteButton);

    expect(mockContext.toggleFavorite).toHaveBeenCalledWith(mockProps.id);
  });

  it("prevents event propagation when clicking favorite icon", async () => {
    render(<RecipeCard {...mockProps} />);

    const favoriteButton = screen.getByTestId("favorite-icon");
    await userEvent.click(favoriteButton);

    expect(mockContext.toggleFavorite).toHaveBeenCalledWith(mockProps.id);
    expect(mockContext.getRecipeDetails).not.toHaveBeenCalled();
  });

  it("displays correct heart icon based on favorite status", () => {
    mockContext.isFavorite.mockReturnValue(true);
    const { rerender } = render(<RecipeCard {...mockProps} />);
    expect(screen.getByTestId("favorite-icon")).toBeInTheDocument();

    mockContext.isFavorite.mockReturnValue(false);
    rerender(<RecipeCard {...mockProps} />);
    expect(screen.getByTestId("favorite-icon")).toBeInTheDocument();
  });
});
