import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecipeFullDetailedModal from "./RecipeFullDetailedModal";
import * as RecipeContextModule from "../../../context/RecipeContext";
import { mockRecipe } from "../../../mocks/recipes.mock";
import { LOCALES_MODAL } from "../../../locales/en";

vi.mock("../../../context/RecipeContext", () => ({
  useRecipeContext: vi.fn(),
}));

describe("RecipeFullDetailedModal", () => {
  const mockOnClose = vi.fn();

  const mockContext = {
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (RecipeContextModule.useRecipeContext as Mock).mockReturnValue(mockContext);
  });

  it("renders modal with recipe details", () => {
    mockContext.isFavorite.mockReturnValue(false);

    render(
      <RecipeFullDetailedModal recipe={mockRecipe} onClose={mockOnClose} />
    );

    expect(screen.getByText(mockRecipe.strMeal)).toBeInTheDocument();
    expect(screen.getByAltText(mockRecipe.strMeal)).toHaveAttribute(
      "src",
      mockRecipe.strMealThumb
    );
    expect(screen.getByText(LOCALES_MODAL.labels.category)).toBeInTheDocument();
    expect(screen.getByText(LOCALES_MODAL.labels.country)).toBeInTheDocument();
    expect(
      screen.getByText(LOCALES_MODAL.labels.instructions)
    ).toBeInTheDocument();
    expect(
      screen.getByText(LOCALES_MODAL.labels.ingredients)
    ).toBeInTheDocument();
  });

  it("calls onClose when clicking the overlay", async () => {
    mockContext.isFavorite.mockReturnValue(false);
    render(
      <RecipeFullDetailedModal recipe={mockRecipe} onClose={mockOnClose} />
    );

    const overlay = screen.getByTestId("overlay");
    await userEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when clicking close button", async () => {
    mockContext.isFavorite.mockReturnValue(false);
    render(
      <RecipeFullDetailedModal recipe={mockRecipe} onClose={mockOnClose} />
    );

    const closeButton = screen.getByText(LOCALES_MODAL.buttons.close);
    await userEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("shows 'Add Favorite' button when recipe is not favorite", () => {
    mockContext.isFavorite.mockReturnValue(false);
    render(
      <RecipeFullDetailedModal recipe={mockRecipe} onClose={mockOnClose} />
    );

    expect(
      screen.getByText(LOCALES_MODAL.buttons.addFavorite)
    ).toBeInTheDocument();
  });

  it("shows 'Remove Favorite' button when recipe is favorite", () => {
    mockContext.isFavorite.mockReturnValue(true);
    render(
      <RecipeFullDetailedModal recipe={mockRecipe} onClose={mockOnClose} />
    );

    expect(
      screen.getByText(LOCALES_MODAL.buttons.removeFavorite)
    ).toBeInTheDocument();
  });

  it("calls toggleFavorite when clicking favorite button", async () => {
    mockContext.isFavorite.mockReturnValue(false);
    render(
      <RecipeFullDetailedModal recipe={mockRecipe} onClose={mockOnClose} />
    );

    const favButton = screen.getByText(LOCALES_MODAL.buttons.addFavorite);
    await userEvent.click(favButton);

    expect(mockContext.toggleFavorite).toHaveBeenCalledWith(mockRecipe.idMeal);
  });
});
