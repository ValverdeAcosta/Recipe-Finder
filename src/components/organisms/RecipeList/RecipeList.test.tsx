import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecipeList from "./RecipeList";
import { mockRecipes } from "../../../mocks/recipes.mock";

// Mock the RecipeCard component
vi.mock("../../molecules/RecipeCard", () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="recipe-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

// Mock the RecipeContext
vi.mock("../../../context/RecipeContext", () => ({
  useRecipeContext: () => ({
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
    getRecipeDetails: vi.fn(),
  }),
}));

describe("RecipeList", () => {
  it("renders all recipes", () => {
    render(<RecipeList recipes={mockRecipes} />);
    const recipeCards = screen.getAllByTestId("recipe-card");
    expect(recipeCards).toHaveLength(1);
  });

  it("truncates long descriptions", () => {
    const longInstructions = "a".repeat(150);
    const recipes = [
      {
        ...mockRecipes[0],
        strInstructions: longInstructions,
      },
    ];

    render(<RecipeList recipes={recipes} />);
    const description = screen.getByText(/^a{100}\.{3}$/);
    expect(description).toBeInTheDocument();
  });

  it("shows full description when less than 100 characters", () => {
    const shortInstructions = "Short recipe instructions";
    const recipes = [
      {
        ...mockRecipes[0],
        strInstructions: shortInstructions,
      },
    ];

    render(<RecipeList recipes={recipes} />);
    expect(screen.getByText(shortInstructions)).toBeInTheDocument();
  });

  it("renders empty grid when no recipes provided", () => {
    render(<RecipeList recipes={[]} />);
    expect(screen.queryByTestId("recipe-card")).not.toBeInTheDocument();
  });
});
