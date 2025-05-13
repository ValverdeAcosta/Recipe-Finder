import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecipeList from "./RecipeList";
import { mockRecipes } from "../../../mocks/recipes.mock";

vi.mock("../../molecules/RecipeCard", () => ({
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="recipe-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

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

  it("generates fallback description when no instructions are present", () => {
    const recipesWithoutInstructions = [
      {
        ...mockRecipes[0],
        strInstructions: "",
        strCategory: "Seafood",
        strArea: "Italian",
      },
      {
        ...mockRecipes[0],
        strInstructions: "",
        strCategory: "Dessert",
        strArea: "",
      },
    ];

    render(<RecipeList recipes={recipesWithoutInstructions} />);

    expect(screen.getByText("Seafood dish from Italian")).toBeInTheDocument();
    expect(screen.getByText("Dessert dish")).toBeInTheDocument();
  });
});
