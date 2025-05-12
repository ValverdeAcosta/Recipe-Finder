import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { useRecipeContext } from "../../context/RecipeContext";
import "@testing-library/jest-dom";
import { mockRecipe } from "../../mocks/recipes.mock";
import LOCALES, { LOCALES_MODAL } from "../../locales/en";

vi.mock("../../context/RecipeContext", () => ({
  useRecipeContext: vi.fn(),
}));

describe("Home", () => {
  const mockContextValue = {
    recipes: [mockRecipe],
    selectedRecipe: null,
    favorites: [],
    setSelectedRecipe: vi.fn(),
    searchRecipes: vi.fn(),
    getAllRecipes: vi.fn(),
    loadRecipesByPage: vi.fn(),
    isFavorite: vi.fn(),
    toggleFavorite: vi.fn(),
    getRecipeDetails: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRecipeContext).mockReturnValue(mockContextValue);
  });

  it("renders main title", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  describe("Search functionality", () => {
    it("enables search button when input has value", async () => {
      render(<Home />);
      const input = screen.getByPlaceholderText(LOCALES.placeholders.search);
      const searchButton = screen.getByRole("button", {
        name: LOCALES.buttons.search,
      });

      expect(searchButton).toBeDisabled();

      await userEvent.type(input, "test");
      expect(searchButton).toBeEnabled();
    });

    it("calls searchRecipes when search button is clicked", async () => {
      render(<Home />);
      const input = screen.getByPlaceholderText(LOCALES.placeholders.search);
      const searchButton = screen.getByRole("button", {
        name: LOCALES.buttons.search,
      });

      await userEvent.type(input, "test");
      await userEvent.click(searchButton);

      expect(mockContextValue.searchRecipes).toHaveBeenCalledWith("test");
    });
  });

  describe("Favorites functionality", () => {
    it("toggles between all recipes and favorites", async () => {
      render(<Home />);
      const toggleButton = screen.getByRole("button", {
        name: LOCALES.buttons.favorites,
      });

      await userEvent.click(toggleButton);
      expect(mockContextValue.getAllRecipes).toHaveBeenCalled();
      expect(toggleButton).toHaveTextContent(LOCALES.buttons.showAll);

      await userEvent.click(toggleButton);
      expect(mockContextValue.loadRecipesByPage).toHaveBeenCalled();
      expect(toggleButton).toHaveTextContent(LOCALES.buttons.favorites);
    });

    it("filters recipes when showing favorites", () => {
      const contextWithFavorites = {
        ...mockContextValue,
        favorites: ["1"],
      };
      vi.mocked(useRecipeContext).mockReturnValue(contextWithFavorites);

      render(<Home />);
      const toggleButton = screen.getByRole("button", {
        name: LOCALES.buttons.favorites,
      });
      fireEvent.click(toggleButton);

      const recipeList = screen.getByTestId("recipe-list");
      expect(recipeList).toBeInTheDocument();
    });
  });

  describe("Alphabet navigation", () => {
    it("renders all alphabet buttons", () => {
      render(<Home />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(29);
    });

    it("changes page when clicking alphabet button", async () => {
      render(<Home />);
      const letterButton = screen.getByRole("button", { name: "B" });

      await userEvent.click(letterButton);
      expect(mockContextValue.loadRecipesByPage).toHaveBeenCalledWith("b");
    });
  });

  describe("Recipe modal", () => {
    it("shows modal when recipe is selected", () => {
      const contextWithSelectedRecipe = {
        ...mockContextValue,
        selectedRecipe: mockRecipe,
      };
      vi.mocked(useRecipeContext).mockReturnValue(contextWithSelectedRecipe);

      render(<Home />);
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });

    it("closes modal when clicking close button", async () => {
      const contextWithSelectedRecipe = {
        ...mockContextValue,
        selectedRecipe: mockRecipe,
      };
      vi.mocked(useRecipeContext).mockReturnValue(contextWithSelectedRecipe);

      render(<Home />);
      const closeButton = screen.getByRole("button", {
        name: LOCALES_MODAL.buttons.close,
      });

      await userEvent.click(closeButton);
      expect(mockContextValue.setSelectedRecipe).toHaveBeenCalledWith(null);
    });
  });
});
